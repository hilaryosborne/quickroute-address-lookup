import QuickRouteCacheMemory from "./cache.memory";

describe("memory cache", () => {
  it("can instantiate the memory cache", async () => {
    const cache = new QuickRouteCacheMemory();
    expect(cache).toBeInstanceOf(QuickRouteCacheMemory);
  });
});
