import { Argv } from "yargs";
import { req } from "../../lib/req";
import * as password from "secure-random-password";

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

  const resp = await req(`/ext/keystore`, "keystore.createUser", {
    username,
    password,
  });
  console.log("resp ->", resp);
}
