import { Argv } from "yargs";

export const command = "user <cmd> [args]";

export const desc = "user commands";

export const builder = (yargs: Argv) =>
  yargs
    .commandDir("./user")
    .usage("Usage: user <cmd> [args")
    .help("help")
    .alias("help", "h")
    .showHelpOnFail(true)
    .demandCommand()
    .help();

export async function handler(args: any) {}
