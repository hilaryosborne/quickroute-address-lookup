import QuickRouteLoggerConsole from "./logger.console";

describe("logger console", () => {
  it("can instantiate the logger console", async () => {
    const logger = new QuickRouteLoggerConsole();
    expect(logger).toBeInstanceOf(QuickRouteLoggerConsole);
  });
});
