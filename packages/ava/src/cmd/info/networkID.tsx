import { Argv } from "yargs";
import { req } from "../../lib/req";

export const command = "networkID [args]";

export const desc = "Get the network id";

export const builder = (yargs: Argv) => yargs.options({});

export async function handler(args: any) {
  const data = await req("/ext/info", "info.getNetworkID", args, [
    "password",
    "endpoints",
  ]);

  if (data.networkID) {
    console.log(`Network ID: ${data.networkID}`);
  }
}
