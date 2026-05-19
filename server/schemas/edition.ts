import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

import { competition } from "./competition";

export const edition = pgTable("edition", {
	id: serial("id").primaryKey(),

	// Référence vers competition
	competitionId: integer("competition_id")
		.notNull()
		.references(() => competition.id, {
			onDelete: "cascade",
		}),

	// Numéro de l'édition
	number: integer("number").notNull(),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});
