import yargs, { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
import { VERSION } from "./lib/constants";
import { normalizeRequestOptions } from "./lib/middleware";

yargs(hideBin(process.argv))
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
      description: `Alias`,
      default: "",
    },
    networkId: {
      alias: "i",
      description: `Network id`,
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
  .wrap(Math.min(yargs.terminalWidth(), 160))
  .help("help")
  .alias("help", "h")
  .version(VERSION)
  .alias("version", "v")
  .hide("help")
  .hide("version")
  .middleware(normalizeRequestOptions)
  .demandCommand()
  .help().argv;
