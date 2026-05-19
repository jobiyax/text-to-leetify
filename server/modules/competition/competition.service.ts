import { asc } from "drizzle-orm";
import db from "../../config/db";
import { competition } from "../../schemas/competition";
import type { CreateCompetitionInput } from "./competition.validator";

// Création d'une compétition
export const createCompetitionService = async (
	data: CreateCompetitionInput,
) => {
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

	return insertedCompetition;
};

// Récupère toutes les compétitions
export const getCompetitionsService = async () => {
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

	return competitions;
};
