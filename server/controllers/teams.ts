import { desc } from "drizzle-orm";

import { db } from "../config/db";
import { team } from "../schemas/team";

export async function getTeams() {
	try {
		// Dernières équipes créées
		const teams = await db
			.select({
				id: team.id,
				name: team.name,
				logoUrl: team.logoUrl,
				createdAt: team.createdAt,
			})
			.from(team)
			.orderBy(desc(team.createdAt))
			.limit(20);

		return Response.json(
			{
				teams,
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		console.error("GET_TEAMS_ERROR", error);

		return Response.json(
			{
				error: "Erreur serveur",
			},
			{
				status: 500,
			},
		);
	}
}
