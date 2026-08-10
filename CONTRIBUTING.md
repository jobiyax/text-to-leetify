# Contributing

Merci de contribuer au projet. Suis ces quelques règles simples.

## Workflow

1. Crée une branche depuis `main` : `type/description-en-kebab-case` (2 à 3 mots).
   Types : `feat/`, `fix/`, `docs/`, `style/`, `refactor/`, `chore/`, `test/`.
2. Fais tes modifications en suivant les conventions du projet.
3. Lance `bun run lint` puis `bun run format` jusqu'à zéro erreur.
4. Ajoute ou mets à jour les tests quand la logique change.
5. Soumets une pull request vers `main` avec un message de commit clair.

## Messages de commit

Format : `type: description` (2 à 5 mots, minuscules, impératif, sans point final).

Types : `feat`, `fix`, `docs`, `style`, `refactor`, `chore`, `test`, `ci`.

Exemple : `feat: add copy result button`

## À éviter

- Committer des secrets ou des fichiers `.env`
- Éditer `dist/`, `node_modules/`
- Pousser directement sur `main` sans pull request

## Questions

Ouvre une issue sur le dépôt GitHub pour toute question ou suggestion.
