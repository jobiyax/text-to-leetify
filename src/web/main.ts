import { LEVELS, fromLeet, toLeet } from "../leet.ts";

const input = document.getElementById("input") as HTMLTextAreaElement;
const direction = document.getElementById("direction") as HTMLSelectElement;
const level = document.getElementById("level") as HTMLSelectElement;
const output = document.getElementById("output") as HTMLElement;
const copy = document.getElementById("copy") as HTMLButtonElement;
const year = document.getElementById("year") as HTMLElement;
const theme = document.getElementById("theme") as HTMLButtonElement;
const iconSun = document.querySelector<SVGSVGElement>(
  "#icon-sun",
) as SVGSVGElement;
const iconMoon = document.querySelector<SVGSVGElement>(
  "#icon-moon",
) as SVGSVGElement;
const starCount = document.getElementById("star-count") as HTMLSpanElement;

year.textContent = String(new Date().getFullYear());

const formatCount = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

fetch("https://api.github.com/repos/jobiyax/text-to-leetify")
  .then((response) => (response.ok ? response.json() : null))
  .then((data) => {
    if (!data) return;
    starCount.textContent = formatCount.format(data.stargazers_count);
    starCount.classList.remove("hidden");
  })
  .catch(() => {});

function applyTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  iconSun.classList.toggle("hidden", dark);
  iconMoon.classList.toggle("hidden", !dark);
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
