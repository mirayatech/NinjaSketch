export const cursorForPosition = (position: string) => {
  switch (position) {
    case "topLeft":
    case "bottomRight":
      return "nwse-resize";
    case "topRight":
    case "bottomLeft":
      return "nesw-resize";
    case "start":
    case "end":
      return "move";
    case "inside":
      return "move";
    default:
      return "default";
  }
};
