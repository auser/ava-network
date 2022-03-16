import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";

export const command = "createAddress [args]";

export const desc = "Create address";

export const builder = (yargs: Argv) =>
  yargs.options({
    username: {
      alias: "u",
      description: "Username for the key",
      required: true,
    },
    password: {
      alias: "p",
      description: "Password for the key",
      required: true,
    },
  });

export async function handler(args: any) {
  const username = args.username;
  const password = args.password;

  const opts = { username, password };
  const data = await req(
    "/ext/P",
    "platform.createAddress",
    opts,
    args.requestOptions
  );
  if (data.address) {
    console.log(`Address:\n${chalk.blue(data.address)}`);
  } else {
    console.log(`Error occured`, data);
  }
}
