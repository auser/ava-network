import { Argv } from "yargs";

export const command = "P <cmd> [args]";

export const desc = "P commands";

export const builder = (yargs: Argv) =>
  yargs
    .commandDir("./P")
    .usage("Usage: P <cmd> [args")
    .help("help")
    .alias("help", "h")
    .demandCommand()
    .help();

export async function handler(args: any) {}
