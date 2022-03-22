import { Argv } from "yargs";
import { req } from "../../lib/req";

export const command = "getBlockchains [args]";

export const desc = "Get blockchains";

export const builder = (yargs: Argv) => yargs.options({});

export async function handler(args: any) {
  const data = await req("/ext/P", "platform.getBlockchains", args);

  if (data.blockchains) {
    console.log(`Blockchains`);
    console.log(data.blockchains);
  }
}
