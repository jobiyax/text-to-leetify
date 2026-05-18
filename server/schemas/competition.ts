import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const competition = pgTable("competition", {
	id: serial("id").primaryKey(),

	name: varchar("name", { length: 50 }).notNull().unique(),

	logoUrl: text("logo_url"),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});
