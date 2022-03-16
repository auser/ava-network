import { Argv } from "yargs";

export const command = "admin <cmd> [args]";

export const desc = "admin commands";

export const builder = (yargs: Argv) =>
  yargs
    .commandDir("./admin")
    .usage("Usage: admin <cmd> [args")
    .help("help")
    .alias("help", "h")
    .showHelpOnFail(true)
    .demandCommand()
    .help();

export async function handler(args: any) {}
