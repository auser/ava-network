import { Argv } from "yargs";
import web3 from "web3";
import { req } from "../../lib/req";

export const command = "unlockAccount [args]";

export const desc = "Unlock an account";

export const builder = (yargs: Argv) =>
  yargs.options({
    account: {
      description: "Account to unlock",
      required: true,
      alias: "a",
      type: "string",
    },
    passphrase: {
      description: "Passphrase for account",
      required: true,
      alias: "p",
    },
    duration: {
      description: "Unlock duration",
      default: 60 * 60 * 24, // one day
    },
  });

export async function handler(args: any) {
  const requestParams = [args.account, args.passphrase, args.duration];

  const data = await req("/ext/bc/C/rpc", "personal_unlockAccount", {
    ...args,
    requestParams,
  });

  console.log(data);

  if (data.address) {
    console.log(`Address: ${data.address}`);
  }
}
