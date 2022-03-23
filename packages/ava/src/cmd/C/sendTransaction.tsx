import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "sendTransaction [args]";

export const desc = "Send a transaction";

export const builder = (yargs: Argv) =>
  yargs.options({
    data: {
      description: "Data to send with transaction",
      type: "string",
      required: true,
    },
  });

export async function handler(args: any) {
  const requestParams = [args.data];
  const resp = await req("/ext/bc/C/rpc", "eth_sendRawTransaction", {
    ...args,
    requestParams,
  });
  console.log(resp);

  const color = chalk.white;
  console.log(resp);
}
