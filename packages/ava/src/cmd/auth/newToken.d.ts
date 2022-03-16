import { Argv } from "yargs";
export declare const command = "newToken [args]";
export declare const desc = "Get a new token";
export declare const builder: (yargs: Argv) => Argv<import("yargs").Omit<{}, "password" | "endpoints" | "quiet"> & import("yargs").InferredOptionTypes<{
    password: {
        alias: string;
        description: string;
        required: true;
    };
    endpoints: {
        alias: string;
        array: true;
        default: string;
    };
    quiet: {
        alias: string;
        default: boolean;
        type: "boolean";
    };
}>>;
export declare function handler(args: any): Promise<void>;
//# sourceMappingURL=newToken.d.ts.map