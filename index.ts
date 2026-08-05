type Level = "basic" | "normal" | "high";

// Cartographie lettre -> leet pour chaque niveau
const LEET: Record<Level, Record<string, string>> = {
  basic: { A: "4", E: "3", I: "1", O: "0", S: "5", T: "7" },
  normal: {
    A: "4",
    B: "8",
    C: "(",
    E: "3",
    G: "6",
    I: "1",
    L: "1",
    O: "0",
    R: "|2",
    S: "5",
    T: "7",
    Z: "2",
  },
  high: {
    A: "4",
    B: "8",
    C: "(",
    D: "|)",
    E: "3",
    F: "|=",
    G: "6",
    H: "#",
    I: "1",
    J: "_|",
    K: "|<",
    L: "1",
    M: "|\\/|",
    N: "||",
    O: "0",
    P: "|>",
    Q: "0_",
    R: "|2",
    S: "5",
    T: "7",
    U: "|_|",
    V: "\\/",
    W: "\\/\\/",
    X: "><",
    Y: "`/",
    Z: "2",
  },
};

export const LEVELS: Level[] = ["basic", "normal", "high"];

export function toLeet(text: string, level: Level): string {
  const map = LEET[level];
  // Garde les caractères non mappés (espaces, ponctuation, minuscules)
  return [...text].map((c) => map[c.toUpperCase()] ?? c).join("");
}

if (import.meta.main) {
  const input = prompt("Niveau (1 = basic, 2 = normal, 3 = high) ? ");
  const level = LEVELS[Number(input) - 1];
  if (!level) {
    console.error("Niveau invalide. Choisis 1, 2 ou 3.");
    process.exit(1);
  }

  const text = prompt("Texte à convertir : ") ?? "";
  console.log(toLeet(text, level));
}
