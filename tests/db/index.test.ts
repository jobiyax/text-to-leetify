import { describe, expect, test } from "bun:test";
import { sql } from "drizzle-orm";

import { db } from "../../server/db/index";

// Test d'intégration pour vérifier la connexion à PostgreSQL
describe("Connexion à la base de données", () => {
	// Exécute une requête simple sur la base de données
	test("Devrait se connecter à PostgreSQL", async () => {
		const result = await db.execute(sql`SELECT 1`);

		// Vérifie que PostgreSQL répond correctement
		expect(result).toBeDefined();
	});
});
