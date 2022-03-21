import { Argv } from "yargs";

export const command = "x <cmd> [args]";

export const desc = "x commands";

export const builder = (yargs: Argv) =>
  yargs
    .commandDir("./X")
    .usage("Usage: x <cmd> [args")
    .help("help")
    .alias("help", "h")
    .demandCommand()
    .help();

export async function handler(args: any) {}
