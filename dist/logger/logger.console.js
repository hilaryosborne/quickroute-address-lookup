"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuickRouteLoggerConsole {
    constructor(options) {
        this.options = options;
    }
    log(message) {
        console.log(message);
    }
    error(message) {
        console.error(message);
    }
    warn(message) {
        console.warn(message);
    }
    info(message) {
        console.info(message);
    }
    debug(message) {
        console.debug(message);
    }
}
exports.default = QuickRouteLoggerConsole;
//# sourceMappingURL=logger.console.js.map