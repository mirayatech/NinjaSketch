import { test, expect } from "vitest";
import { nearPoint } from "..";

test("nearPoint should correctly determine the nearest point", () => {
  const result1 = nearPoint(10, 10, 12, 12, "topLeft");
  expect(result1).toBe("topLeft");

  const result2 = nearPoint(28, 10, 30, 12, "topRight");
  expect(result2).toBe("topRight");

  const result3 = nearPoint(10, 28, 12, 30, "bottomLeft");
  expect(result3).toBe("bottomLeft");

  const result4 = nearPoint(28, 28, 30, 30, "bottomRight");
  expect(result4).toBe("bottomRight");

  const result5 = nearPoint(20, 20, 10, 10, "start");
  expect(result5).toBe(null);
});
