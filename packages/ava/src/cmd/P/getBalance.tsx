import { Argv } from "yargs";
import chalk from "chalk";
import { req } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "getBalance [args]";

export const desc = "Get the balance of an address";

export const builder = (yargs: Argv) =>
  yargs.options({
    address: {
      alias: "a",
      description: "Address to get balance",
      required: true,
    },
  });

export async function handler(args: any) {
  const { address } = args;
  const requestOptions = {
    address,
  };
  const data = await req(
    "/ext/P",
    "platform.getBalance",
    requestOptions,
    args.requestOptions
  );

  if (data.balance) {
    console.log(`Details:`);
    const color = chalk.white;
    console.log(`${color("Balance")}: ${data.balance}`);
    console.log(`${color("Unlocked")}: ${data.unlocked}`);
    console.log(`${color("lockedStakeable")}: ${data.lockedStakeable}`);
    console.log(`${color("lockedNotStakeable")}: ${data.lockedNotStakeable}`);
    printTable(data.utxoIDs);
  }
}
