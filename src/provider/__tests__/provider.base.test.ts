import QuickRouteCacheMemory from "../../cache/cache.memory";
import QuickRouteLoggerConsole from "../../logger/logger.console";
import QuickRouteProviderBase from "../provider.base";

describe("BaseProvider", () => {
  it("can be instantiated with the logger and cache passed as options", () => {
    const provider = new QuickRouteProviderBase({
      logger: new QuickRouteLoggerConsole(),
      cache: new QuickRouteCacheMemory(),
    });
    expect(provider.hasLogger()).toBe(true);
    expect(provider.hasCache()).toBe(true);
  });

  it("can be instantiated and have the logger and cache set later", () => {
    const provider = new QuickRouteProviderBase();
    expect(provider.hasLogger()).toBe(false);
    expect(provider.hasCache()).toBe(false);
    provider.setLogger(new QuickRouteLoggerConsole());
    provider.setCache(new QuickRouteCacheMemory());
    expect(provider.hasLogger()).toBe(true);
    expect(provider.hasCache()).toBe(true);
  });
});
