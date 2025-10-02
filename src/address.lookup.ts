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
    this.cache = options?.cache || new QuickRouteCacheMemory();
    this.provider = options?.provider || new QuickRouteProviderTomTom({ apiKey: process.env.TOMTOM_API_KEY! });
  }

  public async searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationModelType[]> {
    try {
      const cached = await this.cache.getByPartialAddress(params);
      if (cached) return cached;
      const results = await this.provider.searchByPartialAddress(params);
      await this.cache.setForPartialAddress(params, results);
      return results;
    } catch (error) {
      this.logger.error("Error searching by partial address");
      return [];
    }
  }
}

export default QuickRouteAddressLookup;
