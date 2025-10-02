"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importStar(require("zod"));
// This is the universal location model used for all providers
// each provider will have it's own eccentricities and will be mapped to this model
// the goal is to provide a consistent model while allowing for provider specific data to be included
const LocationModel = (0, zod_1.object)({
    address: (0, zod_1.object)({
        display: zod_1.default.string().optional(),
        street: (0, zod_1.object)({
            number: zod_1.default.string().optional(),
            name: zod_1.default.string().optional(),
            type: zod_1.default.string().optional(),
        }).optional(),
        suburb: zod_1.default.string().optional(),
        city: zod_1.default.string().optional(),
        state: (0, zod_1.object)({
            name: zod_1.default.string().optional(),
            code: zod_1.default.string().optional(),
        }).optional(),
        postcode: zod_1.default.string().optional(),
        country: (0, zod_1.object)({
            name: zod_1.default.string().optional(),
            code: zod_1.default.string().optional(),
        }).optional(),
    }).optional(),
    geo: (0, zod_1.object)({
        lat: zod_1.default.number().optional(),
        lng: zod_1.default.number().optional(),
    }).optional(),
    // provider specific data can be added here
    // this allows for consumers to access the raw provider data if needed
    // this also helps if we onboard a new provider and the consumers are willing to work with the raw data
    // here be dragons though, use with caution
    provider: zod_1.default.unknown().optional(),
});
exports.default = LocationModel;
//# sourceMappingURL=location.model.js.map