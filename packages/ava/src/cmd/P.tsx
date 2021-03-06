import { Argv } from "yargs";

export const command = "p <cmd> [args]";

export const desc = "p commands";

export const builder = (yargs: Argv) =>
  yargs
    .commandDir("./P")
    .usage("Usage: p <cmd> [args")
    .help("help")
    .alias("help", "h")
    .demandCommand()
    .help();

export async function handler(args: any) {}
