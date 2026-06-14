import { describe, it, expect } from "vitest";
import { orbitPosition, levelToWidth } from "./orbit";

describe("orbitPosition", () => {
  it("en ángulo 0 está en el extremo derecho de la elipse", () => {
    const p = orbitPosition(0, 100, 50);
    expect(p.x).toBeCloseTo(100);
    expect(p.y).toBeCloseTo(0);
  });

  it("en ángulo PI/2 está en el extremo inferior", () => {
    const p = orbitPosition(Math.PI / 2, 100, 50);
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBeCloseTo(50);
  });

  it("en ángulo PI está en el extremo izquierdo", () => {
    const p = orbitPosition(Math.PI, 100, 50);
    expect(p.x).toBeCloseTo(-100);
    expect(p.y).toBeCloseTo(0);
  });
});

describe("levelToWidth", () => {
  it("convierte nivel 0-100 a string de porcentaje", () => {
    expect(levelToWidth(0)).toBe("0%");
    expect(levelToWidth(90)).toBe("90%");
  });

  it("acota valores fuera de rango", () => {
    expect(levelToWidth(-10)).toBe("0%");
    expect(levelToWidth(150)).toBe("100%");
  });
});
