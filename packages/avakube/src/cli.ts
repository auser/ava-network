import fs from "fs-extra";
import path from "path";
import yaml from "js-yaml";
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
    outputDir: {
      alias: "o",
      description: "output directory",
      type: "string",
      default: path.join(process.cwd(), "generated"),
    },
  })
  .help()
  .alias("help", "h").argv;

export const cli = async () => {
  const inputFile = (argv as any)._[0];
  const inputFileObj = require(path.join(__dirname, "..", inputFile));
  const { outputDir } = argv as any;

  const fn = inputFileObj.default;

  const manifests = await fn();

  manifests.forEach(async (manifest) => {
    try {
      const { file, value } = manifest;
      const filepath = path.join(outputDir, file);
      await fs.ensureFile(filepath);
      const contents = Buffer.from(yaml.dump(value));

      await fs.writeFile(filepath, contents);
    } catch (e) {
      console.log(`Error`, e);
    }
  });
};

(async () => await cli())();
