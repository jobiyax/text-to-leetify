import { describe, expect, test } from "bun:test";
import { fromLeet, toLeet } from "./index.ts";

describe("toLeet", () => {
  test("basic", () => {
    expect(toLeet("Hello World", "basic")).toBe("H3ll0 W0rld");
  });
  test("normal", () => {
    expect(toLeet("Leet Speak", "normal")).toBe("1337 5p34k");
  });
  test("high", () => {
    expect(toLeet("Elite Coder", "high")).toBe("31173 (0|)3|2");
  });
  test("garde les caractères non mappés", () => {
    expect(toLeet("Hello, World!", "basic")).toBe("H3ll0, W0rld!");
  });
});

describe("fromLeet", () => {
  test("basic", () => {
    expect(fromLeet("H3ll0 W0rld", "basic")).toBe("HEllO WOrld");
  });
  test("normal", () => {
    expect(fromLeet("1337 5p34k", "normal")).toBe("IEET SpEAk");
  });
  test("high matche le plus long d'abord", () => {
    expect(fromLeet("31173 (0|)3|2", "high")).toBe("EIITE CODER");
  });
});
