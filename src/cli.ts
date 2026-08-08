import { LEVELS, fromLeet, toLeet } from "./leet.ts";

if (import.meta.main) {
  const direction = prompt("1 = texte vers leet, 2 = leet vers texte ? ");
  if (direction !== "1" && direction !== "2") {
    console.error("Direction invalide. Choisis 1 ou 2.");
    process.exit(1);
  }

  const levelInput = prompt("Niveau (1 = basic, 2 = normal, 3 = high) ? ");
  const level = LEVELS[Number(levelInput) - 1];
  if (!level) {
    console.error("Niveau invalide. Choisis 1, 2 ou 3.");
    process.exit(1);
  }

  const text = prompt("Texte : ") ?? "";
  console.log(direction === "1" ? toLeet(text, level) : fromLeet(text, level));
}
