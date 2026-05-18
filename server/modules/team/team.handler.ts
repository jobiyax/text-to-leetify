import db from "../../config/db";
import { team } from "../../schemas/team";
import { type CreateTeamInput, createTeamSchema } from "./team.validator";

export const createTeamHandler = async (req: Request): Promise<Response> => {
	try {
		// Body request
		const body = await req.json();

		// Validation Zod
		const result = createTeamSchema.safeParse(body);

		// Vérifie les erreurs
		if (!result.success) {
			return Response.json(
				{
					success: false,
					errors: result.error.issues,
				},
				{
					status: 400,
				},
			);
		}

		const data: CreateTeamInput = result.data;

		// Insertion avec Drizzle
		const insertedTeam = await db
			.insert(team)
			.values({
				name: data.name,
				logoUrl: data.logoUrl,
			})

			// Ignore si déjà existant
			.onConflictDoNothing({
				target: team.name,
			})

			// Retourne la ligne créée
			.returning();

		// Vérifie si déjà existante
		if (insertedTeam.length === 0) {
			return Response.json(
				{
					success: false,
					message: "Cette équipe existe déjà",
				},
				{
					status: 409,
				},
			);
		}

		// Succès
		return Response.json(
			{
				success: true,
				data: insertedTeam[0],
			},
			{
				status: 201,
			},
		);
	} catch (error) {
		console.error(error);

		return Response.json(
			{
				success: false,
				message: "Erreur serveur",
			},
			{
				status: 500,
			},
		);
	}
};
