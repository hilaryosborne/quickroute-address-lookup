import { SearchByPartialAddressParams } from "../address.lookup";
import QuickRouteCacheI from "../cache/cache.interface";
import QuickRouteLoggerI from "../logger/logger.interface";
import { LocationModelType } from "../models/location.model";

interface QuickRouteProviderI {
  setLogger(logger: QuickRouteLoggerI): void;
  hasLogger(): boolean;
  setCache(cache: QuickRouteCacheI): void;
  hasCache(): boolean;
  searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationModelType[]>;
}

export default QuickRouteProviderI;
