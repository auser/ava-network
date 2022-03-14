#!/usr/bin/env ts-node
import yargs, { Arguments } from "yargs";
import fs from "fs";
import path from "path";
const { version } = require("../package.json");

yargs
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
    apiUrl: {
      alias: "h",
      normalize: true,
      description: `API url`,
    },
    namespace: {
      alias: "n",
      description: `Namespace`,
      default: "ava",
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
      default:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDIxMDI2NjYsImp0aSI6ImtlSzM3aW5SaW5VRldFTG03V3gxeHhRLTQwdz0iLCJlbmRwb2ludHMiOlsiKiJdfQ.dYwxkpGkypG7BPQfCQcMgg-3cGWu3OXzdd8qV8VUu0E",
    },
  })
  .commandDir("./cmd")
  .usage("Usage: <cmd> [args]")
  .showHelpOnFail(true)
  .wrap(Math.min(yargs.terminalWidth(), 160))
  .help("help")
  .alias("help", "h")
  .version(version)
  .alias("version", "v")
  .hide("help")
  .hide("version")
  .demandCommand()
  .help().argv;
