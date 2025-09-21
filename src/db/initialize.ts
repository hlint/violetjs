import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import fs from "fs-extra";
import { DB_FILE_NAME } from "./connection";
import { db } from "./db";

export default async function dbInitialize() {
  console.log("Migrating DB");
  await fs.ensureFile(DB_FILE_NAME);
  migrate(db, { migrationsFolder: "./drizzle" });
}
