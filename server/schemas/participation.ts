import {
	integer,
	pgTable,
	serial,
	timestamp,
	unique,
} from "drizzle-orm/pg-core";

import { competition } from "./competition";
import { team } from "./team";

export const participation = pgTable(
	"participation",
	{
		id: serial("id").primaryKey(),

		// Référence vers competition
		competitionId: integer("competition_id")
			.notNull()
			.references(() => competition.id, {
				onDelete: "cascade",
			}),

		// Référence vers team
		teamId: integer("team_id")
			.notNull()
			.references(() => team.id, {
				onDelete: "cascade",
			}),

		createdAt: timestamp("created_at").defaultNow().notNull(),
	},

	// Empêche les doublons
	(table) => ({
		competitionTeamUnique: unique("participation_competition_team_unique").on(
			table.competitionId,
			table.teamId,
		),
	}),
);
