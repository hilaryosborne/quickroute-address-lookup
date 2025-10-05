import QuickRouteAddressLookup from "../address.lookup";
import QuickRouteCacheMemory from "../cache/cache.memory";
import QuickRouteLoggerConsole from "../logger/logger.console";
import QuickRouteProviderTomTom from "../provider/provider.tomtom";

describe("address lookup", () => {
  it("can be instantiated with the logger, cache and provider passed as options", () => {
    const addressLookup = new QuickRouteAddressLookup({
      logger: new QuickRouteLoggerConsole(),
      cache: new QuickRouteCacheMemory(),
      provider: new QuickRouteProviderTomTom({
        api: {
          key: "example-key",
          protocol: "https",
          host: "api.tomtom.com",
        },
      }),
    });
    expect(addressLookup).toBeDefined();
  });

  it("can perform a search by partial address", async () => {
    const addressLookup = new QuickRouteAddressLookup({
      logger: new QuickRouteLoggerConsole(),
      cache: new QuickRouteCacheMemory(),
      provider: new QuickRouteProviderTomTom({
        api: {
          key: "example-key",
          protocol: "https",
          host: "api.tomtom.com",
        },
      }),
    });
    const results = await addressLookup.searchByPartialAddress({
      query: "123 Main St",
      options: { country: "AU" },
      expands: ["address", "geo"],
    });
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
  });
});
