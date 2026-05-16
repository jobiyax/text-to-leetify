import { SQL } from "bun";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL manque");
}

export const sql = new SQL({
	url: databaseUrl,

	// Nombre maximum de connexions simultanées
	max: 20,

	// Temps avant de fermer une connexion inactive (en secondes)
	idleTimeout: 30,

	// Durée maximale de vie d’une connexion (en secondes)
	maxLifetime: 3600,

	// Temps d’attente avant échec de connexion (en secondes)
	connectionTimeout: 10,

	// Active les requêtes préparées pour de meilleures performances
	prepare: true,
});

export default sql;
