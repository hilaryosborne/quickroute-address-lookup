import { SearchByPartialAddressParams } from "../address.lookup";
import QuickRouteCacheI from "./cache.interface";
declare class QuickRouteCacheMemory implements QuickRouteCacheI {
    getByPartialAddress(params: SearchByPartialAddressParams): Promise<any[] | null>;
    setForPartialAddress(params: SearchByPartialAddressParams, results: any[]): Promise<void>;
    protected generateKey(params: any): string;
}
export default QuickRouteCacheMemory;
//# sourceMappingURL=cache.memory.d.ts.map