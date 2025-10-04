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
    logger.error("error message");
    logger.warn("warn message");
    logger.info("info message");
    logger.log("log message");
    logger.debug("debug message");
    expect(consoleSpy.error).toHaveBeenCalledWith("error message");
    expect(consoleSpy.warn).toHaveBeenCalledWith("warn message");
    expect(consoleSpy.info).toHaveBeenCalledWith("info message");
    expect(consoleSpy.log).toHaveBeenCalledWith("log message");
    expect(consoleSpy.debug).not.toHaveBeenCalled();
  });

  it("should only log error messages", () => {
    const logger = new QuickRouteLoggerConsole({ level: "error" });
    logger.error("error message");
    logger.warn("warn message");
    logger.info("info message");
    logger.log("log message");
    logger.debug("debug message");
    expect(consoleSpy.error).toHaveBeenCalledWith("error message");
    expect(consoleSpy.warn).not.toHaveBeenCalled();
    expect(consoleSpy.info).not.toHaveBeenCalled();
    expect(consoleSpy.log).not.toHaveBeenCalled();
    expect(consoleSpy.debug).not.toHaveBeenCalled();
  });

  it("should log error and warn messages", () => {
    const logger = new QuickRouteLoggerConsole({ level: "warn" });
    logger.error("error message");
    logger.warn("warn message");
    logger.info("info message");
    logger.log("log message");
    logger.debug("debug message");
    expect(consoleSpy.error).toHaveBeenCalledWith("error message");
    expect(consoleSpy.warn).toHaveBeenCalledWith("warn message");
    expect(consoleSpy.info).not.toHaveBeenCalled();
    expect(consoleSpy.log).not.toHaveBeenCalled();
    expect(consoleSpy.debug).not.toHaveBeenCalled();
  });

  it("should log all messages", () => {
    const logger = new QuickRouteLoggerConsole({ level: "debug" });
    logger.error("error message");
    logger.warn("warn message");
    logger.info("info message");
    logger.log("log message");
    logger.debug("debug message");
    expect(consoleSpy.error).toHaveBeenCalledWith("error message");
    expect(consoleSpy.warn).toHaveBeenCalledWith("warn message");
    expect(consoleSpy.info).toHaveBeenCalledWith("info message");
    expect(consoleSpy.log).toHaveBeenCalledWith("log message");
    expect(consoleSpy.debug).toHaveBeenCalledWith("debug message");
  });

  it("should log error, warn, info, and log messages but not debug", () => {
    const logger = new QuickRouteLoggerConsole({ level: "log" });
    logger.error("error message");
    logger.warn("warn message");
    logger.info("info message");
    logger.log("log message");
    logger.debug("debug message");
    expect(consoleSpy.error).toHaveBeenCalledWith("error message");
    expect(consoleSpy.warn).toHaveBeenCalledWith("warn message");
    expect(consoleSpy.info).toHaveBeenCalledWith("info message");
    expect(consoleSpy.log).toHaveBeenCalledWith("log message");
    expect(consoleSpy.debug).not.toHaveBeenCalled();
  });

  it("should default to info level", () => {
    const logger = new QuickRouteLoggerConsole();
    logger.debug("debug message");
    logger.info("info message");
    expect(consoleSpy.debug).not.toHaveBeenCalled();
    expect(consoleSpy.info).toHaveBeenCalledWith("info message");
  });
  it("should default to info level", () => {
    const logger = new QuickRouteLoggerConsole({});
    logger.debug("debug message");
    logger.info("info message");
    expect(consoleSpy.debug).not.toHaveBeenCalled();
    expect(consoleSpy.info).toHaveBeenCalledWith("info message");
  });
});
