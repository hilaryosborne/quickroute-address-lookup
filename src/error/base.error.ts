class BaseError extends Error {
  constructor(
    public code: string,
    message?: string,
    public context?: Record<string, unknown>,
    public originalError?: unknown,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseError;
