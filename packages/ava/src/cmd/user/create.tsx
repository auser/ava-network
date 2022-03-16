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
  const username = args.username;
  const password = args.password || generatePassword();

  const opts = { username, password };
  const data = await req(
    `/ext/keystore`,
    "keystore.createUser",
    opts,
    args.requestOptions
  );
  if (data.success) {
    console.log(`Users ${username} successfully added`);
    if (!args.password) {
      console.log(
        `Password generated on your behalf is: ${chalk.blue(password)}`
      );
    }
  } else {
    console.log(data);

    console.log(`There was an error`);
  }
}
