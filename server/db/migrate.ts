import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

await migrate(db, {
	migrationsFolder: "./drizzle",
});

console.log("Migration terminée");
process.exit(0);
