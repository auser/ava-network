import { Argv } from "yargs";
import { req } from "../../lib/req";

export const command = "id [args]";

export const desc = "Get the blockchain id";

export const builder = (yargs: Argv) =>
  yargs.options({
    alias: {
      description: "Alias to use",
      required: true,
      default: "C",
      type: "string",
    },
  });

export async function handler(args: any) {
  const data = await req("/ext/info", "info.getBlockchainID", args, ["alias"]);

  if (data.blockchainID) {
    console.log("Blockchain ID: ", data.blockchainID);
  }
}
