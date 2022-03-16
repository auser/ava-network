"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfigFile = void 0;
var std_1 = require("@jkcfg/std");
var readConfigFile = function (filepath) {
    return (0, std_1.read)(filepath, { encoding: std_1.Encoding.String });
};
exports.readConfigFile = readConfigFile;
//# sourceMappingURL=index.js.map