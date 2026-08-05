import { LEVELS, fromLeet, toLeet } from "./index.ts";

const input = document.getElementById("input") as HTMLTextAreaElement;
const direction = document.getElementById("direction") as HTMLSelectElement;
const level = document.getElementById("level") as HTMLSelectElement;
const output = document.getElementById("output") as HTMLElement;

function convert() {
  const selected = LEVELS[Number(level.value)];
  if (!selected) return;
  output.textContent =
    direction.value === "to"
      ? toLeet(input.value, selected)
      : fromLeet(input.value, selected);
}

input.addEventListener("input", convert);
direction.addEventListener("change", convert);
level.addEventListener("change", convert);
