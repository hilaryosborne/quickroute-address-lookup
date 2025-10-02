import { QuickRouteProviders } from ".";
import QuickRouteProviderI from "./provider.interface";
type QuickRouteProviderTomTomOptions = {
    apiKey: string;
    limits?: {
        maxRequests: number;
        per: "second" | "minute" | "hour" | "day";
    };
};
declare class QuickRouteProviderTomTom implements QuickRouteProviderI {
    code: QuickRouteProviders;
    constructor(options?: QuickRouteProviderTomTomOptions);
}
export default QuickRouteProviderTomTom;
//# sourceMappingURL=provider.tomtom.d.ts.map