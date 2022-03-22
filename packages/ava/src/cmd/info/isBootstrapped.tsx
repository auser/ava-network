import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";

export const command = "isBootstrapped [args]";

export const desc = "Get if the chain is bootstrapped";

export const builder = (yargs: Argv) =>
  yargs.options({
    chain: {
      description: `Chain ID or alias of chain`,
      default: "P",
      alias: "c",
      type: "string",
    },
  });

export async function handler(args: any) {
  const data = await req("/ext/info", "info.isBootstrapped", args, ["chain"]);

  if (data.isBootstrapped === true || data.isBootstrapped === false) {
    const color = data.isBootstrapped ? chalk.blueBright : chalk.redBright;
    console.log(`Bootstrapped status: ${color(data.isBootstrapped)}`);
  }
}
