import QuickRouteProviderI from "./provider.interface";
import { ProviderTomTomSearchResponseResult } from "./provider.tomtom.response.type";
import { LocationTomTomModelType } from "../models/location.tomtom.model";
import { SearchByPartialAddressParams } from "../address.lookup";
type QuickRouteProviderTomTomOptions = {
    apiKey: string;
    limits?: {
        maxRequests: number;
        per: "second" | "minute" | "hour" | "day";
    };
};
declare class QuickRouteProviderTomTom implements QuickRouteProviderI {
    constructor(options?: QuickRouteProviderTomTomOptions);
    searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationTomTomModelType[]>;
    protected expandAddress(location: ProviderTomTomSearchResponseResult): LocationTomTomModelType["address"];
    protected expandGeo(location: ProviderTomTomSearchResponseResult): LocationTomTomModelType["geo"];
    protected expandProvider(location: ProviderTomTomSearchResponseResult): LocationTomTomModelType["provider"];
}
export default QuickRouteProviderTomTom;
//# sourceMappingURL=provider.tomtom.d.ts.map