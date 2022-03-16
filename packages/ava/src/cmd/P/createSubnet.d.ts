import { Argv } from "yargs";
export declare const command = "createSubnet [args]";
export declare const desc = "Create a subnet";
export declare const builder: (yargs: Argv) => Argv<import("yargs").Omit<{}, "username" | "password" | "threshold" | "controlKeys" | "from" | "changeAddr"> & import("yargs").InferredOptionTypes<{
    controlKeys: {
        array: true;
        description: string;
        required: true;
    };
    threshold: {
        description: string;
        type: "number";
        required: true;
    };
    from: {
        description: string;
        type: "string";
        array: true;
    };
    changeAddr: {
        description: string;
        type: "string";
    };
    username: {
        description: string;
        type: "string";
        required: true;
    };
    password: {
        description: string;
        type: "string";
        required: true;
    };
}>>;
export declare function handler(args: any): Promise<void>;
//# sourceMappingURL=createSubnet.d.ts.map