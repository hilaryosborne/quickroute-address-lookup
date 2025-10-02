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
Object.defineProperty(exports, "__esModule", { value: true });
const cache = new Map();
class QuickRouteCacheMemory {
    getByPartialAddress(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.generateKey(params);
            return cache.has(key) ? cache.get(key) : null;
        });
    }
    setForPartialAddress(params, results) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.generateKey(params);
            cache.set(key, results);
        });
    }
    generateKey(params) {
        return params.query.toLowerCase().trim();
    }
}
exports.default = QuickRouteCacheMemory;
//# sourceMappingURL=cache.memory.js.map