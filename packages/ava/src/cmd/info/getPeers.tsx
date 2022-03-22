import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "getPeers [args]";

export const desc = "Get peers";

export const builder = (yargs: Argv) => yargs.options({});

export async function handler(args: any) {
  const requestOptions = {};
  const data = await req("/ext/info", "info.peers", args);

  if (data.peers) {
    const color = chalk.white;
    const peers = data.peers;
    console.log(`Current peers (${peers.length})`);
    if (peers.length > 0) {
      peers.forEach((p: any) => console.log(p));
    }
  } else {
    console.log(data);
  }
}
