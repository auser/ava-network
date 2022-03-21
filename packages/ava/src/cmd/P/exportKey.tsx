import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "exportKey [args]";

export const desc = "Export the private key";

export const builder = (yargs: Argv) =>
  yargs.options({
    address: {
      alias: "a",
      description: "Address to get balance",
      required: true,
      type: "string",
    },
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
  const { username, password, address } = args;
  const requestOptions = {
    address,
    username,
    password,
  };
  const data = await req(
    "/ext/P",
    "platform.exportKey",
    requestOptions,
    args.requestOptions
  );

  if (data.privateKey) {
    const color = chalk.white;
    console.log(`Private Key: ${data.privateKey}`);
  } else {
    console.log(data);
  }
}
