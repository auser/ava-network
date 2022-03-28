import { Argv } from "yargs";
import chalk from "chalk";
import { req, getWeb3 } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "signTransaction [args]";

export const desc = "Sign a transaction";

export const builder = (yargs: Argv) =>
  yargs.options({
    from: {
      description: "From address",
      required: true,
      type: "string",
    },
    to: {
      description: "to address",
      type: "string",
    },
    gas: {
      description: "Gas to provided for the transaction execution",
      type: "string",
      default: "0x76c0",
    },
    gasPrice: {
      description: "Integer for the gasPrice used",
      type: "string",
      default: "0x9184e72a000",
    },
    value: {
      description: "Value to send with the transaction",
      type: "string",
    },
    data: {
      description: "Data to send with transaction",
      type: "string",
    },
    nonce: {
      description: "Integer of a nonce",
      type: "string",
      default: "0x01",
    },
  });

export async function handler(args: any) {
  const requestParams = [args.from, "latest"];
  const txCount = await req("/ext/bc/C/rpc", "eth_getTransactionCount", {
    ...args,
    requestParams,
  });
  args.nonce = txCount;
  const web3 = await getWeb3("/ext/bc/C/rpc", args);

  const reqArgs = {
    from: args.from,
    to: args.to,
    gasPrice: args.gasPrice,
    gas: args.gas,
    value: args.value,
    nonce: args.nonce,
  };
  const tx = await web3.eth.signTransaction(reqArgs);

  const color = chalk.white;
  if (args.debug) {
    console.log("tx", tx);
  }
  if (tx.raw) {
    console.log(tx.raw);
  }

  // const resp = await req("/ext/bc/C/rpc", "eth_signTransaction", args, [
  //   "nonce",
  //   "data",
  //   "value",
  //   "gasPrice",
  //   "gas",
  //   "to",
  //   "from",
  // ]);

  // console.log(resp);
}
