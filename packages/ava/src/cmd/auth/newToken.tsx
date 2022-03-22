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
    endpoints: {
      alias: "e",
      array: true,
      default: "*",
    },
    quiet: {
      alias: "q",
      default: false,
      type: "boolean",
    },
  });

export async function handler(args: any) {
  const data = await req("/ext/auth", "auth.newToken", args, [
    "password",
    "endpoints",
  ]);

  if (data.token) {
    if (args.quiet) {
      console.log(data.token);
    } else {
      console.log(`New token:\n${data.token}\n`);
    }
  } else {
    console.log("DATA: ", data);
    console.log(`There was an error`);
  }
}
