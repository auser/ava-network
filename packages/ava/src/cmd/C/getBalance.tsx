import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";

export const command = "getBalance [args]";

export const desc = "Get the balance of an address";

export const builder = (yargs: Argv) =>
  yargs.options({
    address: {
      alias: "a",
      description: "Address to get balance",
      required: true,
    },
  });

export async function handler(args: any) {
  const { address } = args;
  const requestOptions = [`0x${address.toString(16)}`, "latest"];
  const data = await req(
    "/ext/bc/C/rpc",
    "eth_getBalance",
    requestOptions,
    args.requestOptions
  );

  if (data) {
    const color = chalk.white;
    console.log(`Balance: ${data}`);
  }
}
