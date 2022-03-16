import { Argv } from "yargs";
export declare const command = "createAddress [args]";
export declare const desc = "Create address";
export declare const builder: (yargs: Argv) => Argv<import("yargs").Omit<{}, "username" | "password"> & import("yargs").InferredOptionTypes<{
    username: {
        alias: string;
        description: string;
        required: true;
    };
    password: {
        alias: string;
        description: string;
        required: true;
    };
}>>;
export declare function handler(args: any): Promise<void>;
//# sourceMappingURL=createAddress.d.ts.map