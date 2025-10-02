import QuickRouteCacheI from "./cache/cache.interface";
import QuickRouteLoggerI from "./logger/logger.interface";
import { QuickRouteProviders } from "./provider";
import QuickRouteProviderI from "./provider/provider.interface";
type QuickRouteAddressLookupOptions = {
    logger?: QuickRouteLoggerI;
    cache?: QuickRouteCacheI;
    providers?: QuickRouteProviderI[];
};
declare class QuickRouteAddressLookup {
    protected options?: QuickRouteAddressLookupOptions | undefined;
    constructor(options?: QuickRouteAddressLookupOptions | undefined);
    searchByPartialAddress(params: {
        provider: QuickRouteProviders | string;
        query: string;
        clientId: string;
        correlationId?: string;
        latLong?: {
            lat: number;
            lng: number;
        };
        expand?: ("address" | "geo" | "vendor")[];
    }): Promise<any[]>;
}
export default QuickRouteAddressLookup;
//# sourceMappingURL=address.lookup.d.ts.map