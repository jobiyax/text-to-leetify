import { db } from "../db";
import { team } from "../schemas/team";

type TeamBody = {
	name: string;
	logoUrl?: string;
};

export async function addTeam(req: Request) {
	try {
		const { name, logoUrl } = (await req.json()) as TeamBody;

		// Validation
		if (!name) {
			return Response.json({ error: "Nom requis" }, { status: 400 });
		}

		// Création
		const [newTeam] = await db
			.insert(team)
			.values({
				name,
				logoUrl,
			})
			.returning();

		// Réponse
		return Response.json(
			{
				message: "Équipe créée",
				team: newTeam,
			},
			{ status: 201 },
		);
	} catch {
		return Response.json(
			{
				error: "Erreur serveur",
			},
			{ status: 500 },
		);
	}
}
