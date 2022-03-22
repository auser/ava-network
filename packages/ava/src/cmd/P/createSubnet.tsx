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
      alias: "t",
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
      alias: "u",
      required: true,
    },
    password: {
      description: "The username's password",
      type: "string",
      alias: "p",
      required: true,
    },
  });

export async function handler(args: any) {
  const data = await req("/ext/P", "platform.createSubnet", args, [
    "threshold",
    "controlKeys",
    "username",
    "password",
    "from",
    "changeAddr",
  ]);
  if (data.address) {
    console.log(`Address: ${data.address}`);
  } else {
    console.log(data);
  }
}
