import { LEVELS, toLeet } from "./index.ts";

const input = document.getElementById("input") as HTMLTextAreaElement;
const level = document.getElementById("level") as HTMLSelectElement;
const output = document.getElementById("output");

function convert() {
  const selected = LEVELS[Number(level.value)];
  output.textContent = selected ? toLeet(input.value, selected) : "";
}

input.addEventListener("input", convert);
level.addEventListener("change", convert);
