import { ToolsType } from "../types";

export const adjustmentRequired = (type: ToolsType) =>
  ["line", "rectangle"].includes(type);
