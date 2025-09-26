import { asc, eq, not } from "drizzle-orm";
import { delay } from "es-toolkit";
import { z } from "zod";
import { db } from "@/db/db";
import { demoTodosTable } from "@/db/schema";
import { osBase } from "@/lib/orpc-client";
import updatePageCaches from "@/server/page-generation/update-page-caches";

function updateTodoSsg() {
  updatePageCaches(["/demo/todo"]);
}

export const getTodos = osBase.handler(async () => {
  await delay(300);
  const todos = await db
    .select()
    .from(demoTodosTable)
    .orderBy(asc(demoTodosTable.id));
  return todos;
});

export const addTodo = osBase
  .input(z.object({ title: z.string() }))
  .handler(async ({ input }) => {
    await delay(300);
    await db.insert(demoTodosTable).values(input);
    updateTodoSsg();
  });

export const removeTodo = osBase
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    await delay(300);
    await db.delete(demoTodosTable).where(eq(demoTodosTable.id, input.id));
    updateTodoSsg();
  });

export const toggleCompleted = osBase
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    await delay(300);
    await db
      .update(demoTodosTable)
      .set({ completed: not(demoTodosTable.completed) })
      .where(eq(demoTodosTable.id, input.id));
    updateTodoSsg();
  });
