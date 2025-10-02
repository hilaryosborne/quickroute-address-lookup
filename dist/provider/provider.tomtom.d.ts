import QuickRouteProviderI from "./provider.interface";
import { ProviderTomTomSearchResponseResult } from "./provider.tomtom.response.type";
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
    searchByPartialAddress(params: SearchByPartialAddressParams): Promise<any[]>;
    protected expandAddress(location: ProviderTomTomSearchResponseResult): {
        label: string | undefined;
        street: {
            number: string | undefined;
            name: string | undefined;
            type: undefined;
        };
        suburb: string | undefined;
        city: string | undefined;
        state: {
            name: string | undefined;
            code: string | undefined;
        };
        postcode: string | undefined;
        country: {
            name: string | undefined;
            code: string | undefined;
        };
    };
    protected expandGeo(location: ProviderTomTomSearchResponseResult): {
        lat: number;
        lng: number;
    };
    protected expandProvider(location: ProviderTomTomSearchResponseResult): {
        type: "TomTom";
        id: string;
        score: number;
        viewport: {
            topLeftPoint: {
                lat: number;
                lng: number;
            };
            btmRightPoint: {
                lat: number;
                lng: number;
            };
        } | undefined;
    };
}
export default QuickRouteProviderTomTom;
//# sourceMappingURL=provider.tomtom.d.ts.map