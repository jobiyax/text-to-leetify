import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error("DATABASE_URL n'est pas défini");
}

// Connexion PostgreSQL
const client = postgres(DATABASE_URL);

// Instance Drizzle
export const db = drizzle(client);
