import { MouseEvent, useLayoutEffect, useState } from "react";
import rough from "roughjs";

type ElementType = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  // TODO: add type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  roughElement: any;
};

enum Tools {
  Selection = "selection",
  Line = "line",
  Rectangle = "rectangle",
}

export default function App() {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState<Tools>(Tools.Line);

  const generator = rough.generator();

  const createElement = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): ElementType => {
    const roughElement =
      tool === Tools.Line
        ? generator.line(x1, y1, x2, y2)
        : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
    return { x1, y1, x2, y2, roughElement };
  };

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => {
      roughCanvas.draw(roughElement);
    });
  }, [elements]);

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    if (tool === Tools.Selection) {
      /*
       TODO: implement selection
      if we are on an element
      setAction("moving"); 
      */
    } else {
      setAction("drawing");
      const { clientX, clientY } = event;
      const element = createElement(clientX, clientY, clientX, clientY);
      setElements((prevState) => [...prevState, element]);
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (action === "drawing") {
      const index = elements.length - 1;
      const { clientX, clientY } = event;
      const { x1, y1 } = elements[index];
      const updateElement = createElement(x1, y1, clientX, clientY);

      const elementsCopy = [...elements];
      elementsCopy[index] = updateElement;
      setElements(elementsCopy);
    }
  };

  const handleMouseUp = () => {
    setAction("none");
  };

  return (
    <div>
      <div style={{ position: "fixed" }}>
        <button onClick={() => setElements([])}>Clear</button>

        <input
          type="radio"
          name="selection"
          id="selection"
          checked={tool === Tools.Selection}
          onChange={() => setTool(Tools.Selection)}
        />
        <label htmlFor="selection">selection</label>
        <input
          type="radio"
          name="line"
          id="line"
          checked={tool === Tools.Line}
          onChange={() => setTool(Tools.Line)}
        />
        <label htmlFor="line">line</label>

        <input
          type="radio"
          name="rectangle"
          id="rectangle"
          checked={tool === Tools.Rectangle}
          onChange={() => setTool(Tools.Rectangle)}
        />

        <label htmlFor="rectangle">rectangle</label>
      </div>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        Canvas
      </canvas>
    </div>
  );
}
