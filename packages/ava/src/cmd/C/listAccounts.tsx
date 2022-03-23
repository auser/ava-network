import { Argv } from "yargs";
import { req } from "../../lib/req";

export const command = "listAccounts [args]";

export const desc = "List known accounts";

export const builder = (yargs: Argv) => yargs.options({});

export async function handler(args: any) {
  const data = await req("/ext/bc/C/rpc", "personal_listAccounts", args);

  console.log(data);

  if (data.address) {
    console.log(`Address: ${data.address}`);
  }
}
