# 🎨 Ninja Sketch

I'm building an Excalidraw clone with React and TypeScript. For the sketch-like designs, rough.js is being utilized. Rough.js is used for the sketchy, hand-drawn style, similar to what you see in Excalidraw.

The primary purpose of this project is for learning and educational purposes.

More updates coming soon...

<details> 
<summary><h2>🎬 Behind the Scenes: Building Ninja Sketch</h2>  
<h3>A step by step guide on how I created this. The code is often changed as I'm always adjusting it for the best results.</h3>
 </summary>

### 1️⃣ Rendering canvas with rough.js

In the `useLayoutEffect`, I first grab the canvas from the webpage and prepare it for drawing. I'm doing this because I don't want old sketches to mix with the new one, ensuring a clean and clear drawing every time.

It clears any previous drawings to start fresh. Then, I use rough.js to make the drawings look sketchy and hand-drawn.

A rectangle is drawn on this prepared canvas. All of this is done before the browser updates the display, which means the drawing appears all at once.

```javascript
import { useLayoutEffect } from "react";
import rough from "roughjs";

export default function App() {
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    const rect = roughCanvas.rectangle(10, 10, 200, 200);
    roughCanvas.draw(rect);
  });

  return (
    <div>
      <canvas id="canvas" width={window.innerWidth} height={window.innerHeight}>
        Canvas
      </canvas>
    </div>
  );
}
```

### 2️⃣ Drawing the canvas with rough.js

When I press the mouse down, the `handleMouseDown` function activates. It indicates I'm starting to draw by setting the `drawing` state to true. This means I'm beginning a new shape right where my cursor is at. The shape I draw, a line or rectangle, is decided by my previous choice and tracked by the `elementType` state, and the radio buttons let me switch between lines and rectangles.

While I move the mouse, the `handleMouseMove` function activates. If I'm drawing, the shape follows my cursor.

On the technical side, I find the last drawing I started with `const index = elements.length - 1;`. I then capture my mouse's current position with `const { clientX, clientY } = event;`. The `const { x1, y1 } = elements[index];` gets the starting point of my current shape, basically marking the first corner or line end. Using the initial and current positions, I update the shape I'm drawing with `const updateElement = createElement(x1, y1, clientX, clientY);`. Next, I make a copy of all my drawings and update the most recent one, the shape I'm currently changing, with the new version. This updated collection is then saved back into the `elements` state.

The drawing stops when I release the mouse, which the `handleMouseUp` function handles, ending the drawing.

I store every stroke and shape in an array, which is the `elements` state, and `useLayoutEffect` redraws the canvas with each new addition.

The clear button empties the array for a fresh canvas.

```javascript
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

export default function App() {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [elementType, setElementType] = useState<"line" | "rectangle">("line");

  const generator = rough.generator();

  const createElement = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): ElementType => {
    const roughElement =
      elementType === "line"
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
    setDrawing(true);
    const { clientX, clientY } = event;
    const element = createElement(clientX, clientY, clientX, clientY);
    setElements((prevState) => [...prevState, element]);
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) {
      return;
    }
    const index = elements.length - 1;
    const { clientX, clientY } = event;
    const { x1, y1 } = elements[index];
    const updateElement = createElement(x1, y1, clientX, clientY);
    const elementsCopy = [...elements];
    elementsCopy[index] = updateElement;
    setElements(elementsCopy);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };
  return (
    <div>
      <div style={{ position: "fixed" }}>
        <button onClick={() => setElements([])}>Clear</button>
        <input
          type="radio"
          name="line"
          id="line"
          checked={elementType === "line"}
          onChange={() => setElementType("line")}
        />
        <label htmlFor="line">line</label>
        <input
          type="radio"
          name="rectangle"
          id="rectangle"
          checked={elementType === "rectangle"}
          onChange={() => setElementType("rectangle")}
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
```

</details>
