import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "getBalance [args]";

export const desc = "Get the balance of an address";

export const builder = (yargs: Argv) =>
  yargs.options({
    address: {
      alias: "a",
      description: "Address to get balance",
      required: true,
      type: "string",
    },
    assetID: {
      description: "Asset ID",
      default: "AVAX",
    },
  });

export async function handler(args: any) {
  const data = await req("/ext/bc/X", "avm.getBalance", args, [
    "address",
    "assetID",
  ]);

  if (data.balance) {
    const color = chalk.white;
    console.log(`Balance: ${data.balance}`);
    printTable(data.utxoIDs);
  }
}
