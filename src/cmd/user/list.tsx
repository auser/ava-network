import { Argv } from "yargs";
import { req } from "../../lib/req";

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
      const userList = users
        .reduce((acc: string[], username: string) => acc.concat(username), [])
        .join("\n");
      console.log(`Users: ${userList}`);
    } else {
      console.log(`No users`);
    }
  } else {
    console.log(`There was an error`);
  }
}
