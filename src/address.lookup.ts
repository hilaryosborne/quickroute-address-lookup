import QuickRouteCacheI from "./cache/cache.interface";
import QuickRouteLoggerI from "./logger/logger.interface";
import { QuickRouteProviders } from "./provider";
import QuickRouteProviderI from "./provider/provider.interface";

type QuickRouteAddressLookupOptions = {
  logger?: QuickRouteLoggerI;
  cache?: QuickRouteCacheI;
  providers?: QuickRouteProviderI[];
};

class QuickRouteAddressLookup {
  constructor(protected options?: QuickRouteAddressLookupOptions) {}

  public async searchByPartialAddress(params: {
    provider: QuickRouteProviders | string;
    query: string;
    clientId: string;
    correlationId?: string;
    latLong?: { lat: number; lng: number };
    expand?: ("address" | "geo" | "vendor")[];
  }): Promise<any[]> {
    const adapter = this.options?.providers?.find((p) => p.code === params.provider);
    if (!adapter) throw new Error("PROVIDER_NOT_FOUND");
    return [];
  }
}

export default QuickRouteAddressLookup;
