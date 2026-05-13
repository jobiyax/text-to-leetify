import {
	bigserial,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const team = pgTable("team", {
	id: bigserial("id", { mode: "number" }).primaryKey(),

	name: varchar("name", { length: 255 }).notNull(),

	logoUrl: text("logo_url"),

	createdAt: timestamp("created_at", {
		withTimezone: false,
	})
		.notNull()
		.defaultNow(),
});
