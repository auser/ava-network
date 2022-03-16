import { Argv } from "yargs";
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
  const { chain } = args;
  const data = await req(
    "/ext/info",
    "info.isBootstrapped",
    {
      chain,
    },
    args.requestOptions
  );

  if (data.isBootstrapped === true || data.isBootstrapped === false) {
    console.log(`Bootstrapped status: ${data.isBootstrapped}`);
  }
}
