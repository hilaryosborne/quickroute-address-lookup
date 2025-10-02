import QuickRouteLoggerI, { QuickRouteLoggerOptions } from "./logger.interface";
declare class QuickRouteLoggerConsole implements QuickRouteLoggerI {
    private options?;
    constructor(options?: QuickRouteLoggerOptions | undefined);
    log(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
}
export default QuickRouteLoggerConsole;
//# sourceMappingURL=logger.console.d.ts.map