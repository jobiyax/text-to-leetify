# Image Bun Debian
FROM oven/bun:debian

# Dossier de travail
WORKDIR /app

# Copier les dépendances
COPY package.json bun.lock ./

# Installer les dépendances
RUN bun install --production --frozen-lockfile

# Copier le projet
COPY . .

# Build de l'application
RUN bun run build

# Port exposé
EXPOSE 3000

# Lancer l'application
CMD ["bun", "run", "start"]
