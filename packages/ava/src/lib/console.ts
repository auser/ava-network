import { printTable as pt } from "console-table-printer";

export const printTable = (input: string | any): void | string => {
  const json = typeof input === "string" ? JSON.parse(input) : input;
  pt(json);
};

export default printTable;
