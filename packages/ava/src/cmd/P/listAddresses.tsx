import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "listAddresses [args]";

export const desc = "List addresses controlled by the given user";

export const builder = (yargs: Argv) =>
  yargs.options({
    username: {
      description: "Username",
      type: "string",
      alias: "u",
      required: true,
    },
    password: {
      description: "Password",
      type: "string",
      alias: "p",
      required: true,
    },
  });

export async function handler(args: any) {
  const { username, password } = args;
  const requestOptions = {
    username,
    password,
  };
  const data = await req("/ext/P", "platform.listAddresses", args, [
    "username",
    "password",
  ]);

  if (data.addresses) {
    console.log(`Addresses:`);
    data.addresses.forEach((a: string) => console.log(`  ${a}`));
  }
}
