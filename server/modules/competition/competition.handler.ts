import { asc } from "drizzle-orm";
import db from "../../config/db";
import { competition } from "../../schemas/competition";
import {
	type CreateCompetitionInput,
	createCompetitionSchema,
} from "./competition.validator";

export const createCompetitionHandler = async (
	req: Request,
): Promise<Response> => {
	try {
		// Body request
		const body = await req.json();

		// Validation Zod
		const result = createCompetitionSchema.safeParse(body);

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

		const data: CreateCompetitionInput = result.data;

		// Insertion avec Drizzle
		const insertedCompetition = await db
			.insert(competition)
			.values({
				name: data.name,
				logoUrl: data.logoUrl,
			})

			// Ignore si déjà existante
			.onConflictDoNothing({
				target: competition.name,
			})

			// Retourne la ligne créée
			.returning();

		// Vérifie si déjà existante
		if (insertedCompetition.length === 0) {
			return Response.json(
				{
					success: false,
					message: "Cette compétition existe déjà",
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
				data: insertedCompetition[0],
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

// Récupère toutes les compétitions
export const getCompetitionsHandler = async (): Promise<Response> => {
	try {
		// Liste des compétitions
		const competitions = await db
			.select({
				id: competition.id,
				name: competition.name,
				logoUrl: competition.logoUrl,
				createdAt: competition.createdAt,
			})
			.from(competition)

			// Trie par nom
			.orderBy(asc(competition.name))

			// Pagination simple
			.limit(10)
			.offset(0);

		// Succès
		return Response.json(
			{
				success: true,
				data: competitions,
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
