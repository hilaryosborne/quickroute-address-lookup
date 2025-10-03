import { SearchByPartialAddressParams } from "../address.lookup";
import QuickRouteCacheI from "./cache.interface";

const cache = new Map<string, any>();

class QuickRouteCacheMemory implements QuickRouteCacheI {
  public async getByPartialAddress(params: SearchByPartialAddressParams): Promise<any[] | null> {
    const key = this.generateKey(params);
    return cache.has(key) ? cache.get(key) : null;
  }

  public async setForPartialAddress(params: SearchByPartialAddressParams, results: any[]): Promise<void> {
    const key = this.generateKey(params);
    cache.set(key, results);
  }

  protected generateKey(params: any): string {
    return params.query.toLowerCase().trim();
  }
}

export default QuickRouteCacheMemory;
