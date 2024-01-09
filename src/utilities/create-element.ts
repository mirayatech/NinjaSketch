import rough from "roughjs";
import { Tools, ElementType, ToolsType } from "../types";

export const createElement = (
  id: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  type: ToolsType
): ElementType => {
  const generator = rough.generator();

  switch (type) {
    case Tools.line:
    case Tools.rectangle: {
      const roughElement =
        type === Tools.line
          ? generator.line(x1, y1, x2, y2)
          : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
      return { id, x1, y1, x2, y2, type, roughElement };
    }
    case Tools.pencil: {
      const defaultRoughElement = null;
      return {
        id,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        type,
        points: [{ x: x1, y: y1 }],
        roughElement: defaultRoughElement,
      };
    }
    case Tools.text:
      return { id, type, x1, y1, x2, y2, text: "" };
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};
