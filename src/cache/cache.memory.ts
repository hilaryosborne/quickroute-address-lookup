import { SearchByPartialAddressParams } from "../address.lookup";
import QuickRouteLoggerI from "../logger/logger.interface";
import QuickRouteCacheI from "./cache.interface";

const cache = new Map<string, any>();

class QuickRouteCacheMemory implements QuickRouteCacheI {
  protected logger?: QuickRouteLoggerI;
  constructor(options?: { logger?: QuickRouteLoggerI }) {
    if (options) {
      this.logger = options.logger;
    }
  }
  public setLogger(logger: QuickRouteLoggerI): void {
    this.logger = logger;
  }
  public hasLogger(): boolean {
    return !!this.logger;
  }
  public async getByPartialAddress(params: SearchByPartialAddressParams): Promise<any[] | null> {
    const key = this.generateKey(params);
    return cache.has(key) ? cache.get(key) : null;
  }

  public async setForPartialAddress(params: SearchByPartialAddressParams, results: any[]): Promise<void> {
    const key = this.generateKey(params);
    cache.set(key, results);
  }

  protected generateKey(params: any): string {
    return params.query.toLowerCase().trim();
  }
}

export default QuickRouteCacheMemory;
