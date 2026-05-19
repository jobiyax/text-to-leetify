import db from "../../config/db";
import { participation } from "../../schemas/participation";

type AddTeamsToCompetitionInput = {
	competitionId: number;
	teamIds: number[];
};

// Ajoute plusieurs équipes dans une compétition
export const addTeamsToCompetitionService = async (
	data: AddTeamsToCompetitionInput,
) => {
	const values = data.teamIds.map((teamId) => ({
		competitionId: data.competitionId,
		teamId,
	}));

	const insertedParticipations = await db
		.insert(participation)
		.values(values)

		// Ignore les doublons
		.onConflictDoNothing()

		.returning();

	return insertedParticipations;
};
