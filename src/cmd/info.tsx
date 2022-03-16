import { Argv } from "yargs";

export const command = "info <cmd> [args]";

export const desc = "info commands";

export const builder = (yargs: Argv) =>
  yargs
    .commandDir("./info")
    .usage("Usage: info <cmd> [args")
    .help("help")
    .alias("h", "help")
    .demandCommand()
    .help();

export async function handler(args: any) {
  console.log("Called info");
}
