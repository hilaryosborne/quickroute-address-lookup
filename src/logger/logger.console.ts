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
    console.log(message, JSON.stringify(data || {}));
  }

  error(message: string, data?: Record<string, any>): void {
    console.error(message, JSON.stringify(data || {}));
  }

  warn(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog("warn")) return;
    console.warn(message, JSON.stringify(data || {}));
  }

  info(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog("info")) return;
    console.info(message, JSON.stringify(data || {}));
  }

  debug(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog("debug")) return;
    console.debug(message, JSON.stringify(data || {}));
  }
}

export default QuickRouteLoggerConsole;
