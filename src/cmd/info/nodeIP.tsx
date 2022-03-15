import { Argv } from "yargs";
import { req } from "../../lib/req";

export const command = "blockchainID [args]";

export const desc = "Get the blockchain id";

export const builder = (yargs: Argv) => yargs.options({});

export async function handler(args: any) {
  const data = await req(
    "/ext/info",
    "info.getBlockchainID",
    {
      password: args.password,
      endpoints: args.endpoints,
    },
    { ...args.requestOptions }
  );
  console.log("resp ->", data);
}
