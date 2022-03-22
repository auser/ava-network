import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "sendTransaction [args]";

export const desc = "Send a transaction";

export const builder = (yargs: Argv) =>
  yargs.options({
    from: {
      description: "From address",
      required: true,
      type: "string",
    },
    to: {
      description: "to address",
      type: "string",
    },
    changeAddr: {
      description: "to address",
      type: "string",
    },
    gas: {
      description: "Gas to provided for the transaction execution",
      type: "string",
      default: "0x76c0",
    },
    gasPrice: {
      description: "Integer for the gasPrice used",
      type: "string",
      default: "0x9184e72a000",
    },
    value: {
      description: "Value to send with the transaction",
      type: "string",
    },
    data: {
      description: "Data to send with transaction",
      type: "string",
    },
    nonce: {
      description: "Integer of a nonce",
      type: "string",
    },
  });

export async function handler(args: any) {
  const resp = await req("/ext/bc/C/rpc", "eth_sendTransaction", args, [
    "changeAddr",
    "nonce",
    "data",
    "value",
    "gasPrice",
    "gas",
    "to",
    "from",
  ]);

  const color = chalk.white;
  console.log(resp);
}
