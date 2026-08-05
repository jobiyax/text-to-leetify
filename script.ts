import { LEVELS, fromLeet, toLeet } from "./index.ts";

const input = document.getElementById("input") as HTMLTextAreaElement;
const direction = document.getElementById("direction") as HTMLSelectElement;
const level = document.getElementById("level") as HTMLSelectElement;
const output = document.getElementById("output") as HTMLElement;
const copy = document.getElementById("copy") as HTMLButtonElement;

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

copy.addEventListener("click", async () => {
  if (!output.textContent) return;
  await navigator.clipboard.writeText(output.textContent);
  copy.textContent = "Copié !";
  setTimeout(() => (copy.textContent = "Copier"), 2000);
});
