import fetch from "node-fetch";
import QuickRouteLoggerI from "../logger/logger.interface";

export type HttpRequestOptions = {
  headers?: { [key: string]: string };
  logger?: {
    onRequest?: (req: any) => any;
    onResponse?: (res: any) => any;
  };
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
    this.logger.info(
      `QUICKROUTE_HTTP_REQUEST`,
      opts?.logger?.onRequest?.({ endpoint, params: { ...params }, opts: { ...opts } }) || {
        endpoint,
        params: { ...params },
        opts: { ...opts },
      },
    );
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
    const json = await response.json();
    this.logger.info(
      `QUICKROUTE_HTTP_RESPONSE`,
      opts?.logger?.onResponse?.({ endpoint, params: { ...params }, opts: { ...opts }, response: json }) || {
        endpoint,
        params: { ...params },
        opts: { ...opts },
        response: json,
      },
    );
    return json as R;
  }
}

export default HttpClient;
