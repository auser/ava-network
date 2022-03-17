import { Argv } from "yargs";
import { req } from "../../lib/req";
import { printTable } from "../../lib/console";

export const command = "list [args]";

export const desc = "List the users";

export const builder = (yargs: Argv) => yargs.options({});

export async function handler(args: any) {
  const opts = {};
  const data = await req(
    `/ext/keystore`,
    "keystore.listUsers",
    opts,
    args.requestOptions
  );
  if (data.users) {
    const { users } = data;
    if (users.length > 0) {
      const userList = users.reduce(
        (
          acc: { id: number; username: string }[],
          username: string,
          id: number
        ) => acc.concat({ id, username }),
        []
      );

      console.log(`Users:`);
      printTable(userList);
    } else {
      console.log(`No users`);
    }
  } else {
    console.log(`There was an error`);
  }
}
