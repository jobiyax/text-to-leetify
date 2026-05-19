import { eq } from "drizzle-orm";
import db from "../../config/db";
import { competition } from "../../schemas/competition";
import { edition } from "../../schemas/edition";
import type { CreateEditionInput } from "./edition.validator";

// Création d'une édition
export const createEditionService = async (data: CreateEditionInput) => {
	const insertedEdition = await db
		.insert(edition)
		.values({
			competitionId: data.competitionId,
			number: data.number,
		})
		.returning();

	return insertedEdition;
};

// Récupère toutes les éditions
export const getEditionsService = async () => {
	const editions = await db
		.select({
			id: edition.id,

			competition: {
				id: competition.id,
				name: competition.name,
				logoUrl: competition.logoUrl,
			},

			number: edition.number,
			createdAt: edition.createdAt,
		})
		.from(edition)

		.innerJoin(competition, eq(edition.competitionId, competition.id));

	return editions;
};
