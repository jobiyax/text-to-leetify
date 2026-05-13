import { db } from "../db";
import { team } from "../schemas/team";

type TeamBody = {
	name: string;
	logoUrl?: string;
};

export async function addTeam(req: Request) {
	try {
		const body = (await req.json()) as TeamBody;

		const name = body.name?.trim();
		const logoUrl = body.logoUrl?.trim();

		// Validation minimale
		if (!name) {
			return Response.json(
				{
					error: "Le nom est requis",
				},
				{
					status: 400,
				},
			);
		}

		// Insertion
		const [newTeam] = await db
			.insert(team)
			.values({
				name,
				logoUrl,
			})
			.returning({
				id: team.id,
				name: team.name,
				logoUrl: team.logoUrl,
				createdAt: team.createdAt,
			});

		return Response.json(
			{
				message: "Équipe créée avec succès",
				team: newTeam,
			},
			{
				status: 201,
			},
		);
	} catch (error) {
		console.error("ADD_TEAM_ERROR:", error);

		return Response.json(
			{
				error: "Erreur interne du serveur",
			},
			{
				status: 500,
			},
		);
	}
}
