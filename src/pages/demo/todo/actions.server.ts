import { asc, eq, not } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/db";
import { demoTodosTable } from "@/db/schema";
import { osBase } from "@/lib/orpc-client";
import ssgUpdate from "@/server/ssg/ssg-update";

function updateTodoSsg() {
  ssgUpdate(["/demo/todo"]);
}

export const getTodos = osBase.handler(async () => {
  const todos = await db
    .select()
    .from(demoTodosTable)
    .orderBy(asc(demoTodosTable.id));
  return todos;
});

export const addTodo = osBase

  .input(z.object({ title: z.string() }))
  .handler(async ({ input }) => {
    await db.insert(demoTodosTable).values(input);
    updateTodoSsg();
  });

export const removeTodo = osBase

  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    await db.delete(demoTodosTable).where(eq(demoTodosTable.id, input.id));
    updateTodoSsg();
  });

export const toggleCompleted = osBase

  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    await db
      .update(demoTodosTable)
      .set({ completed: not(demoTodosTable.completed) })
      .where(eq(demoTodosTable.id, input.id));
    updateTodoSsg();
  });
