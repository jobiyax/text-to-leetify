import { LEVELS, fromLeet, toLeet } from "../leet.ts";

const input = document.getElementById("input") as HTMLTextAreaElement;
const output = document.getElementById("output") as HTMLElement;
const copy = document.getElementById("copy") as HTMLButtonElement;
const year = document.getElementById("year") as HTMLElement;
const theme = document.getElementById("theme") as HTMLButtonElement;
const iconSun = document.getElementById("ph:sun") as HTMLElement;
const iconMoon = document.getElementById("ph:moon") as HTMLElement;
const starCount = document.getElementById("star-count") as HTMLSpanElement;
const direction = document.getElementById("direction") as HTMLDetailsElement;
const directionLabel = document.getElementById(
  "direction-label",
) as HTMLSpanElement;
const level = document.getElementById("level") as HTMLDetailsElement;
const levelLabel = document.getElementById("level-label") as HTMLSpanElement;
const announce = document.getElementById("announce") as HTMLElement;

year.textContent = String(new Date().getFullYear());

const formatCount = new Intl.NumberFormat("fr", {
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

function initSelect(details: HTMLDetailsElement, label: HTMLSpanElement) {
  const options = details.querySelectorAll<HTMLElement>("[data-value]");
  const summary = details.querySelector("summary");
  const syncExpanded = () =>
    summary?.setAttribute("aria-expanded", String(details.open));
  const setSelected = (value: string) => {
    options.forEach((option) => {
      const active = option.dataset.value === value;
      option.classList.toggle("bg-zinc-200", active);
      option.classList.toggle("dark:bg-zinc-800", active);
      option.setAttribute("aria-current", active ? "true" : "false");
    });
  };
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value;
      if (!value) return;
      details.dataset.value = value;
      label.textContent = option.textContent;
      setSelected(value);
      details.open = false;
      summary?.focus();
      convert();
    });
  });
  setSelected(details.dataset.value ?? "");
  syncExpanded();
  details.addEventListener("toggle", () => {
    syncExpanded();
    if (!details.open) return;
    for (const other of [direction, level]) {
      if (other !== details) other.open = false;
    }
  });
}

initSelect(direction, directionLabel);
initSelect(level, levelLabel);

document.addEventListener("click", (event) => {
  for (const details of [direction, level]) {
    if (details.open && !details.contains(event.target as Node)) {
      details.open = false;
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  for (const details of [direction, level]) {
    if (details.open) {
      details.open = false;
      details.querySelector("summary")?.focus();
    }
  }
});

convert();

function convert() {
  const selected = LEVELS[Number(level.dataset.value)];
  if (!selected) return;
  output.textContent =
    direction.dataset.value === "to"
      ? toLeet(input.value, selected)
      : fromLeet(input.value, selected);
}

input.addEventListener("input", convert);

let copyTimer: ReturnType<typeof setTimeout> | undefined;

copy.addEventListener("click", async () => {
  const text = output.textContent?.trim();
  clearTimeout(copyTimer);
  if (!text) {
    copy.textContent = "Rien à copier";
    announce.textContent = "Rien à copier";
  } else {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Repli si l'API clipboard est indisponible (contexte non sécurisé)
      const fallback = document.createElement("textarea");
      fallback.value = text;
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
    }
    copy.textContent = "Copié !";
    announce.textContent = "Copié !";
  }
  copyTimer = setTimeout(() => (copy.textContent = "Copier"), 2000);
});
