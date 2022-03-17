import fs from "fs";
import path from "path";

export const rootDir = path.join(__dirname, "..", "..");
export const srcDir = path.join(__dirname, "..");
export const templatesDir = path.join(process.cwd(), "templates");

export const readConfigFile = (filepath: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(
      path.join(templatesDir, filepath),
      { encoding: "utf-8" },
      (err: Error | null, contents: Buffer) => {
        if (err) return reject(err);
        resolve(contents);
      }
    );
  });

export interface IFileConfigMap {
  name: string;
  files: string[];
}

export type IMapping = { [key: string]: any };
