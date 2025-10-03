declare let process: {
  env: {
    SERVER_PORT?: number;
    SERVER_LOG_LEVEL?: "error" | "warn" | "info" | "debug" | "log";
    TOMTOM_API_KEY?: string;
    TOMTOM_USER_MAX_REQUESTS?: number;
    TOMTOM_USER_MAX_REQUESTS_PER?: "second" | "minute" | "hour" | "day";
  };
  exit: (code: number) => void;
  stdin: {
    resume: () => void;
  };
  on: (event: string, callback: () => void) => void;
};
