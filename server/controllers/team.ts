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
