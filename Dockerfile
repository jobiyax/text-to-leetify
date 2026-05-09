# Image Bun (Debian)
FROM oven/bun:debian

# Dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json bun.lock ./

# Installer les dépendances (prod)
RUN bun install --production --frozen-lockfile

# Copier le projet
COPY . .

# Build de l'app
RUN bun run build

# Port exposé
EXPOSE 8080

# Démarrer l'app
CMD ["bun", "run", "start"]
