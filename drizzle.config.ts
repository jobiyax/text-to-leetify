import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL manque");
}

export default defineConfig({
	// Chemin des schemas + dossier migrations
	schema: "./server/schemas/*.ts",
	out: "./drizzle",

	// Type de base de données utilisée
	dialect: "postgresql",

	// Connexion DB
	dbCredentials: {
		url: databaseUrl,
	},

	// Active le mode strict pour éviter les push dangereux
	strict: true,

	// Affiche les requêtes SQL pendant les opérations
	verbose: true,

	// Recommandé pour la compatibilité migrations
	breakpoints: true,

	// Table des migrations
	migrations: {
		table: "__drizzle_migrations__",
		schema: "public",
	},
});
