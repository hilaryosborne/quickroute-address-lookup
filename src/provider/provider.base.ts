import QuickRouteCacheI from "../cache/cache.interface";
import QuickRouteLoggerI from "../logger/logger.interface";

export type QuickRouteProviderBaseParams = {
  logger?: QuickRouteLoggerI;
  cache?: QuickRouteCacheI;
};

class QuickRouteProviderBase {
  protected logger?: QuickRouteLoggerI;
  protected cache?: QuickRouteCacheI;
  constructor(params?: QuickRouteProviderBaseParams) {
    this.logger = params?.logger;
    this.cache = params?.cache;
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
