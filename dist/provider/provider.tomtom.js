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
const tomtom_search_success_1 = __importDefault(require("./__stubs__/tomtom.search.success"));
const location_tomtom_model_1 = __importDefault(require("../models/location.tomtom.model"));
class QuickRouteProviderTomTom {
    constructor(options) { }
    searchByPartialAddress(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = tomtom_search_success_1.default;
            const results = response.results.map((result) => {
                var _a, _b, _c;
                const mapped = {
                    provider: ((_a = params.expands) === null || _a === void 0 ? void 0 : _a.indexOf("provider")) !== -1 ? this.expandProvider(result) : undefined,
                    address: ((_b = params.expands) === null || _b === void 0 ? void 0 : _b.indexOf("address")) !== -1 ? this.expandAddress(result) : undefined,
                    geo: ((_c = params.expands) === null || _c === void 0 ? void 0 : _c.indexOf("geo")) !== -1 ? this.expandGeo(result) : undefined,
                };
                return location_tomtom_model_1.default.parse(mapped);
            });
            // we could trust the order from the provider, but let's be sure
            // assumption: higher score is better so lets show those first
            const ordered = results.sort((a, b) => { var _a, _b; return (((_a = b.provider) === null || _a === void 0 ? void 0 : _a.score) || 0) - (((_b = a.provider) === null || _b === void 0 ? void 0 : _b.score) || 0); });
            return ordered;
        });
    }
    expandAddress(location) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return {
            display: (_a = location.address) === null || _a === void 0 ? void 0 : _a.freeformAddress,
            street: {
                number: (_b = location.address) === null || _b === void 0 ? void 0 : _b.streetNumber,
                name: (_c = location.address) === null || _c === void 0 ? void 0 : _c.streetName,
                // not sure about this one
                type: location.type,
            },
            suburb: (_d = location.address) === null || _d === void 0 ? void 0 : _d.municipalitySubdivision,
            city: (_e = location.address) === null || _e === void 0 ? void 0 : _e.municipality,
            state: {
                name: (_f = location.address) === null || _f === void 0 ? void 0 : _f.countrySubdivisionName,
                code: (_g = location.address) === null || _g === void 0 ? void 0 : _g.countrySubdivisionCode,
            },
            postcode: (_h = location.address) === null || _h === void 0 ? void 0 : _h.postalCode,
            country: {
                name: (_j = location.address) === null || _j === void 0 ? void 0 : _j.country,
                code: (_k = location.address) === null || _k === void 0 ? void 0 : _k.countryCode,
            },
        };
    }
    expandGeo(location) {
        var _a, _b;
        return {
            lat: (_a = location.position) === null || _a === void 0 ? void 0 : _a.lat,
            lng: (_b = location.position) === null || _b === void 0 ? void 0 : _b.lon,
        };
    }
    expandProvider(location) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return {
            type: "TomTom",
            id: location.id,
            score: location.score,
            viewport: location.viewport
                ? {
                    topLeftPoint: {
                        lat: (_b = (_a = location.viewport) === null || _a === void 0 ? void 0 : _a.topLeftPoint) === null || _b === void 0 ? void 0 : _b.lat,
                        lng: (_d = (_c = location.viewport) === null || _c === void 0 ? void 0 : _c.topLeftPoint) === null || _d === void 0 ? void 0 : _d.lon,
                    },
                    btmRightPoint: {
                        lat: (_f = (_e = location.viewport) === null || _e === void 0 ? void 0 : _e.btmRightPoint) === null || _f === void 0 ? void 0 : _f.lat,
                        lng: (_h = (_g = location.viewport) === null || _g === void 0 ? void 0 : _g.btmRightPoint) === null || _h === void 0 ? void 0 : _h.lon,
                    },
                }
                : undefined,
        };
    }
}
exports.default = QuickRouteProviderTomTom;
//# sourceMappingURL=provider.tomtom.js.map