import QuickRouteCacheMemory from "../../cache/cache.memory";
import QuickRouteLoggerConsole from "../../logger/logger.console";
import QuickRouteProviderErrors from "../provider.errors";
import QuickRouteProviderTomTom, { QuickRouteProviderTomTomParams } from "../provider.tomtom";

class QuickRouteProviderTomTomTest extends QuickRouteProviderTomTom {
  constructor(params?: QuickRouteProviderTomTomParams) {
    super(params);
  }
  public getApiConfig() {
    return this.api;
  }
}

describe("provider tomtom", () => {
  it("can instantiate the tom tom provider using provided config", async () => {
    const provider = new QuickRouteProviderTomTomTest({
      api: { key: "test-key", protocol: "https", host: "api.tomtom.com", port: undefined },
    });
    expect(provider).toBeInstanceOf(QuickRouteProviderTomTom);
    expect(provider.getApiConfig()).toEqual({
      key: "test-key",
      protocol: "https",
      host: "api.tomtom.com",
      port: undefined,
    });
  });

  it("can instantiate the tom tom provider using default env vars", async () => {
    process.env.PROVIDER_TOMTOM_API_KEY = "test-key";
    process.env.PROVIDER_TOMTOM_API_PROTOCOL = "https";
    process.env.PROVIDER_TOMTOM_API_HOST = "api.tomtom.com";
    const provider = new QuickRouteProviderTomTomTest({});
    expect(provider).toBeInstanceOf(QuickRouteProviderTomTom);
    expect(provider.getApiConfig()).toEqual({
      key: "test-key",
      protocol: "https",
      host: "api.tomtom.com",
      port: undefined,
    });
  });

  it("will error if no api key is provided", async () => {
    try {
      process.env.PROVIDER_TOMTOM_API_KEY = "";
      process.env.PROVIDER_TOMTOM_API_PROTOCOL = "https";
      process.env.PROVIDER_TOMTOM_API_HOST = "api.tomtom.com";
      new QuickRouteProviderTomTomTest({});
    } catch (err) {
      expect((err as Error).message).toBe(QuickRouteProviderErrors.MISSING_PROVIDER_API_KEY);
    }
  });

  it("will error if no api protocol is provided", async () => {
    try {
      process.env.PROVIDER_TOMTOM_API_KEY = "test-key";
      process.env.PROVIDER_TOMTOM_API_PROTOCOL = "";
      process.env.PROVIDER_TOMTOM_API_HOST = "api.tomtom.com";
      new QuickRouteProviderTomTomTest({});
    } catch (err) {
      expect((err as Error).message).toBe(QuickRouteProviderErrors.MISSING_PROVIDER_API_PROTOCOL);
    }
  });

  it("will error if no api host is provided", async () => {
    try {
      process.env.PROVIDER_TOMTOM_API_KEY = "test-key";
      process.env.PROVIDER_TOMTOM_API_PROTOCOL = "http";
      process.env.PROVIDER_TOMTOM_API_HOST = "";
      new QuickRouteProviderTomTomTest({});
    } catch (err) {
      expect((err as Error).message).toBe(QuickRouteProviderErrors.MISSING_PROVIDER_API_HOST);
    }
  });

  it("can display results from tomtom", async () => {
    const provider = new QuickRouteProviderTomTomTest({
      logger: new QuickRouteLoggerConsole(),
      cache: new QuickRouteCacheMemory(),
      api: { key: "test-key", protocol: "https", host: "api.tomtom.com" },
    });
    const results = await provider.searchByPartialAddress({ query: "47 Dan Street" });
    expect(results.length).toBeGreaterThan(0);
    const first = results[0];
    expect(first).toHaveProperty("id");
    expect(first).toHaveProperty("address");
    expect(first).toHaveProperty("geo");
    expect(first).toHaveProperty("provider");
  });

  it("can display results from tomtom with only address", async () => {
    const provider = new QuickRouteProviderTomTomTest({
      logger: new QuickRouteLoggerConsole(),
      cache: new QuickRouteCacheMemory(),
      api: { key: "test-key", protocol: "https", host: "api.tomtom.com" },
    });
    const results = await provider.searchByPartialAddress({ query: "47 Dan Street", expands: ["address"] });
    expect(results.length).toBeGreaterThan(0);
    const first = results[0];
    expect(first).toHaveProperty("id");
    expect(first.address).toBeDefined();
    expect(first.geo).toBeUndefined();
    expect(first.provider).toBeUndefined();
  });

  it("can display results from tomtom with address and geo", async () => {
    const provider = new QuickRouteProviderTomTomTest({
      logger: new QuickRouteLoggerConsole(),
      cache: new QuickRouteCacheMemory(),
      api: { key: "test-key", protocol: "https", host: "api.tomtom.com" },
    });
    const results = await provider.searchByPartialAddress({ query: "47 Dan Street", expands: ["address", "geo"] });
    expect(results.length).toBeGreaterThan(0);
    const first = results[0];
    expect(first).toHaveProperty("id");
    expect(first.address).toBeDefined();
    expect(first.geo).toBeDefined();
    expect(first.provider).toBeUndefined();
  });

  it("can display results from tomtom with only geo", async () => {
    const provider = new QuickRouteProviderTomTomTest({
      logger: new QuickRouteLoggerConsole(),
      cache: new QuickRouteCacheMemory(),
      api: { key: "test-key", protocol: "https", host: "api.tomtom.com" },
    });
    const results = await provider.searchByPartialAddress({ query: "47 Dan Street", expands: ["geo"] });
    expect(results.length).toBeGreaterThan(0);
    const first = results[0];
    expect(first).toHaveProperty("id");
    expect(first.address).toBeUndefined();
    expect(first.geo).toBeDefined();
    expect(first.provider).toBeUndefined();
  });
});
