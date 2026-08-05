import { LEVELS, fromLeet, toLeet } from "../leet.ts";

const input = document.getElementById("input") as HTMLTextAreaElement;
const direction = document.getElementById("direction") as HTMLSelectElement;
const level = document.getElementById("level") as HTMLSelectElement;
const output = document.getElementById("output") as HTMLElement;
const copy = document.getElementById("copy") as HTMLButtonElement;
const year = document.getElementById("year") as HTMLElement;
const theme = document.getElementById("theme") as HTMLButtonElement;

year.textContent = String(new Date().getFullYear());

function applyTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  theme.textContent = dark ? "Mode clair" : "Mode sombre";
}

const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(saved ? saved === "dark" : prefersDark);

theme.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "dark";
  localStorage.setItem("theme", dark ? "dark" : "light");
  applyTheme(dark);
});

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
