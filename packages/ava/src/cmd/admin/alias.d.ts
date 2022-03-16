import { Argv } from "yargs";
export declare const command = "alias [args]";
export declare const desc = "Set an alias";
export declare const builder: (yargs: Argv) => Argv<import("yargs").Omit<{}, "alias" | "endpoint"> & import("yargs").InferredOptionTypes<{
    alias: {
        alias: string;
        description: string;
        required: true;
    };
    endpoint: {
        alias: string;
        required: true;
    };
}>>;
export declare function handler(args: any): Promise<void>;
//# sourceMappingURL=alias.d.ts.map