import { SearchByPartialAddressParams } from "../address.lookup";
import { LocationModelType } from "../models/location.model";
interface QuickRouteProviderI {
    searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationModelType[]>;
}
export default QuickRouteProviderI;
//# sourceMappingURL=provider.interface.d.ts.map