"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const location_model_1 = __importDefault(require("./location.model"));
const LocationTomTomModel = location_model_1.default.extend({
    provider: zod_1.default
        .object({
        type: zod_1.default.literal("TomTom"),
        id: zod_1.default.string().optional(),
        score: zod_1.default.number().optional(),
        viewport: zod_1.default
            .object({
            topLeftPoint: zod_1.default.object({
                lat: zod_1.default.number().optional(),
                lng: zod_1.default.number().optional(),
            }),
            btmRightPoint: zod_1.default.object({
                lat: zod_1.default.number().optional(),
                lng: zod_1.default.number().optional(),
            }),
        })
            .optional(),
    })
        .optional(),
});
exports.default = LocationTomTomModel;
//# sourceMappingURL=location.tomtom.model.js.map