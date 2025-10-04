import { SearchByPartialAddressParams } from "../address.lookup";
import QuickRouteLoggerI from "../logger/logger.interface";
import { LocationModelType } from "../models/location.model";

interface QuickRouteProviderI {
  setLogger(logger: QuickRouteLoggerI): void;
  hasLogger(): boolean;
  searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationModelType[]>;
}

export default QuickRouteProviderI;
