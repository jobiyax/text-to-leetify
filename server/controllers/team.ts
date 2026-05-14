import { db } from "../config/db";
import { team } from "../schemas/team";
import { createTeamSchema } from "../validators/team";

export async function createTeam(req: Request) {
	try {
		const body: unknown = await req.json();

		// Validation Zod
		const result = createTeamSchema.safeParse(body);

		if (!result.success) {
			return Response.json(
				{
					error: "Validation échouée",
					details: result.error.flatten(),
				},
				{
					status: 400,
				},
			);
		}

		const { name, logoUrl } = result.data;

		// Insertion DB
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
				message: "Équipe créée",
				team: newTeam,
			},
			{
				status: 201,
			},
		);
	} catch (error) {
		console.error("CREATE_TEAM_ERROR", error);

		return Response.json(
			{
				error: "Erreur serveur",
			},
			{
				status: 500,
			},
		);
	}
}
