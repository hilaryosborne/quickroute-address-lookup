import fetch from "node-fetch";
import QuickRouteLoggerI from "../logger/logger.interface";

export type HttpRequestOptions = {
  headers?: { [key: string]: string };
};

type HttpClientParams = {
  base: { protocol: string; host: string; port?: number };
  logger: QuickRouteLoggerI;
};

class HttpClient {
  private logger: QuickRouteLoggerI;
  private base: { protocol: string; host: string; port?: number };
  constructor(params: HttpClientParams) {
    this.logger = params.logger;
    this.base = params.base;
  }
  protected getUrl(endpoint: string, query?: Record<string, any>): URL {
    let url: URL;
    if (this.base.port) url = new URL(`${this.base.protocol}://${this.base.host}:${this.base.port}/${endpoint}`);
    else url = new URL(`${this.base.protocol}://${this.base.host}/${endpoint}`);
    if (query) Object.keys(query).forEach((key) => url.searchParams.append(key, query[key]));
    return url;
  }
  public async get<R extends Record<string, unknown>>(
    endpoint: string,
    params: Record<string, any>,
    opts?: HttpRequestOptions,
  ): Promise<R> {
    const url = this.getUrl(endpoint, params);
    console.log(url.toString());
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...opts?.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as R;
  }
}

export default HttpClient;
