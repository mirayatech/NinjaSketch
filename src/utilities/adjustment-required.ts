import { Tools } from "../types";

export const adjustmentRequired = (type: Tools) =>
  ["line", "rectangle"].includes(type);
