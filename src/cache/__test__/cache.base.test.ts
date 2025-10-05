import QuickRouteLoggerConsole from "../../logger/logger.console";
import QuickRouteCacheBase from "../cache.base";

class QuickRouteCacheTestBase extends QuickRouteCacheBase {
  public testGeneratePartialAddressKey(provider: string, params: any): string {
    return this.generatePartialAddressKey(provider, params);
  }
}

describe("cache base class", () => {
  it("can be instantiated with a provided logger", async () => {
    const logger = new QuickRouteLoggerConsole({ level: "debug" });
    const cache = new QuickRouteCacheBase({ logger });
    expect(cache.hasLogger()).toBe(true);
  });

  it("can set a logger after instantiation", async () => {
    const cache = new QuickRouteCacheBase();
    expect(cache.hasLogger()).toBe(false);
    const logger = new QuickRouteLoggerConsole({ level: "debug" });
    cache.setLogger(logger);
    expect(cache.hasLogger()).toBe(true);
  });

  it("can generate a consistent cache key for partial address searches", async () => {
    const cache = new QuickRouteCacheTestBase();
    const params = {
      query: "123 Main St",
      options: { country: "US" },
      expands: ["details", "geometry"],
    };
    const key = cache.testGeneratePartialAddressKey("TomTom", params);
    expect(key).toBe('TomTom:123 Main St:{"country":"US"}:details:geometry');
  });
});
