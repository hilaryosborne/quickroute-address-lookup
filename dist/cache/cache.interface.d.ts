import { SearchByPartialAddressParams } from "../address.lookup";
import { LocationModelType } from "../models/location.model";
interface QuickRouteCacheI {
    getByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationModelType[] | null>;
    setForPartialAddress(params: SearchByPartialAddressParams, results: LocationModelType[]): Promise<void>;
}
export default QuickRouteCacheI;
//# sourceMappingURL=cache.interface.d.ts.map