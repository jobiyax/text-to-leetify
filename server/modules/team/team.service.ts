import { asc } from "drizzle-orm";
import db from "../../config/db";
import { team } from "../../schemas/team";
import type { CreateTeamInput } from "./team.validator";

// Création d'une équipe
export const createTeamService = async (data: CreateTeamInput) => {
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

	return insertedTeam;
};

// Récupère toutes les équipes
export const getTeamsService = async () => {
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

	return teams;
};
