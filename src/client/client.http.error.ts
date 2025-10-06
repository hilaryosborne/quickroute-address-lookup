import { AxiosError } from "axios";
import { HttpResponseEvents } from "./client.http.const";
import AddressLookupError from "../error/address.lookup.error";

class ClientHttpError extends AddressLookupError {
  constructor(
    message: HttpResponseEvents,
    public trace?: AxiosError,
  ) {
    super(message, trace);
  }
}

export default ClientHttpError;
