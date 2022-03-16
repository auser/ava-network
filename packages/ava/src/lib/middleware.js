"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRequestOptions = void 0;
var normalizeRequestOptions = function (argv) {
    var requestOptions = {
        host: argv.host || "localhost",
        port: argv.port || 9650,
        protocol: argv.protocol || "http",
        token: argv.token || process.env.AVA_TOKEN || "",
        namespace: argv.namespace || "X",
        networkId: argv.networkId || 4200,
        debug: argv.debug || false,
    };
    return { requestOptions: requestOptions };
};
exports.normalizeRequestOptions = normalizeRequestOptions;
