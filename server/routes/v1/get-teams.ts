import { db } from "../../db";
import { team } from "../../db/schemas/team";

export async function getTeams(req: Request) {
	// On accepte uniquement GET
	if (req.method !== "GET") {
		return new Response("Méthode non autorisée", { status: 405 });
	}

	try {
		// Une seule requête SQL
		const teams = await db.select().from(team);

		return Response.json(teams);
	} catch {
		return Response.json(
			{ error: "Impossible de récupérer les équipes" },
			{ status: 500 },
		);
	}
}
