import { QuickRouteLoggerI } from "@hilaryosborne/quickroute-address-lookup";

class QuickRouteWinstonLogger implements QuickRouteLoggerI {
  constructor(options: { level: string }) {}
  error(message: string, data?: Record<string, unknown>) {}
  warn(message: string, data?: Record<string, unknown>) {}
  info(message: string, data?: Record<string, unknown>) {}
  debug(message: string, data?: Record<string, unknown>) {}
  log(message: string) {}
}

export default QuickRouteWinstonLogger;
