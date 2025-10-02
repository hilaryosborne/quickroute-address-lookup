import QuickRouteLoggerI from "../logger/logger.interface";
export type HttpRequestOptions = {
    headers?: {
        [key: string]: string;
    };
};
declare class HttpClient {
    private logger;
    constructor(logger: QuickRouteLoggerI);
    get(url: string, opts?: HttpRequestOptions): Promise<any>;
}
export default HttpClient;
//# sourceMappingURL=client.http.d.ts.map