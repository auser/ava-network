import { Encoding, read } from "@jkcfg/std";

export const readConfigFile = (filepath: string) =>
  read(filepath, { encoding: Encoding.String });

export interface IFileConfigMap {
  name: string;
  files: string[];
}

export type IMapping = { [key: string]: any };
