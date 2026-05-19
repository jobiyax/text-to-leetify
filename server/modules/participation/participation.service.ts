import { eq } from "drizzle-orm";
import db from "../../config/db";
import { competition } from "../../schemas/competition";
import { participation } from "../../schemas/participation";
import { team } from "../../schemas/team";

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

// Récupère les équipes d'une compétition
export const getCompetitionTeamsService = async (competitionId: number) => {
	const teams = await db
		.select({
			participationId: participation.id,

			competition: {
				id: competition.id,
				name: competition.name,
				logoUrl: competition.logoUrl,
			},

			team: {
				id: team.id,
				name: team.name,
				logoUrl: team.logoUrl,
			},

			createdAt: participation.createdAt,
		})
		.from(participation)

		.innerJoin(competition, eq(participation.competitionId, competition.id))

		.innerJoin(team, eq(participation.teamId, team.id))

		.where(eq(participation.competitionId, competitionId));

	return teams;
};
