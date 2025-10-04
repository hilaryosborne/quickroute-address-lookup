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
  protected cache: QuickRouteCacheI;
  protected logger: QuickRouteLoggerI;
  protected provider: QuickRouteProviderI;

  constructor(protected options?: QuickRouteAddressLookupOptions) {
    this.logger = options?.logger || new QuickRouteLoggerConsole();
    // I really miss dependency injection here
    // there are some benefits to utilising the factory pattern
    // this allows for this class to perform additional setup if required
    this.cache = this.createCache(options?.cache);
    this.provider = this.createProvider(options?.provider);
  }

  protected createCache(cache?: QuickRouteCacheI): QuickRouteCacheI {
    if (cache && !cache.hasLogger()) {
      cache.setLogger(this.logger);
      return cache;
    } else if (cache) return cache;
    else return new QuickRouteCacheMemory({ logger: this.logger });
  }

  protected createProvider(provider?: QuickRouteProviderI): QuickRouteProviderI {
    if (provider) {
      if (!provider.hasLogger()) provider.setLogger(this.logger);
      if (!provider.hasCache()) provider.setCache(this.cache);
      return provider;
    } else return new QuickRouteProviderTomTom({ logger: this.logger, cache: this.cache });
  }

  public async searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationModelType[]> {
    try {
      const results = await this.provider.searchByPartialAddress(params);
      return results;
    } catch (error) {
      this.logger.error("Error searching by partial address");
      return [];
    }
  }
}

export default QuickRouteAddressLookup;
