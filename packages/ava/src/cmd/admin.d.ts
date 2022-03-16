import { Argv } from "yargs";
export declare const command = "admin <cmd> [args]";
export declare const desc = "admin commands";
export declare const builder: (yargs: Argv) => Argv<{}>;
export declare function handler(args: any): Promise<void>;
//# sourceMappingURL=admin.d.ts.map