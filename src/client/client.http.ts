import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import QuickRouteLoggerI from "../logger/logger.interface";
import { v4 as uuidv4 } from "uuid";
import { HttpLogEvents } from "./client.http.const";
import { sanitizeObject } from "./client.http.util.sanitise";
import { getAxiosResponseErrorCode, HttpClientError, HttpErrorResponseCode } from "./client.http.error";

export type HttpRequestOptions = {
  headers?: { [key: string]: string };
  logging?: {
    blacklist: {
      request?: string[];
      response?: string[];
      error?: string[];
    };
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

  protected sanitize(obj: Record<string, unknown>, blacklistedPaths: string[] = []): Record<string, unknown> {
    return sanitizeObject(obj, "", blacklistedPaths);
  }

  protected createHttpClient(opts: HttpRequestOptions): AxiosInstance {
    let url: URL;
    if (this.base.port) url = new URL(`${this.base.protocol}://${this.base.host}:${this.base.port}`);
    else url = new URL(`${this.base.protocol}://${this.base.host}`);
    const client = axios.create({ baseURL: url.toString(), timeout: 10000 });
    // Request interceptor
    client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      config.headers["X-Request-ID"] = uuidv4();
      config.headers["Content-Type"] = "application/json";
      const data = this.sanitize(
        {
          timestamp: new Date().toISOString(),
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params,
          headers: config.headers,
          data: config.data,
        },
        opts?.logging?.blacklist?.request || [],
      );
      this.logger.log(HttpLogEvents.REQUEST, data);
      return config;
    });

    client.interceptors.response.use(
      (response: AxiosResponse) => {
        const data = this.sanitize(
          {
            timestamp: new Date().toISOString(),
            status: response.status,
            statusText: response.statusText,
            url: response.config.url,
            headers: response.headers,
            data: response.data,
          },
          opts?.logging?.blacklist?.response || [],
        );
        this.logger.log(HttpLogEvents.RESPONSE, data);
        return response;
      },
      (error: AxiosError) => {
        const code: HttpErrorResponseCode = getAxiosResponseErrorCode(error);
        const context = this.sanitize(
          {
            timestamp: new Date().toISOString(),
            status: error.response?.status,
            statusText: error.response?.statusText,
            headers: error.response?.headers,
            data: error.response?.data,
            message: error.message,
            url: error.config?.url,
          },
          opts?.logging?.blacklist?.error || [],
        );
        return Promise.reject(new HttpClientError(code, context, error));
      },
    );
    return client;
  }

  public async get<R extends Record<string, unknown>>(
    endpoint: string,
    params: Record<string, any>,
    opts?: HttpRequestOptions,
  ): Promise<R> {
    const client = this.createHttpClient({ logging: opts?.logging });
    const response = await client.get<R>(endpoint, { params, headers: opts?.headers });
    return response.data;
  }
}

export default HttpClient;
