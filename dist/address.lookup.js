"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_memory_1 = __importDefault(require("./cache/cache.memory"));
const logger_console_1 = __importDefault(require("./logger/logger.console"));
const provider_tomtom_1 = __importDefault(require("./provider/provider.tomtom"));
class QuickRouteAddressLookup {
    constructor(options) {
        this.options = options;
        this.logger = (options === null || options === void 0 ? void 0 : options.logger) || new logger_console_1.default();
        this.cache = (options === null || options === void 0 ? void 0 : options.cache) || new cache_memory_1.default();
        this.provider = (options === null || options === void 0 ? void 0 : options.provider) || new provider_tomtom_1.default({ apiKey: process.env.TOMTOM_API_KEY });
    }
    searchByPartialAddress(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cached = yield this.cache.getByPartialAddress(params);
                if (cached)
                    return cached;
                const results = yield this.provider.searchByPartialAddress(params);
                yield this.cache.setForPartialAddress(params, results);
                return results;
            }
            catch (error) {
                this.logger.error("Error searching by partial address");
                return [];
            }
        });
    }
}
exports.default = QuickRouteAddressLookup;
//# sourceMappingURL=address.lookup.js.map