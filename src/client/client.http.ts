import fetch from "node-fetch";
import QuickRouteLoggerI from "../logger/logger.interface";

export type HttpRequestOptions = {
  headers?: { [key: string]: string };
};

class HttpClient {
  constructor(private logger: QuickRouteLoggerI) {}
  public async get(url: string, opts?: HttpRequestOptions): Promise<any> {
    this.logger.debug(`HTTP GET: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

export default HttpClient;
