import { SQL } from "bun";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL est manquant");
}

export const db = new SQL(databaseUrl, {
	max: 10, // max 10 connexions à la base de données
	idleTimeout: 30, // ferme une connexion inactive après 30s
	connectionTimeout: 10, // attend 10s max pour se connecter

	bigint: true, // utilise les grands nombres (bigint)
});
