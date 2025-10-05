import QuickRouteLoggerI, { QuickRouteLoggerOptions } from "./logger.interface";

class QuickRouteLoggerConsole implements QuickRouteLoggerI {
  private readonly level: string;
  private readonly levels: { [key: string]: number } = {
    error: 0,
    warn: 1,
    info: 2,
    log: 2,
    debug: 3,
  };

  constructor(options?: QuickRouteLoggerOptions) {
    this.level = options?.level || "info";
  }

  private shouldLog(level: string): boolean {
    const currentIndex = this.levels[this.level];
    const messageIndex = this.levels[level];
    return messageIndex <= currentIndex;
  }

  log(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog("log")) return;
    console.log(message, data);
  }

  error(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog("error")) return;
    console.error(message, data);
  }

  warn(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog("warn")) return;
    console.warn(message, data);
  }

  info(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog("info")) return;
    console.info(message, data);
  }

  debug(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog("debug")) return;
    console.debug(message, data);
  }
}

export default QuickRouteLoggerConsole;
