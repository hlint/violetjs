import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const demoTodosTable = sqliteTable("demo_todos", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  completed: int({ mode: "boolean" }).notNull().default(false),
});

export type DemoTodo = typeof demoTodosTable.$inferSelect;
export type DemoTodoInsert = typeof demoTodosTable.$inferInsert;

export const demoPostsTable = sqliteTable("demo_posts", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  content: text().notNull(),
  createdAt: text()
    .notNull()
    .$default(() => {
      return new Date().toISOString();
    }),
});

export type DemoPost = typeof demoPostsTable.$inferSelect;
export type DemoPostInsert = typeof demoPostsTable.$inferInsert;
