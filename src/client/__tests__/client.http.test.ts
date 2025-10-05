import QuickRouteLoggerConsole from "../../logger/logger.console";
import HttpClient from "../client.http";
import { HttpResponseEvents } from "../client.http.const";

describe("client.http.test", () => {
  it("can be instantiated with config options", () => {
    const http = new HttpClient({
      base: { protocol: "http", host: "localhost", port: 3000 },
      logger: new QuickRouteLoggerConsole({ level: "debug" }),
    });
    expect(http).toBeInstanceOf(HttpClient);
  });

  it("can successfully make a GET request", async () => {
    const http = new HttpClient({
      base: { protocol: "http", host: "api.example.com" },
      logger: new QuickRouteLoggerConsole({ level: "debug" }),
    });
    const response = await http.get("helloWorld", {});
    expect(response).toEqual({ message: "Hello, World!" });
  });

  it("can handle an unsuccessful GET request", async () => {
    try {
      const http = new HttpClient({
        base: { protocol: "http", host: "api.example.com" },
        logger: new QuickRouteLoggerConsole({ level: "debug" }),
      });
      await http.get("notFound", {});
    } catch (error: any) {
      expect(error.code).toBe(HttpResponseEvents.SERVER_ERROR);
    }
  });
});
