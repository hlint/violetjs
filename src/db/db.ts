import { Database } from "bun:sqlite";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { DB_FILE_NAME } from "./connection";
import { demoTodosTable } from "./schema";

export const db = drizzle({
  client: new Database(DB_FILE_NAME),
  schema: { demoTodosTable },
});
