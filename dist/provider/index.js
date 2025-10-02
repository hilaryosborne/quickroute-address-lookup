"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickRouteProviders = exports.QuickRouteProviderTomTom = void 0;
var provider_tomtom_1 = require("./provider.tomtom");
Object.defineProperty(exports, "QuickRouteProviderTomTom", { enumerable: true, get: function () { return __importDefault(provider_tomtom_1).default; } });
var QuickRouteProviders;
(function (QuickRouteProviders) {
    QuickRouteProviders[QuickRouteProviders["TomTom"] = 0] = "TomTom";
})(QuickRouteProviders || (exports.QuickRouteProviders = QuickRouteProviders = {}));
//# sourceMappingURL=index.js.map