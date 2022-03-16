import { Argv } from "yargs";
export declare const command = "isBootstrapped [args]";
export declare const desc = "Get if the chain is bootstrapped";
export declare const builder: (yargs: Argv) => Argv<import("yargs").Omit<{}, "chain"> & import("yargs").InferredOptionTypes<{
    chain: {
        description: string;
        default: string;
        alias: string;
        type: "string";
    };
}>>;
export declare function handler(args: any): Promise<void>;
//# sourceMappingURL=isBootstrapped.d.ts.map