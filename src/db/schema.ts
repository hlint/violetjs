import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const demoTodosTable = sqliteTable("demo_todos", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  completed: int({ mode: "boolean" }).notNull().default(false),
});

export type DemoTodo = typeof demoTodosTable.$inferSelect;
export type DemoTodoInsert = typeof demoTodosTable.$inferInsert;
