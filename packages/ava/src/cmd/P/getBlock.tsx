import { Argv } from "yargs";
import { req } from "../../lib/req";

export const command = "getBlock [args]";

export const desc = "Get a block";

export const builder = (yargs: Argv) =>
  yargs.options({
    blockID: {
      alias: "b",
      description: "Block ID",
      required: true,
    },
    encoding: {
      alias: "e",
      help: `Encoding`,
      choices: ["cb58", "hex", "json"],
    },
  });

export async function handler(args: any) {
  const data = await req("/ext/P", "platform.getBlock", args, [
    "blockID",
    "encoding",
  ]);
  console.log("resp ->", data);
}
