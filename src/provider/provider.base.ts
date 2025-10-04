import QuickRouteCacheI from "../cache/cache.interface";
import QuickRouteLoggerI from "../logger/logger.interface";

export type QuickRouteProviderBaseOptions = {
  logger?: QuickRouteLoggerI;
  cache?: QuickRouteCacheI;
};

class QuickRouteProviderBase {
  protected logger?: QuickRouteLoggerI;
  protected cache?: QuickRouteCacheI;
  constructor(options?: QuickRouteProviderBaseOptions) {
    this.logger = options?.logger;
    this.cache = options?.cache;
  }
  public setLogger(logger: QuickRouteLoggerI): void {
    this.logger = logger;
  }
  public hasLogger(): boolean {
    return !!this.logger;
  }
  public setCache(cache: QuickRouteCacheI): void {
    this.cache = cache;
  }
  public hasCache(): boolean {
    return !!this.cache;
  }
}

export default QuickRouteProviderBase;
