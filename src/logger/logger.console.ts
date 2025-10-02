import QuickRouteLoggerI, { QuickRouteLoggerOptions } from "./logger.interface";

class QuickRouteLoggerConsole implements QuickRouteLoggerI {
  constructor(private options?: QuickRouteLoggerOptions) {}
  log(message: string): void {
    console.log(message);
  }
  error(message: string): void {
    console.error(message);
  }
  warn(message: string): void {
    console.warn(message);
  }
  info(message: string) {
    console.info(message);
  }
  debug(message: string) {
    console.debug(message);
  }
}

export default QuickRouteLoggerConsole;
