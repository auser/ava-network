import { Argv } from "yargs";
import { req } from "../../lib/req";

export const command = "importKey [args]";

export const desc = "Import private key";

export const builder = (yargs: Argv) =>
  yargs.options({
    privateKey: {
      alias: "k",
      description: "Private key to import",
      default: "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN", // prefunded X-chain private key
    },
    username: {
      description: "The user that pays the transaction fee",
      type: "string",
      alias: "u",
      required: true,
    },
    password: {
      description: "The username's password",
      type: "string",
      alias: "p",
      required: true,
    },
  });

export async function handler(args: any) {
  const data = await req("/ext/bc/X", "avm.importKey", args, [
    "privateKey",
    "username",
    "password",
  ]);

  if (data.address) {
    console.log(`Address: ${data.address}`);
  }
}
