export type Level = "basic" | "normal" | "high";

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
    L: "|_",
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
    L: "|_",
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

// Map inverse lettre <- leet, clés triées par longueur décroissante pour
// matcher "|2" avant "|", "0_" avant "0", etc.
const REVERSE: Record<Level, [string, string][]> = Object.fromEntries(
  (Object.keys(LEET) as Level[]).map((level) => [
    level,
    Object.entries(LEET[level])
      .map(([letter, leet]) => [leet, letter] as [string, string])
      .sort(([a], [b]) => b.length - a.length),
  ]),
) as Record<Level, [string, string][]>;

export function fromLeet(text: string, level: Level): string {
  const map = REVERSE[level];
  let result = "";
  let i = 0;
  while (i < text.length) {
    const [leet, letter] = map.find(([leet]) => text.startsWith(leet, i)) ?? [];
    if (leet) {
      result += letter;
      i += leet.length;
    } else {
      result += text.charAt(i);
      i++;
    }
  }
  // Première lettre en majuscule, le reste en minuscule
  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}
