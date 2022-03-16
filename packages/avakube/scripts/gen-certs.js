#!/usr/bin/env ts-node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var promises_1 = __importDefault(require("fs/promises"));
var selfsigned_1 = __importDefault(require("selfsigned"));
var rootDir = path_1.default.join("..");
var defaultConfig = {
    algorithm: "sha256",
    commonName: "ethtrust",
    countryName: "US",
    localityName: "WY",
    stateOrProvinceName: "WY",
    organizationName: "ethtrust.co",
    organizationalUnitName: "T",
    emailAddress: "us@ethtrust.co",
};
var args = require("yargs")
    .env("AVA")
    .options({
    name: {
        help: "filename",
        default: "staking",
    },
    days: {
        help: "Number of days cert is valid",
        default: 3650,
    },
    algorithm: {
        help: "Algorithm to use",
        default: "sha256",
    },
    keySize: {
        help: "Keysize to use in generating the key",
        default: 2048,
    },
    pkcs7: {
        help: "include pks7 in output",
        default: false,
    },
    clientCertificate: {
        help: "generate a client cert",
        alias: "cert",
        default: false,
    },
    config: {
        help: "JSON configuration of overrides",
        alias: "c",
        default: JSON.stringify(defaultConfig),
    },
    outDir: {
        default: path_1.default.join(rootDir, "docker", "node"),
        help: "Directory to save certs",
    },
})
    .help("Generate self-signed certificates")
    .alias("help", "h").argv;
var argumentConfig = args.config || {};
var config = __assign(__assign({}, defaultConfig), argumentConfig);
var commonName = config.commonName, countryName = config.countryName, localityName = config.localityName, stateOrProvinceName = config.stateOrProvinceName, organizationName = config.organizationName, organizationalUnitName = config.organizationalUnitName;
var attrs = {
    CN: commonName,
    C: countryName,
    L: localityName,
    ST: stateOrProvinceName,
    O: organizationName,
    OU: organizationalUnitName,
};
// const subj = attrs
//   .reduce((acc: string[], { name, value }: { name: string; value: string }) => {
//     acc.push(`/${name}=${value}`);
//     return acc;
//   }, [])
//   .join("");
var outDir = path_1.default.relative(rootDir, args.outDir);
var days = args.days, algorithm = args.algorithm, keySize = args.keySize, pkcs7 = args.pkcs7, clientCertificate = args.clientCertificate;
var opts = {
    clientCertificate: clientCertificate,
    days: days,
    algorithm: algorithm,
    keySize: keySize,
    pkcs7: pkcs7,
};
var pems = selfsigned_1.default.generate(attrs, opts, function (err, pems) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err) {
                        console.log("An error occurred generating certs", err);
                        throw new Error("Unable to generate certs");
                    }
                    return [4 /*yield*/, promises_1.default.writeFile(path_1.default.join(outDir, "".concat(args.name, ".crt")), pems.cert)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, promises_1.default.writeFile(path_1.default.join(outDir, "".concat(args.name, ".key")), pems.private)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
//# sourceMappingURL=gen-certs.js.map