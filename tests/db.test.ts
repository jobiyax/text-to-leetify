import { expect, test } from "bun:test";
import { sql } from "../server/config/db";

test("Connexion PostgreSQL", async () => {
	try {
		// Vérifie la connexion
		const result = await sql`SELECT NOW() as time`;

		expect(result).toBeDefined(); // résultat reçu
		expect(result.length).toBeGreaterThan(0); // ligne trouvée
		expect(result[0].time).toBeDefined(); // heure valide
	} catch (error) {
		throw new Error(`Connexion échouée : ${error}`);
	}
});
