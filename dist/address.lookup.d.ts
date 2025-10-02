import QuickRouteCacheI from "./cache/cache.interface";
import QuickRouteLoggerI from "./logger/logger.interface";
import { LocationModelType } from "./models/location.model";
import QuickRouteProviderI from "./provider/provider.interface";
type QuickRouteAddressLookupOptions = {
    logger?: QuickRouteLoggerI;
    cache?: QuickRouteCacheI;
    provider?: QuickRouteProviderI;
};
export type SearchByPartialAddressParams = {
    query: string;
    clientId: string;
    correlationId?: string;
    latLong?: {
        lat: number;
        lng: number;
    };
    expands?: ("address" | "geo" | "provider")[];
};
declare class QuickRouteAddressLookup {
    protected options?: QuickRouteAddressLookupOptions | undefined;
    protected cache: QuickRouteCacheI;
    protected logger: QuickRouteLoggerI;
    protected provider: QuickRouteProviderI;
    constructor(options?: QuickRouteAddressLookupOptions | undefined);
    searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationModelType[]>;
}
export default QuickRouteAddressLookup;
//# sourceMappingURL=address.lookup.d.ts.map