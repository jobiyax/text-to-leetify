import { migrate } from "drizzle-orm/bun-sql/migrator";
import { db } from "../server/config/db";

await migrate(db, {
	migrationsFolder: "./drizzle",
});

console.log("Migrations appliquées");
