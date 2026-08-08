# AGENTS.md

## Aperçu du projet

Outil open source qui convertit du texte en Leet Speak (1337) et inversement, avec une interface web (HTML/TypeScript vanilla + Tailwind CSS v4) et une CLI interactive.

Stack : Bun (runtime, test runner, builder et serveur statique), TypeScript strict, Tailwind CSS v4, ESLint, Prettier.

## Commandes

| Commande               | Description                                  |
| ---------------------- | -------------------------------------------- |
| `bun run cli`          | Lancer la CLI interactive                    |
| `bun run test`         | Lancer les tests (`bun:test`)                |
| `bun run lint`         | Vérifier le lint (ESLint)                    |
| `bun run lint:fix`     | Corriger automatiquement les erreurs de lint |
| `bun run format`       | Formater tout le projet (Prettier `--write`) |
| `bun run format:check` | Vérifier le formatage sans modifier          |
| `bun run build`        | Builder la page web dans `dist/`             |
| `bun run start`        | Servir la page web (source, dev server)      |
| `bun run preview`      | Builder puis servir le build dans `dist/`    |

Filtrer les tests : `bun test -t <nom>` par nom, `bun test <chemin>` par fichier.

## Structure du projet

- `src/leet.ts` — logique métier : `toLeet`, `fromLeet`, `LEVELS`, type `Level`
- `src/leet.test.ts` — tests co-localisés
- `src/cli.ts` — CLI interactive
- `src/web/main.ts` — logique de la page web (conversion temps réel, thème, compteur d'étoiles, dropdowns custom)
- `src/web/style.css` — point d'entrée Tailwind (`@import "tailwindcss"`, `@theme`, `@font-face`, `@custom-variant dark`)
- `public/index.html` — page web source (classes Tailwind, servie par `bun run start`)
- `public/fonts/` — polices Space Mono (woff2), inlinées en base64 dans le build
- `build.ts` — build : `Bun.build` + `bun-plugin-tailwind`, sortie `dist/index.html` (fichier autonome, tout inliné)
- `bunfig.toml` — config du dev server (`[serve.static]` + plugin Tailwind)
- `.prettierrc.json` — Prettier avec `prettier-plugin-tailwindcss`
- `.vscode/settings.json` — ignore les at-rules inconnus Tailwind
- `dist/` — build généré, ne pas éditer (gitignoré)
- `.github/workflows/deploy.yml` — CI/CD : deploy GitHub Pages sur `main`

## Conventions de code

### TypeScript

- Respecter `tsconfig.json` (strict, `noUncheckedIndexedAccess`, `noImplicitOverride`).
- Les imports entre fichiers `.ts` gardent l'extension `.ts` : `import { toLeet } from "./leet.ts"`.
- La CLI n'exécute du code qu'en exécution directe via `if (import.meta.main)`.
- Commentaires en français, uniquement si nécessaires.

### Web (Tailwind CSS v4)

- Tous les styles sont des classes Tailwind dans `public/index.html`, aucun CSS custom (sauf Tailwind directives).
- Dark mode : `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`, toggle via `data-theme` sur `<html>` dans `main.ts`.
- Police par défaut : Space Mono via `@theme { --font-mono: ... }`, chargée par `@font-face` et inlinée en base64 par le build.
- Dropdowns custom : `<details>`/`<summary>` avec `data-value` + `[&::-webkit-details-marker]:hidden`, logique dans `initSelect` (`main.ts`).
- Icônes Phosphor inlinées en SVG (`fill="currentColor"`), identifiées `ph:...`.

### Build

- `bun run build` lance `build.ts` (pas `bun build` directement, qui ne supporte pas les plugins).
- Sortie : `dist/index.html` seul, self-contained (CSS, JS, polices, favicon inlinés). `bun run preview` le sert.
- Les paths des assets restent relatifs à la source dans `public/`.

### Tests

- Tests co-localisés `*.test.ts`, importés de `bun:test` (`describe`, `test`, `expect`).
- Mettre à jour les tests dès que la logique de `src/leet.ts` change.

## Conventions Git

### Branches

Format : `type/description-en-kebab-case`

- La description fait de 2 à 3 mots (ex: `docs/readme-doc`, `feat/leet-transformer`).
- Types : `feat/` (fonctionnalité), `fix/` (bug), `docs/` (doc), `style/` (UI), `refactor/` (refacto), `chore/` (maintenance), `test/` (tests).

### Messages de commit

Format : `type: description concise`

- Type : `feat`, `fix`, `docs`, `style`, `refactor`, `chore`, `test`, `ci`
- Description de 2 à 5 mots, en minuscules, à l'impératif, sans point final (ex: `feat: add copy result button`).

### Déploiement

Un push sur `main` déclenche GitHub Actions (`lint`, `format:check`, `test`, `build`) puis déploie sur GitHub Pages. Ne pas pousser directement sur `main` sans PR.

## Règles de travail

- **Toujours** : lancer `bun run lint` puis `bun run format` à la fin de chaque tâche. En cas d'erreur, la corriger et relancer jusqu'à zéro erreur (sinon `bun run lint:fix`).
- **Toujours** : ajouter ou mettre à jour les tests quand la logique change.
- **À demander** : ajouter une dépendance, modifier la CI, ou pousser sur `main`.
- **Jamais** : committer des secrets, éditer `dist/`, `node_modules/` ou un fichier `.env`.
