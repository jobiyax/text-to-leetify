import { db } from "../../db";
import { team } from "../../db/schemas/team";

export async function addTeam(req: Request) {
	// On bloque directement les mauvaises méthodes
	if (req.method !== "POST") {
		return new Response("Méthode non autorisée", { status: 405 });
	}

	try {
		const { name, logoUrl } = await req.json();

		// Eviter requête inutile vers la base
		if (!name) {
			return Response.json({ error: "Nom est requis" }, { status: 400 });
		}

		// Une seule requête SQL (éviter multi-roundtrips)
		const [createdTeam] = await db
			.insert(team)
			.values({
				name,
				logoUrl: logoUrl ?? null,
			})
			.returning();

		return Response.json(createdTeam);
	} catch {
		// Evite fuite d'infos internes
		return Response.json({ error: "Demande invalide" }, { status: 400 });
	}
}
