class BaseError {
  constructor(
    public code: string,
    public data: Record<string, unknown>,
    public original: unknown,
  ) {}
}

export default BaseError;
