import { Argv } from "yargs";
import chalk from "chalk";
import * as password from "secure-random-password";
import { req } from "../../lib/req";

export const command = "create [args]";

export const desc = "Create a new user";

export const builder = (yargs: Argv) =>
  yargs.options({
    username: {
      alias: "u",
      description: "Username for the key",
      required: true,
      help: "Username for the key",
    },
    password: {
      alias: "p",
      description: "Password for the key",
      default: generatePassword(),
    },
    g: {
      alias: "generate",
      description: "generate a password for the user",
    },
  });

const generatePassword = () => {
  return password.randomPassword({
    length: 12,
    characters: [
      password.lower,
      password.upper,
      password.digits,
      password.symbols,
    ],
  });
};

export async function handler(args: any) {
  const data = await req(`/ext/keystore`, "keystore.createUser", args, [
    "username",
    "password",
  ]);
  if (data.success) {
    console.log(`Users ${args.username} successfully added`);
    console.log(`Password is: ${chalk.blue(args.password)}`);
  } else {
    console.log(data);

    console.log(`There was an error`);
  }
}
