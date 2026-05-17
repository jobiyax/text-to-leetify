import { db } from "../config/db";
import { team } from "../schemas/team";
import { createTeamSchema } from "../validators/team";

export async function createTeam(request: Request): Promise<Response> {
	try {
		// Lecture du body
		const body = await request.json();

		// Validation Zod
		const result = createTeamSchema.safeParse(body);

		if (!result.success) {
			return Response.json(
				{
					success: false,
					errors: result.error.issues,
				},
				{ status: 400 },
			);
		}

		// Insertion en base
		await db.insert(team).values({
			name: result.data.name,
			logoUrl: result.data.logoUrl,
		});

		// Réponse OK
		return Response.json(
			{
				success: true,
				message: "Équipe créée",
			},
			{ status: 201 },
		);
	} catch (error) {
		// Log erreur serveur
		console.error(error);

		return Response.json(
			{
				success: false,
				message: error instanceof Error ? error.message : "Erreur serveur",
			},
			{ status: 500 },
		);
	}
}

// GET teams (liste)
export async function getTeams(): Promise<Response> {
	try {
		// Récupération des équipes
		const teams = await db
			.select({
				id: team.id,
				name: team.name,
				logoUrl: team.logoUrl,
			})
			.from(team)
			.orderBy(team.name);

		// Conversion BigInt en String
		const safeTeams = teams.map((t) => ({
			...t,
			id: t.id.toString(),
		}));

		return Response.json({
			success: true,
			data: safeTeams,
		});
	} catch (error) {
		console.error(error);

		return Response.json(
			{
				success: false,
				message: "Erreur serveur",
			},
			{ status: 500 },
		);
	}
}
