#!/usr/bin/env ts-node

import path from "path";
import fs from "fs/promises";
import selfsigned from "selfsigned";

const rootDir = path.join("..");
const defaultConfig = {
  algorithm: "sha256",
  commonName: "ethtrust",
  countryName: "US",
  localityName: "WY",
  stateOrProvinceName: "WY",
  organizationName: "ethtrust.co",
  organizationalUnitName: "T",
  emailAddress: "us@ethtrust.co",
};

const args = require("yargs")
  .env("AVA")
  .options({
    name: {
      help: `filename`,
      default: "staking",
    },
    days: {
      help: `Number of days cert is valid`,
      default: 3650,
    },
    algorithm: {
      help: `Algorithm to use`,
      default: `sha256`,
    },
    keySize: {
      help: `Keysize to use in generating the key`,
      default: 2048,
    },
    pkcs7: {
      help: `include pks7 in output`,
      default: false,
    },
    clientCertificate: {
      help: `generate a client cert`,
      alias: "cert",
      default: false,
    },
    config: {
      help: `JSON configuration of overrides`,
      alias: `c`,
      default: JSON.stringify(defaultConfig),
    },
    outDir: {
      default: path.join(
        rootDir,
        "packages",
        "avacontainer",
        "ava-node",
        "certs"
      ),
      help: `Directory to save certs`,
    },
  })
  .help(`Generate self-signed certificates`)
  .alias("help", "h").argv;

const argumentConfig = args.config || {};
const config = { ...defaultConfig, ...argumentConfig };

const {
  commonName,
  countryName,
  localityName,
  stateOrProvinceName,
  organizationName,
  organizationalUnitName,
} = config;
const attrs = {
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

const outDir = path.relative(rootDir, args.outDir);
const { days, algorithm, keySize, pkcs7, clientCertificate } = args;
const opts = {
  clientCertificate,
  days,
  algorithm,
  keySize,
  pkcs7,
};

const pems = selfsigned.generate(attrs, opts, async function (err, pems) {
  if (err) {
    console.log(`An error occurred generating certs`, err);
    throw new Error(`Unable to generate certs`);
  }

  await fs.writeFile(path.join(outDir, `${args.name}.crt`), pems.cert);
  await fs.writeFile(path.join(outDir, `${args.name}.key`), pems.private);
});
