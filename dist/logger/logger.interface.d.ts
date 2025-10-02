export type QuickRouteLoggerOptions = {
    level?: "error" | "warn" | "info" | "debug" | "log";
};
interface QuickRouteLoggerI {
    log: (message: string) => void;
    error: (message: string) => void;
    warn: (message: string) => void;
    info: (message: string) => void;
    debug: (message: string) => void;
}
export default QuickRouteLoggerI;
//# sourceMappingURL=logger.interface.d.ts.map