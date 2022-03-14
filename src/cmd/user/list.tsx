import { Argv } from "yargs";
import { req } from "../../lib/req";

export const command = "list [args]";

export const desc = "List the users";

export const builder = (yargs: Argv) =>
  yargs.options({
    password: {
      alias: "p",
      description: "node authorization token password",
      required: true,
    },
  });

export async function handler(args: any) {
  const resp = await req(`/ext/keystore`, args);
  console.log("resp ->", resp);
}
