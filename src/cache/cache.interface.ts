import { SearchByPartialAddressParams } from "../address.lookup";
import { QuickRouteLoggerI } from "../logger";
import { LocationModelType } from "../models/location.model";

interface QuickRouteCacheI {
  setLogger(logger: QuickRouteLoggerI): void;
  hasLogger(): boolean;
  getByPartialAddress<L extends LocationModelType>(provider: string, params: SearchByPartialAddressParams): Promise<L[] | null>;
  setForPartialAddress<L extends LocationModelType>(provider: string, params: SearchByPartialAddressParams, results: L[]): Promise<void>;
}

export default QuickRouteCacheI;
