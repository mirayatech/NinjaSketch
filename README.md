# 🎨 Ninja Sketch

I'm building an Excalidraw clone with React and TypeScript. For the sketch-like designs, rough.js is being utilized. Rough.js is used for the sketchy, hand-drawn style, similar to what you see in Excalidraw.

The primary purpose of this project is for learning and educational purposes.

More updates coming soon...

# 🎬 Behind the Scenes: Building Ninja Sketch

### 1️⃣ Rendering canvas with rough.js

In the `useLayoutEffect`, I first grab the canvas from the webpage and prepare it for drawing. I'm doing this because I don't want old sketches to mix with the new one, ensuring a clean and clear drawing every time.

It clears any previous drawings to start fresh. Then, I use rough.js to make the drawings look sketchy and hand-drawn.

A rectangle is drawn on this prepared canvas. All of this is done before the browser updates the display, which means the drawing appears all at once. Smoothly and without any visual interruptions.

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
