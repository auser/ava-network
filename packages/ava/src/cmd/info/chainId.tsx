import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "chainId [args]";

export const desc = "Get C-chain id";

export const builder = (yargs: Argv) => yargs.options({});

export async function handler(args: any) {
  const data = await req("/ext/bc/C/rpc", "eth_chainId", args);

  const color = chalk.white;

  console.log(`Chain ID: (${data})`);
}
