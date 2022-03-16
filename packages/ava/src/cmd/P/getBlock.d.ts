import { Argv } from "yargs";
export declare const command = "getBlock [args]";
export declare const desc = "Get a block";
export declare const builder: (yargs: Argv) => Argv<import("yargs").Omit<{}, "blockID" | "encoding"> & import("yargs").InferredOptionTypes<{
    blockID: {
        description: string;
        required: true;
    };
    encoding: {
        alias: string;
        help: string;
        choices: string[];
    };
}>>;
export declare function handler(args: any): Promise<void>;
//# sourceMappingURL=getBlock.d.ts.map