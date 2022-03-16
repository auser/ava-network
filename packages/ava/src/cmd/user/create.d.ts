import { Argv } from "yargs";
export declare const command = "create [args]";
export declare const desc = "Create a new user";
export declare const builder: (yargs: Argv) => Argv<import("yargs").Omit<{}, "username" | "password" | "g"> & import("yargs").InferredOptionTypes<{
    username: {
        alias: string;
        description: string;
        required: true;
        help: string;
    };
    password: {
        alias: string;
        description: string;
    };
    g: {
        alias: string;
        description: string;
    };
}>>;
export declare function handler(args: any): Promise<void>;
//# sourceMappingURL=create.d.ts.map