<img src="public/text-to-leetif.webp" width="300">

# Text to Leetif

Le Leet Speak (1337) remplace les lettres par des chiffres et des symboles qui leur ressemblent. Text to Leetif convertit automatiquement ton texte en Leet Speak et inversement, en restant lisible : seuls les caractères mappés changent.

## Fonctionnalités

- Conversion texte vers leet et leet vers texte
- Trois niveaux de remplacement, du plus sobre au plus complet
- Interface web en temps réel, avec thème sombre et copie en un clic
- CLI interactive pour convertir depuis le terminal

## Niveaux de Leet Speak

Trois niveaux sont disponibles : plus le niveau est élevé, plus de lettres sont remplacées.

- **Basique** : seulement les chiffres les plus connus (A→4, E→3, I→1, O→0, S→5, T→7).
- **Normal** : ajoute quelques équivalents simples (B→8, C→(, G→6, L→1, R→|2, Z→2).
- **Élevé** : couvre tout l'alphabet avec des caractères simples et lisibles.

| Lettre | 1. Basique | 2. Normal | 3. Élevé |
| ------ | ---------- | --------- | -------- |
| A      | 4          | 4         | 4        |
| B      | B          | 8         | 8        |
| C      | C          | (         | (        |
| D      | D          | D         | \|)      |
| E      | 3          | 3         | 3        |
| F      | F          | F         | \|=      |
| G      | G          | 6         | 6        |
| H      | H          | H         | #        |
| I      | 1          | 1         | 1        |
| J      | J          | J         | \_\|     |
| K      | K          | K         | \|<      |
| L      | L          | \|_       | \|_      |
| M      | M          | M         | \|\/\|   |
| N      | N          | N         | \|\|     |
| O      | 0          | 0         | 0        |
| P      | P          | P         | \|>      |
| Q      | Q          | Q         | 0\_      |
| R      | R          | \|2       | \|2      |
| S      | 5          | 5         | 5        |
| T      | 7          | 7         | 7        |
| U      | U          | U         | \|\_\|   |
| V      | V          | V         | \/       |
| W      | W          | W         | \/\/     |
| X      | X          | X         | ><       |
| Y      | Y          | Y         | `/       |
| Z      | Z          | 2         | 2        |

Exemples :

- Basique : `Hello World` → `H3ll0 W0rld`
- Normal : `Leet Speak` → `133t 5p3ak`
- Élevé : `Elite Coder` → `3l173 (0d3r`

## Installation

Prérequis : [Bun](https://bun.sh).

```bash
git clone https://github.com/jobiyax/text-to-leetify.git
cd text-to-leetify
bun install
```

## Utilisation

Interface web : `bun run start` puis ouvre l'adresse affichée.

CLI : `bun run cli`, puis réponds aux questions (direction, niveau, texte).

```
1 = texte → leet, 2 = leet → texte ? 1
Niveau (1 = basic, 2 = normal, 3 = high) ? 2
Texte : Leet Speak
|_337 5p34k
```

## Développement

| Commande         | Description                             |
| ---------------- | --------------------------------------- |
| `bun run test`   | Lancer les tests (`bun:test`)           |
| `bun run lint`   | Vérifier le lint (ESLint)               |
| `bun run format` | Formater le projet (Prettier `--write`) |
| `bun run build`  | Builder la page web dans `dist/`        |

## Contribuer

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) pour les conventions de branches, de commits et le workflow avant de soumettre une pull request.

## Licence

Distribué sous licence MIT. Voir [LICENSE](LICENSE).
