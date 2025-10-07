import { getAxiosResponseErrorCode, HttpClientError, HttpErrorResponseCode } from "../client.http.error";

describe("http client errors", () => {
  it("return an error object with a code, data and original error instance", () => {
    const error = new Error("Test error");
    const httpError = new HttpClientError("TEST_CODE", { info: "test" }, error as any);
    expect(httpError.code).toBe("TEST_CODE");
    expect(httpError.data).toEqual({ info: "test" });
    expect(httpError.original).toBe(error);
  });

  it("should return an error code when axios provides a status", () => {
    const code = getAxiosResponseErrorCode({ response: { status: 404 } } as any);
    expect(code).toBe(HttpErrorResponseCode.NOT_FOUND);
  });

  it("should return an error code when axios provides a code", () => {
    const code = getAxiosResponseErrorCode({ code: "ECONNREFUSED" } as any);
    expect(code).toBe(HttpErrorResponseCode.REFUSED);
  });

  it("should return UNKNOWN when axios provides no status or code", () => {
    const code = getAxiosResponseErrorCode({} as any);
    expect(code).toBe(HttpErrorResponseCode.UNKNOWN);
  });
});
