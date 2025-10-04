import QuickRouteCacheI from "./cache/cache.interface";
import QuickRouteCacheMemory from "./cache/cache.memory";
import QuickRouteLoggerConsole from "./logger/logger.console";
import QuickRouteLoggerI from "./logger/logger.interface";
import { LocationModelType } from "./models/location.model";
import QuickRouteProviderI from "./provider/provider.interface";
import QuickRouteProviderTomTom from "./provider/provider.tomtom";

type QuickRouteAddressLookupOptions = {
  logger?: QuickRouteLoggerI;
  cache?: QuickRouteCacheI;
  provider?: QuickRouteProviderI;
};

export type SearchByPartialAddressParams = {
  query: string;
  clientId: string;
  correlationId?: string;
  latLong?: { lat: number; lng: number };
  expands?: ("address" | "geo" | "provider")[];
};

class QuickRouteAddressLookup {
  protected cache?: QuickRouteCacheI;
  protected logger: QuickRouteLoggerI;
  protected provider: QuickRouteProviderI;

  constructor(protected options?: QuickRouteAddressLookupOptions) {
    this.logger = options?.logger || new QuickRouteLoggerConsole();
    // I really miss dependency injection here
    // there are some benefits to utilising the factory pattern
    // this allows for this class to perform additional setup if required
    this.cache = this.createCache(options?.cache);
    this.provider = options?.provider || new QuickRouteProviderTomTom({ apiKey: process.env.TOMTOM_API_KEY! });
  }

  protected createCache(cache: QuickRouteCacheI | undefined) {
    if (cache && !cache.hasLogger()) {
      cache.setLogger(this.logger);
      return cache;
    } else if (cache) return cache;
    else return new QuickRouteCacheMemory({ logger: this.logger });
  }

  protected createProvider(provider: QuickRouteProviderI) {
    if (provider && !provider.hasLogger()) {
      provider.setLogger(this.logger);
      return provider;
    } else if (provider) return provider;
    else return new QuickRouteProviderTomTom({ logger: this.logger });
  }

  public async searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationModelType[]> {
    try {
      // really ummed and ahhed over this one, should a caching layer be optional?
      // to be as flexible as possible I think it should.. though heavily recommended to use one
      if (this.cache) {
        const cached = await this.cache.getByPartialAddress(params);
        if (cached) {
          this.logger.log("Cache hit");
          return cached;
        } else this.logger.log("Cache miss");
      }
      const results = await this.provider.searchByPartialAddress(params);
      // setting the cache shouldn't block the return of results
      if (this.cache) this.cache.setForPartialAddress(params, results);
      return results;
    } catch (error) {
      this.logger.error("Error searching by partial address");
      return [];
    }
  }
}

export default QuickRouteAddressLookup;
