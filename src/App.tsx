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
