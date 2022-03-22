import { Argv } from "yargs";
import { req } from "../../lib/req";
export const command = "alias [args]";

export const desc = "Set an alias";

export const builder = (yargs: Argv) =>
  yargs.options({
    alias: {
      alias: "a",
      description: "Alias to assign endpoint",
      required: true,
    },
    endpoint: {
      alias: "e",
      required: true,
    },
  });

export async function handler(args: any) {
  const data = await req("/ext/admin", "admin.alias", args, [
    "alias",
    "endpoint",
  ]);

  if (data.result) {
    console.log(`Result: ${data.result}`);
  } else {
    console.log(`There was an error`);
  }
}
