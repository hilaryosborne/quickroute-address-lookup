import { SearchByPartialAddressParams } from "../address.lookup";
import { QuickRouteLoggerI } from "../logger";
import { LocationModelType } from "../models/location.model";

interface QuickRouteCacheI {
  setLogger(logger: QuickRouteLoggerI): void;
  hasLogger(): boolean;
  getByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationModelType[] | null>;
  setForPartialAddress(params: SearchByPartialAddressParams, results: LocationModelType[]): Promise<void>;
}

export default QuickRouteCacheI;
