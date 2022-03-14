import { Argv } from "yargs";
import { req } from "../../lib/req";
export const command = "newToken [args]";

export const desc = "Get a new token";

export const builder = (yargs: Argv) =>
  yargs.options({
    password: {
      alias: "p",
      description: "node authorization token password",
      required: true,
    },
  });

export async function handler(args: any) {
  const resp = await req("/ext/auth", "auth.newToken");
  console.log("resp ->", resp);
}
