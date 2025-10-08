import { BaseError } from "../../error";
import QuickRouteLoggerConsole from "../../logger/logger.console";
import HttpClient from "../client.http";
import { HttpErrorResponseCode } from "../client.http.error";

class HttpClientTest extends HttpClient {
  public sanitize(data: any, blacklist: string[]): any {
    return super.sanitize(data, blacklist);
  }
}

describe("client.http.test", () => {
  it("can be instantiated with config options", () => {
    const http = new HttpClient({
      base: { protocol: "http", host: "localhost", port: 3000 },
      logger: new QuickRouteLoggerConsole({ level: "debug" }),
    });
    expect(http).toBeInstanceOf(HttpClient);
  });

  it("can can strip sensitive information from logs", () => {
    const http = new HttpClientTest({
      base: { protocol: "http", host: "localhost", port: 3000 },
      logger: new QuickRouteLoggerConsole({ level: "debug" }),
    });
    const sanitized = http.sanitize({ apiKey: "examplekey123", address: "47 Dan Street" }, ["apiKey"]);
    expect(sanitized).toEqual({ address: "47 Dan Street", apiKey: "[REDACTED]" });
  });

  it("can successfully make a GET request", async () => {
    const http = new HttpClient({
      base: { protocol: "http", host: "api.example.com" },
      logger: new QuickRouteLoggerConsole({ level: "debug" }),
    });
    const response = await http.get("success", {});
    expect(response).toEqual({ message: "success" });
  });

  it("can handle a GET request that results in a 404 response", async () => {
    try {
      const http = new HttpClient({
        base: { protocol: "http", host: "api.example.com" },
        logger: new QuickRouteLoggerConsole({ level: "debug" }),
      });
      await http.get("error/not.found", {});
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.code).toBe(HttpErrorResponseCode.NOT_FOUND);
        expect(error.context).toBeDefined();
        expect(error.originalError).toBeDefined();
      } else throw error;
    }
  });

  it("can handle a GET request that results in a 500 response", async () => {
    try {
      const http = new HttpClient({
        base: { protocol: "http", host: "api.example.com" },
        logger: new QuickRouteLoggerConsole({ level: "debug" }),
      });
      await http.get("error/server.error", {});
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.code).toBe(HttpErrorResponseCode.SERVER_ERROR);
        expect(error.context).toBeDefined();
        expect(error.originalError).toBeDefined();
      } else throw error;
    }
  });
});
