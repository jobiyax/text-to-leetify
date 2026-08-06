# AGENTS.md

## Aperçu du projet

Outil open source qui convertit du texte en Leet Speak (1337) et inversement, avec une interface web (HTML/CSS/TypeScript vanilla) et une CLI interactive.

Stack : Bun (runtime, test runner, build), TypeScript strict, ESLint, Prettier.

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
| `bun run start`        | Servir la page web                           |

Filtrer les tests : `bun test -t <nom>` par nom, `bun test <chemin>` par fichier.

## Structure du projet

- `src/leet.ts` — logique métier : `toLeet`, `fromLeet`, `LEVELS`, type `Level`
- `src/leet.test.ts` — tests co-localisés
- `src/cli.ts` — CLI interactive
- `src/web/main.ts` — logique de la page web (conversion temps réel, thème, copie)
- `src/web/style.css` — styles de la page
- `public/index.html` — page web servie par Bun
- `dist/` — build généré, ne pas éditer (gitignoré)
- `.github/workflows/deploy.yml` — CI/CD : deploy GitHub Pages sur `main`

## Conventions de code

### TypeScript

- Respecter `tsconfig.json` (strict, `noUncheckedIndexedAccess`, `noImplicitOverride`).
- Les imports entre fichiers `.ts` gardent l'extension `.ts` : `import { toLeet } from "./leet.ts"`.
- La CLI n'exécute du code qu'en exécution directe via `if (import.meta.main)`.
- Commentaires en français, uniquement si nécessaires.

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
