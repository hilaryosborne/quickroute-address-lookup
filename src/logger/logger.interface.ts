export type QuickRouteLoggerOptions = {
  level?: "error" | "warn" | "info" | "debug" | "log";
};

interface QuickRouteLoggerI {
  log: (message: string, data?: Record<string, unknown>) => void;
  error: (message: string, data?: Record<string, unknown>) => void;
  warn: (message: string, data?: Record<string, unknown>) => void;
  info: (message: string, data?: Record<string, unknown>) => void;
  debug: (message: string, data?: Record<string, unknown>) => void;
}

export default QuickRouteLoggerI;
