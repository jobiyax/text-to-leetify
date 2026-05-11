import type { Config } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error("DATABASE_URL n'est pas défini");
}

export default {
	// Chemin des schemas + dossier migrations
	schema: "./server/db/schemas/*.ts",
	out: "./drizzle",

	// Type de base de données utilisée
	dialect: "postgresql",

	// Connexion DB
	dbCredentials: {
		url: DATABASE_URL,
	},
} satisfies Config;
