import QuickRouteAddressLookup from "../address.lookup";
import QuickRouteCacheMemory from "../cache/cache.memory";
import { HttpResponseEvents } from "../client/client.http.const";
import QuickRouteLoggerConsole from "../logger/logger.console";
import QuickRouteProviderTomTom from "../provider/provider.tomtom";

class QuickRouteAddressLookupTest extends QuickRouteAddressLookup {
  public getCache() {
    return this.cache;
  }
  public getLogger() {
    return this.logger;
  }
  public getProvider() {
    return this.provider;
  }
}

describe("address lookup", () => {
  it("can be instantiated with the logger, cache and provider passed as options", () => {
    const addressLookup = new QuickRouteAddressLookupTest({
      logger: new QuickRouteLoggerConsole(),
      cache: new QuickRouteCacheMemory(),
      provider: new QuickRouteProviderTomTom({
        api: { key: "example-key", protocol: "https", host: "api.tomtom.com" },
      }),
    });
    expect(addressLookup.getLogger()).toBeInstanceOf(QuickRouteLoggerConsole);
    expect(addressLookup.getCache()).toBeInstanceOf(QuickRouteCacheMemory);
    expect(addressLookup.getProvider()).toBeInstanceOf(QuickRouteProviderTomTom);
  });

  it("can be instantiated with a cache that already has a logger", () => {
    const logger = new QuickRouteLoggerConsole();
    const cache = new QuickRouteCacheMemory();
    cache.setLogger(logger);
    const addressLookup = new QuickRouteAddressLookupTest({
      logger: new QuickRouteLoggerConsole(),
      cache: cache,
      provider: new QuickRouteProviderTomTom({
        api: { key: "example-key", protocol: "https", host: "api.tomtom.com" },
      }),
    });
    expect(addressLookup.getCache()).toBe(cache);
    expect(addressLookup.getCache().hasLogger()).toBe(true);
  });

  it("can perform a search by partial address", async () => {
    const addressLookup = new QuickRouteAddressLookup({
      logger: new QuickRouteLoggerConsole(),
      cache: new QuickRouteCacheMemory(),
      provider: new QuickRouteProviderTomTom({
        api: { key: "example-key", protocol: "https", host: "api.tomtom.com" },
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

  it("can handle when a search by partial address fails", async () => {
    try {
      const addressLookup = new QuickRouteAddressLookup({
        logger: new QuickRouteLoggerConsole(),
        cache: new QuickRouteCacheMemory(),
        provider: new QuickRouteProviderTomTom({
          api: {
            key: "invalid-key",
            protocol: "https",
            host: "api.tomtom.com",
          },
        }),
      });
      const results = await addressLookup.searchByPartialAddress({
        query: "123 Error St",
        options: { country: "AU" },
        expands: ["address", "geo"],
      });
    } catch (error: any) {
      expect(error.message).toBe(HttpResponseEvents.SERVER_ERROR);
    }
  });

  it("uses default logger, cache and provider if none are provided", () => {
    process.env.PROVIDER_TOMTOM_API_KEY = "example-key";
    process.env.PROVIDER_TOMTOM_API_PROTOCOL = "https";
    process.env.PROVIDER_TOMTOM_API_HOST = "api.tomtom.com";
    const addressLookup = new QuickRouteAddressLookupTest();
    expect(addressLookup.getLogger()).toBeInstanceOf(QuickRouteLoggerConsole);
    expect(addressLookup.getCache()).toBeInstanceOf(QuickRouteCacheMemory);
    expect(addressLookup.getProvider()).toBeInstanceOf(QuickRouteProviderTomTom);
  });
});
