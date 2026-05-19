import { eq } from "drizzle-orm";
import db from "../../config/db";
import { edition } from "../../schemas/edition";
import { participation } from "../../schemas/participation";
import { team } from "../../schemas/team";

type AddTeamsToEditionInput = {
	editionId: number;
	teamIds: number[];
};

// Ajoute plusieurs équipes dans une édition
export const addTeamsToEditionService = async (
	data: AddTeamsToEditionInput,
) => {
	const values = data.teamIds.map((teamId) => ({
		editionId: data.editionId,
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

// Récupère les équipes d'une édition
export const getEditionTeamsService = async (editionId: number) => {
	const teams = await db
		.select({
			participationId: participation.id,

			edition: {
				id: edition.id,
				number: edition.number,
			},

			team: {
				id: team.id,
				name: team.name,
				logoUrl: team.logoUrl,
			},

			createdAt: participation.createdAt,
		})
		.from(participation)

		// Jointure edition
		.innerJoin(edition, eq(participation.editionId, edition.id))

		// Jointure team
		.innerJoin(team, eq(participation.teamId, team.id))

		// Filtre par édition
		.where(eq(participation.editionId, editionId));

	return teams;
};
