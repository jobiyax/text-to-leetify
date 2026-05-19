import {
	integer,
	pgTable,
	serial,
	timestamp,
	unique,
} from "drizzle-orm/pg-core";

import { edition } from "./edition";
import { team } from "./team";

export const participation = pgTable(
	"participation",
	{
		id: serial("id").primaryKey(),

		// Référence vers edition
		editionId: integer("edition_id")
			.notNull()
			.references(() => edition.id, {
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
		editionTeamUnique: unique("participation_edition_team_unique").on(
			table.editionId,
			table.teamId,
		),
	}),
);
