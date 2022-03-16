import { Argv } from "yargs";
export declare const command = "generateConfig [args]";
export declare const desc = "generate an avalanche config";
export declare const builder: (yargs: Argv) => Argv<import("yargs").Omit<{}, "file" | "apiAdminEnabled" | "apiAuthRequired" | "apiHealthEnabled"> & import("yargs").InferredOptionTypes<{
    file: {
        description: string;
        type: "string";
    };
    apiAdminEnabled: {
        type: "boolean";
        description: string;
        default: boolean;
    };
    apiAuthRequired: {
        type: "boolean";
        description: string;
        default: boolean;
    };
    apiHealthEnabled: {
        type: "boolean";
        description: string;
        default: boolean;
    };
}>>;
export declare function handler(args: any): Promise<void>;
//# sourceMappingURL=generateConfig.d.ts.map