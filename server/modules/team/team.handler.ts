import { asc } from "drizzle-orm";
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

// Récupère toutes les équipes
export const getTeamsHandler = async (): Promise<Response> => {
	try {
		// Liste des équipes
		const teams = await db
			.select({
				id: team.id,
				name: team.name,
				logoUrl: team.logoUrl,
				createdAt: team.createdAt,
			})
			.from(team)

			// Trie par nom
			.orderBy(asc(team.name))

			// Pagination simple
			.limit(10)
			.offset(0);

		// Succès
		return Response.json(
			{
				success: true,
				data: teams,
			},
			{
				status: 200,
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
