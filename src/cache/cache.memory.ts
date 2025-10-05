import { SearchByPartialAddressParams } from "../address.lookup";
import { LocationModelType } from "../models/location.model";
import QuickRouteCacheBase, { QuickRouteCacheBaseOptions } from "./cache.base";
import QuickRouteCacheI from "./cache.interface";

type QuickRouteCacheMemoryConfig = {
  maxSize: number;
  batchSize: number;
};

type QuickRouteCacheMemoryOptions = QuickRouteCacheBaseOptions & {
  maxSize?: number;
  batchSize?: number;
};

type CacheEntry = {
  key: string;
  provider: string;
  results: any[];
  timestamp: number;
};

class QuickRouteCacheMemory extends QuickRouteCacheBase implements QuickRouteCacheI {
  protected config: QuickRouteCacheMemoryConfig;
  protected static cache: Map<string, CacheEntry> = new Map();

  constructor(options?: QuickRouteCacheMemoryOptions) {
    super(options);
    this.config = { maxSize: options?.maxSize || 1000, batchSize: options?.batchSize || 0.1 };
  }

  public async getByPartialAddress<L extends LocationModelType>(
    provider: string,
    params: SearchByPartialAddressParams & { expands: ("address" | "geo" | "provider")[] },
  ): Promise<L[] | null> {
    const cache = QuickRouteCacheMemory.cache;
    const key = this.generatePartialAddressKey(provider, params);
    const cached = cache.has(key) ? cache.get(key) : null;
    if (cached) {
      cached.timestamp = Date.now();
      return cached.results;
    } else return null;
  }

  public async setForPartialAddress<L extends LocationModelType>(
    provider: string,
    params: SearchByPartialAddressParams & { expands: ("address" | "geo" | "provider")[] },
    results: L[],
  ): Promise<void> {
    const cache = QuickRouteCacheMemory.cache;
    if (cache.size >= this.config.maxSize) this.cleanCacheByBatch();
    const key = this.generatePartialAddressKey(provider, params);
    cache.set(key, { key, provider, results, timestamp: Date.now() });
  }

  protected cleanCacheByBatch() {
    const cache = QuickRouteCacheMemory.cache;
    const deleteCount = Math.ceil(this.config.maxSize * this.config.batchSize);
    const sortedByTimestamp = Array.from(cache.values()).sort((a, b) => a.timestamp - b.timestamp);
    for (let i = 0; i <= deleteCount && i < sortedByTimestamp.length; i++) {
      cache.delete(sortedByTimestamp[i].key);
    }
  }
}

export default QuickRouteCacheMemory;
