import { Argv } from "yargs";
import { req } from "../../lib/req";

export const command = "createSubnet [args]";

export const desc = "Create a subnet";

export const builder = (yargs: Argv) =>
  yargs.options({
    controlKeys: {
      array: true,
      description: "Control key addresses",
      required: true,
    },
    threshold: {
      description: "threshold of number of signatures",
      type: "number",
      required: true,
    },
    from: {
      description: "Addresses to associal with the operation",
      type: "string",
      array: true,
    },
    changeAddr: {
      description: "The address any change will be sent to.",
      type: "string",
    },
    username: {
      description: "The user that pays the transaction fee",
      type: "string",
      required: true,
    },
    password: {
      description: "The username's password",
      type: "string",
      required: true,
    },
  });

export async function handler(args: any) {
  const { threshold, controlKeys, username, password } = args;

  const requestOptions: any = {
    threshold,
    controlKeys,
    username,
    password,
  };
  if (args.from) {
    requestOptions["from"] = args.from;
  }
  if (args.changeAddr) {
    requestOptions["changeAddr"] = args.changeAddr;
  }
  const data = await req(
    "/ext/P",
    "platform.createSubnet",
    requestOptions,
    args.requestOptions
  );
  if (data.address) {
    console.log(`Address: ${data.address}`);
  }
}
