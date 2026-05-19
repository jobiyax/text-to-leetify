import db from "../../config/db";
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
