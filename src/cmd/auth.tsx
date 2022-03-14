import { Argv } from "yargs";

export const command = "auth <cmd> [args]";

export const desc = "auth commands";

export const builder = (yargs: Argv) =>
  yargs
    .commandDir("./auth")
    .usage("Usage: auth <cmd> [args")
    .help("help")
    .alias("help", "h")
    .showHelpOnFail(true)
    .demandCommand()
    .help();

export async function handler(args: any) {
  console.log("Called auth");
}
