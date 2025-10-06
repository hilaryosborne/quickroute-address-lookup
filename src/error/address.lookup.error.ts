class AddressLookupError extends Error {
  constructor(
    code: string,
    public trace?: unknown,
  ) {
    super(code);
    this.message = code;
  }
}

export default AddressLookupError;
