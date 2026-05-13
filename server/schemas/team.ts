import {
	bigserial,
	index,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";

export const team = pgTable(
	"team",
	{
		id: bigserial("id", { mode: "number" }).primaryKey(),

		name: varchar("name", { length: 255 }).notNull(),

		logoUrl: text("logo_url"),

		createdAt: timestamp("created_at", {
			withTimezone: false,
		})
			.notNull()
			.defaultNow(),
	},
	(table) => ({
		// Recherche rapide par nom
		nameIdx: index("team_name_idx").on(table.name),

		// Empêche les doublons + index performant
		nameUniqueIdx: uniqueIndex("team_name_unique_idx").on(table.name),

		// Optimise les ORDER BY created_at DESC
		createdAtIdx: index("team_created_at_idx").on(table.createdAt),
	}),
);
