import { SearchByPartialAddressParams } from "../address.lookup";
import QuickRouteLoggerI from "../logger/logger.interface";

export type QuickRouteCacheBaseOptions = {
  logger?: QuickRouteLoggerI;
};

class QuickRouteCacheBase {
  protected logger?: QuickRouteLoggerI;

  constructor(options?: QuickRouteCacheBaseOptions) {
    this.logger = options?.logger;
  }

  public setLogger(logger: QuickRouteLoggerI): void {
    this.logger = logger;
  }

  public hasLogger(): boolean {
    return !!this.logger;
  }

  protected generatePartialAddressKey(
    provider: string,
    params: SearchByPartialAddressParams & { expands: string[] },
  ): string {
    return [provider, params.query, JSON.stringify(params.options), params.expands?.join(":")]
      .filter(Boolean)
      .join(":");
  }
}

export default QuickRouteCacheBase;
