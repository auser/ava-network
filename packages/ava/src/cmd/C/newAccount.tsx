import { Argv } from "yargs";
import { req } from "../../lib/req";

export const command = "newAccount [args]";

export const desc = "Create a new account";

export const builder = (yargs: Argv) =>
  yargs.options({
    passphrase: {
      description: "Passphrase for account",
      required: true,
      alias: "p",
    },
  });

export async function handler(args: any) {
  const requestParams = [args.passphrase];
  const data = await req("/ext/bc/C/rpc", "personal_newAccount", {
    ...args,
    requestParams,
  });

  console.log(data);

  if (data.address) {
    console.log(`Address: ${data.address}`);
  }
}
