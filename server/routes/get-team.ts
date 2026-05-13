import { desc } from "drizzle-orm";

import { db } from "../db";
import { team } from "../schemas/team";

export async function getTeams() {
	try {
		const teams = await db
			.select({
				// Colonnes nécessaires uniquement
				id: team.id,
				name: team.name,
				logoUrl: team.logoUrl,
				createdAt: team.createdAt,
			})
			.from(team)

			// Optimisé avec l'index created_at
			.orderBy(desc(team.createdAt))

			// Limite les données retournées
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
		// Log serveur
		console.error("GET_TEAMS_ERROR:", error);

		return Response.json(
			{
				error: "Internal server error",
			},
			{
				status: 500,
			},
		);
	}
}
