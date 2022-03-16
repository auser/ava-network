"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var helpers_1 = require("yargs/helpers");
var constants_1 = require("./lib/constants");
var middleware_1 = require("./lib/middleware");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .completion("completion")
    .parserConfiguration({
    "short-option-groups": true,
    "camel-case-expansion": false,
    "dot-notation": true,
    "parse-numbers": true,
    "parse-positional-numbers": true,
    "boolean-negation": true,
    "strip-aliased": true,
    "strip-dashed": false,
})
    .options({
    alias: {
        alias: "n",
        description: "Alias",
        default: "",
    },
    networkId: {
        alias: "i",
        description: "Network id",
        default: 4200,
    },
    host: {
        description: "Host of avalanche",
        default: "localhost",
    },
    port: {
        description: "Port of avalanche",
        default: 9650,
    },
    protocol: {
        description: "Protocol of avalanche",
        default: "http",
    },
    token: {
        description: "AUTH token",
        default: "",
    },
    debug: {
        description: "Verbose output",
        type: "boolean",
        count: true,
        default: false,
    },
})
    .commandDir("./cmd")
    .env("AVA")
    .usage("Usage: <cmd> [args]")
    .showHelpOnFail(true)
    .wrap(Math.min(yargs_1.default.terminalWidth(), 160))
    .help("help")
    .alias("help", "h")
    .version(constants_1.VERSION)
    .alias("version", "v")
    .hide("help")
    .hide("version")
    .middleware(middleware_1.normalizeRequestOptions)
    .demandCommand()
    .help().argv;
//# sourceMappingURL=cli.js.map