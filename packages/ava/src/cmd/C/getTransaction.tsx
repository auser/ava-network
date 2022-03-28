import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "getTransaction [args]";

export const desc = "Get a transaction by hash";

export const builder = (yargs: Argv) =>
  yargs.options({
    txhash: {
      alias: "t",
      description: "Transaction hash",
      type: "string",
      required: true,
    },
  });

export async function handler(args: any) {
  const requestParams = [args.txhash];
  const resp = await req("/ext/bc/C/rpc", "eth_getTransactionReceipt", {
    ...args,
    requestParams,
  });
  const color = chalk.white;
  console.log(resp);
}
