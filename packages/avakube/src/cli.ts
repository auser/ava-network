import fs from "fs/promises";
import path from "path";
import yaml from "yaml";
import yargs from "yargs";

const argv = yargs
  .command("generate <inputFile>", "generate kubernetes yaml")
  // .positional("inputFile", {
  //   describe: "filepath",
  //   type: "string",
  //   required: true,
  // })
  .options({
    verbose: {
      alias: "v",
      description: "run with verbosity",
      default: false,
    },
    output: {
      alias: "o",
      description: "output directory",
      default: "./generated",
    },
  })
  .help()
  .alias("help", "h").argv;

export const cli = async () => {
  const inputFile = (argv as any)._[0];
  const inputFileObj = require(path.join(__dirname, "..", inputFile));

  const fn = inputFileObj.default;

  const manifests = await fn();
  console.log("manifests", manifests);
};

(async () => await cli())();
