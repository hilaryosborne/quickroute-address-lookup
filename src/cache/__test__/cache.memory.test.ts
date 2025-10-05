import { SearchByPartialAddressParams } from "../../address.lookup";
import QuickRouteCacheMemory from "../cache.memory";

describe("memory cache", () => {
  it("can instantiate the memory cache", async () => {
    const cache = new QuickRouteCacheMemory();
    expect(cache).toBeInstanceOf(QuickRouteCacheMemory);
  });

  it("can set a cache value for the partial address", async () => {
    const cache = new QuickRouteCacheMemory();
    const params = {
      query: "123 Main St",
      options: { country: "AU" },
      expands: ["address", "geo"],
    } as SearchByPartialAddressParams & { expands: ("address" | "geo" | "provider")[] };
    const results = [{ id: "some-address-id", address: { display: "123 Main St, Anytown, USA" } }];
    await cache.setForPartialAddress("TomTom", params, results);
    const cached = await cache.getByPartialAddress("TomTom", params);
    expect(cached).toEqual(results);
  });

  it("returns null for a cache miss", async () => {
    const cache = new QuickRouteCacheMemory();
    const params = {
      query: "456 Elm St",
      options: { country: "AU" },
      expands: ["address", "geo"],
    } as SearchByPartialAddressParams & { expands: ("address" | "geo" | "provider")[] };
    const cached = await cache.getByPartialAddress("TomTom", params);
    expect(cached).toBeNull();
  });

  it("cleans the cache when max size is exceeded", async () => {
    const cache = new QuickRouteCacheMemory({ maxSize: 5, batchSize: 0.4 });
    // Fill the cache to its max size
    for await (const i of [1, 2, 3, 4, 5, 6]) {
      const params = {
        query: `${i} example street, QLD`,
        options: { country: "AU" },
        expands: ["address", "geo"],
      } as SearchByPartialAddressParams & { expands: ("address" | "geo" | "provider")[] };
      const results = [{ id: `id-${i}-example-street-qld`, address: { display: `${i} example street, QLD` } }];
      await cache.setForPartialAddress("TomTom", params, results);
    }
    // retrieve the number of hits we get from the cache
    let hitCount = 0;
    for await (const i of [1, 2, 3, 4, 5, 6]) {
      const params = {
        query: `${i} example street, QLD`,
        options: { country: "AU" },
        expands: ["address", "geo"],
      } as SearchByPartialAddressParams & { expands: ("address" | "geo" | "provider")[] };
      const cached = await cache.getByPartialAddress("TomTom", params);
      if (cached) hitCount++;
    }
    // this will be 4 because one will have been added after the cleanup was performed
    expect(hitCount).toBe(4);
  });
});
