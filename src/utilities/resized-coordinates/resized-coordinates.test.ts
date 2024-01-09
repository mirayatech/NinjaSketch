import { expect, test } from "vitest";
import { resizedCoordinates } from "..";

test("resizedCoordinates function", () => {
  expect(
    resizedCoordinates(1, 2, "start", { x1: 0, y1: 0, x2: 2, y2: 2 })
  ).toEqual({ x1: 1, y1: 2, x2: 2, y2: 2 });

  expect(
    resizedCoordinates(1, 2, "topLeft", { x1: 0, y1: 0, x2: 2, y2: 2 })
  ).toEqual({ x1: 1, y1: 2, x2: 2, y2: 2 });

  expect(
    resizedCoordinates(1, 2, "topRight", { x1: 0, y1: 0, x2: 2, y2: 2 })
  ).toEqual({ x1: 0, y1: 2, x2: 1, y2: 2 });

  expect(
    resizedCoordinates(1, 2, "bottomLeft", { x1: 0, y1: 0, x2: 2, y2: 2 })
  ).toEqual({ x1: 1, y1: 0, x2: 2, y2: 2 });

  expect(
    resizedCoordinates(1, 2, "end", { x1: 0, y1: 0, x2: 2, y2: 2 })
  ).toEqual({ x1: 0, y1: 0, x2: 1, y2: 2 });

  expect(
    resizedCoordinates(1, 2, "bottomRight", { x1: 0, y1: 0, x2: 2, y2: 2 })
  ).toEqual({ x1: 0, y1: 0, x2: 1, y2: 2 });

  expect(
    resizedCoordinates(1, 2, "unknown", { x1: 0, y1: 0, x2: 2, y2: 2 })
  ).toEqual({ x1: 0, y1: 0, x2: 2, y2: 2 });
});
