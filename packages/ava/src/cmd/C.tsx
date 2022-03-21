import { Argv } from "yargs";

export const command = "c <cmd> [args]";

export const desc = "c commands";

export const builder = (yargs: Argv) =>
  yargs
    .commandDir("./C")
    .usage("Usage: c <cmd> [args")
    .help("help")
    .alias("help", "h")
    .demandCommand()
    .help();

export async function handler(args: any) {}
