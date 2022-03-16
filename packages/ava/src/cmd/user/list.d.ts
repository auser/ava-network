import { Argv } from "yargs";
export declare const command = "list [args]";
export declare const desc = "List the users";
export declare const builder: (yargs: Argv) => Argv<import("yargs").Omit<{}, never> & import("yargs").InferredOptionTypes<{}>>;
export declare function handler(args: any): Promise<void>;
//# sourceMappingURL=list.d.ts.map