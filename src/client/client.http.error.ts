import { AxiosError } from "axios";
import BaseError from "../error/base.error";

export enum HttpErrorResponseCode {
  NO_CONTENT = "HTTP_RESPONSE_NO_CONTENT",
  BAD_REQUEST = "HTTP_RESPONSE_BAD_REQUEST",
  UNAUTHORIZED = "HTTP_RESPONSE_UNAUTHORIZED",
  FORBIDDEN = "HTTP_RESPONSE_FORBIDDEN",
  NOT_FOUND = "HTTP_RESPONSE_NOT_FOUND",
  CONFLICT = "HTTP_RESPONSE_CONFLICT",
  UNPROCESSABLE_ENTITY = "HTTP_RESPONSE_UNPROCESSABLE_ENTITY",
  TOO_MANY_REQUESTS = "HTTP_RESPONSE_TOO_MANY_REQUESTS",
  SERVER_ERROR = "HTTP_RESPONSE_SERVER_ERROR",
  BAD_GATEWAY = "HTTP_RESPONSE_BAD_GATEWAY",
  SERVICE_UNAVAILABLE = "HTTP_RESPONSE_SERVICE_UNAVAILABLE",
  GATEWAY_TIMEOUT = "HTTP_RESPONSE_GATEWAY_TIMEOUT",
  REFUSED = "HTTP_RESPONSE_REFUSED",
  TIMEOUT = "HTTP_RESPONSE_TIMEOUT",
  NETWORK_ERROR = "HTTP_RESPONSE_NETWORK_ERROR",
  DNS_ERROR = "HTTP_RESPONSE_DNS_ERROR",
  ABORTED = "HTTP_RESPONSE_ABORTED",
  SSL_ERROR = "HTTP_RESPONSE_SSL_ERROR",
  UNKNOWN = "HTTP_RESPONSE_UNKNOWN",
}

export const HttpClientErrorMessage: Record<HttpErrorResponseCode, string> = {
  [HttpErrorResponseCode.NO_CONTENT]: "No Content",
  [HttpErrorResponseCode.BAD_REQUEST]: "Bad Request",
  [HttpErrorResponseCode.UNAUTHORIZED]: "Unauthorized",
  [HttpErrorResponseCode.FORBIDDEN]: "Forbidden",
  [HttpErrorResponseCode.NOT_FOUND]: "Not Found",
  [HttpErrorResponseCode.CONFLICT]: "Conflict",
  [HttpErrorResponseCode.UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
  [HttpErrorResponseCode.TOO_MANY_REQUESTS]: "Too Many Requests",
  [HttpErrorResponseCode.SERVER_ERROR]: "Internal Server Error",
  [HttpErrorResponseCode.BAD_GATEWAY]: "Bad Gateway",
  [HttpErrorResponseCode.SERVICE_UNAVAILABLE]: "Service Unavailable",
  [HttpErrorResponseCode.GATEWAY_TIMEOUT]: "Gateway Timeout",
  [HttpErrorResponseCode.REFUSED]: "Connection Refused",
  [HttpErrorResponseCode.TIMEOUT]: "Connection Timed Out",
  [HttpErrorResponseCode.NETWORK_ERROR]: "Network Error",
  [HttpErrorResponseCode.DNS_ERROR]: "DNS Resolution Error",
  [HttpErrorResponseCode.ABORTED]: "Request Aborted",
  [HttpErrorResponseCode.SSL_ERROR]: "SSL Error",
  [HttpErrorResponseCode.UNKNOWN]: "Unknown Error",
};

export const AxiosErrorCodeToHttpErrorResponseCode: Record<string, HttpErrorResponseCode> = {
  ERR_BAD_REQUEST: HttpErrorResponseCode.BAD_REQUEST,
  ECONNREFUSED: HttpErrorResponseCode.REFUSED,
  ENOTFOUND: HttpErrorResponseCode.NOT_FOUND,
  ETIMEDOUT: HttpErrorResponseCode.TIMEOUT,
  ERR_NETWORK: HttpErrorResponseCode.SERVER_ERROR,
  ERR_BAD_RESPONSE: HttpErrorResponseCode.SERVER_ERROR,
  ERR_CANCELED: HttpErrorResponseCode.ABORTED,
  ERR_SSL: HttpErrorResponseCode.SSL_ERROR,
  ERR_INVALID_URL: HttpErrorResponseCode.BAD_REQUEST,
  ERR_HTTP2: HttpErrorResponseCode.SERVER_ERROR,
  ERR_FR_TOO_MANY_REDIRECTS: HttpErrorResponseCode.TOO_MANY_REQUESTS,
  ERR_DEPRECATED: HttpErrorResponseCode.BAD_REQUEST,
  ERR_BAD_OPTION_VALUE: HttpErrorResponseCode.BAD_REQUEST,
  ERR_NOT_SUPPORT: HttpErrorResponseCode.BAD_REQUEST,
  ERR_INVALID_ARG: HttpErrorResponseCode.BAD_REQUEST,
  ERR_INVALID_RETURN_VALUE: HttpErrorResponseCode.SERVER_ERROR,
  ERR_MISCONFIGURED: HttpErrorResponseCode.SERVER_ERROR,
  ERR_NOT_IMPLEMENTED: HttpErrorResponseCode.SERVER_ERROR,
  UNKNOWN: HttpErrorResponseCode.UNKNOWN,
};

export const HttpStatusToErrorResponseCode: Record<number, HttpErrorResponseCode> = {
  204: HttpErrorResponseCode.NO_CONTENT,
  400: HttpErrorResponseCode.BAD_REQUEST,
  401: HttpErrorResponseCode.UNAUTHORIZED,
  403: HttpErrorResponseCode.FORBIDDEN,
  404: HttpErrorResponseCode.NOT_FOUND,
  409: HttpErrorResponseCode.CONFLICT,
  422: HttpErrorResponseCode.UNPROCESSABLE_ENTITY,
  429: HttpErrorResponseCode.TOO_MANY_REQUESTS,
  500: HttpErrorResponseCode.SERVER_ERROR,
  502: HttpErrorResponseCode.BAD_GATEWAY,
  503: HttpErrorResponseCode.SERVICE_UNAVAILABLE,
  504: HttpErrorResponseCode.GATEWAY_TIMEOUT,
  521: HttpErrorResponseCode.REFUSED,
  522: HttpErrorResponseCode.TIMEOUT,
  525: HttpErrorResponseCode.NETWORK_ERROR,
  530: HttpErrorResponseCode.DNS_ERROR,
  598: HttpErrorResponseCode.ABORTED,
  495: HttpErrorResponseCode.SSL_ERROR,
  520: HttpErrorResponseCode.UNKNOWN,
};

export const getAxiosResponseErrorCode = (error: AxiosError): HttpErrorResponseCode => {
  // axios will only return an error status if the server respondes with one
  // it will not guess the error status and will return undefined if the server does not respond with one
  const status = error.response?.status;
  if (status && HttpStatusToErrorResponseCode[status]) return HttpStatusToErrorResponseCode[status];
  // if there is no status, we can try to map the axios error code to our error codes
  if (error.code && AxiosErrorCodeToHttpErrorResponseCode[error.code])
    return AxiosErrorCodeToHttpErrorResponseCode[error.code];
  // if we still cannot determine the error code, return unknown error
  return HttpErrorResponseCode.UNKNOWN;
};

export class HttpClientError extends BaseError {
  constructor(
    public code: HttpErrorResponseCode,
    public context: Record<string, unknown>,
    public original: AxiosError,
  ) {
    super(code, HttpClientErrorMessage[code], context, original);
  }
}
