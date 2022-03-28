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
      type: "string",
    },
    username: {
      description: "The user that pays the transaction fee",
      type: "string",
      alias: "u",
      // required: true,
    },
    password: {
      description: "The username's password",
      type: "string",
      alias: "p",
      // required: true,
    },
    raw: {
      alias: "r",
      description: "import raw key to eth account",
      type: "boolean",
      default: false,
    },
  });

export async function handler(args: any) {
  let method = "avax.importKey";
  let route = "/ext/bc/C/avax";
  let data: any = {};
  if (args.raw) {
    method = "personal_importRawKey";
    route = "/ext/bc/C/rpc";
    const requestParams = [args.privateKey, args.password];
    data = await req(route, method, { ...args, requestParams });
  } else {
    data = await req(route, method, args, [
      "privateKey",
      "username",
      "password",
    ]);
  }

  if (data.address) {
    console.log(data.address);
  }
}
