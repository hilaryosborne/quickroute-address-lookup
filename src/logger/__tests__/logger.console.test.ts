import QuickRouteLoggerConsole from "../logger.console";

describe("QuickRouteLoggerConsole", () => {
  let consoleSpy: {
    log: jest.SpyInstance;
    error: jest.SpyInstance;
    warn: jest.SpyInstance;
    info: jest.SpyInstance;
    debug: jest.SpyInstance;
  };

  beforeEach(() => {
    consoleSpy = {
      log: jest.spyOn(console, "log").mockImplementation(() => {}),
      error: jest.spyOn(console, "error").mockImplementation(() => {}),
      warn: jest.spyOn(console, "warn").mockImplementation(() => {}),
      info: jest.spyOn(console, "info").mockImplementation(() => {}),
      debug: jest.spyOn(console, "debug").mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("can instantiate the logger console", () => {
    const logger = new QuickRouteLoggerConsole();
    expect(logger).toBeInstanceOf(QuickRouteLoggerConsole);
  });

  it("should log error, warn, info, and log messages but not debug", () => {
    const logger = new QuickRouteLoggerConsole();
    const data = { key: "value" };
    logger.error("error message", { data });
    logger.warn("warn message", { data });
    logger.info("info message", { data });
    logger.log("log message", { data });
    logger.debug("debug message", { data });
    expect(consoleSpy.error).toHaveBeenCalledWith("error message", { data });
    expect(consoleSpy.warn).toHaveBeenCalledWith("warn message", { data });
    expect(consoleSpy.info).toHaveBeenCalledWith("info message", { data });
    expect(consoleSpy.log).toHaveBeenCalledWith("log message", { data });
    expect(consoleSpy.debug).not.toHaveBeenCalled();
  });

  it("should only log error messages", () => {
    const logger = new QuickRouteLoggerConsole({ level: "error" });
    const data = { key: "value" };
    logger.error("error message", data);
    logger.warn("warn message", data);
    logger.info("info message", data);
    logger.log("log message", data);
    logger.debug("debug message", data);
    expect(consoleSpy.error).toHaveBeenCalledWith("error message", data);
    expect(consoleSpy.warn).not.toHaveBeenCalled();
    expect(consoleSpy.info).not.toHaveBeenCalled();
    expect(consoleSpy.log).not.toHaveBeenCalled();
    expect(consoleSpy.debug).not.toHaveBeenCalled();
  });

  it("should log error and warn messages", () => {
    const logger = new QuickRouteLoggerConsole({ level: "warn" });
    const data = { key: "value" };
    logger.error("error message", data);
    logger.warn("warn message", data);
    logger.info("info message", data);
    logger.log("log message", data);
    logger.debug("debug message", data);
    expect(consoleSpy.error).toHaveBeenCalledWith("error message", data);
    expect(consoleSpy.warn).toHaveBeenCalledWith("warn message", data);
    expect(consoleSpy.info).not.toHaveBeenCalled();
    expect(consoleSpy.log).not.toHaveBeenCalled();
    expect(consoleSpy.debug).not.toHaveBeenCalled();
  });

  it("should log all messages", () => {
    const logger = new QuickRouteLoggerConsole({ level: "debug" });
    const data = { key: "value" };
    logger.error("error message", data);
    logger.warn("warn message", data);
    logger.info("info message", data);
    logger.log("log message", data);
    logger.debug("debug message", data);
    expect(consoleSpy.error).toHaveBeenCalledWith("error message", data);
    expect(consoleSpy.warn).toHaveBeenCalledWith("warn message", data);
    expect(consoleSpy.info).toHaveBeenCalledWith("info message", data);
    expect(consoleSpy.log).toHaveBeenCalledWith("log message", data);
    expect(consoleSpy.debug).toHaveBeenCalledWith("debug message", data);
  });

  it("should log error, warn, info, and log messages but not debug", () => {
    const logger = new QuickRouteLoggerConsole({ level: "log" });
    const data = { key: "value" };
    logger.error("error message", data);
    logger.warn("warn message", data);
    logger.info("info message", data);
    logger.log("log message", data);
    logger.debug("debug message", data);
    expect(consoleSpy.error).toHaveBeenCalledWith("error message", data);
    expect(consoleSpy.warn).toHaveBeenCalledWith("warn message", data);
    expect(consoleSpy.info).toHaveBeenCalledWith("info message", data);
    expect(consoleSpy.log).toHaveBeenCalledWith("log message", data);
    expect(consoleSpy.debug).not.toHaveBeenCalled();
  });
});
