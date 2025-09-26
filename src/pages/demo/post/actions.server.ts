import { asc, eq } from "drizzle-orm";
import { delay } from "es-toolkit";
import { z } from "zod";
import { db } from "@/db/db";
import { demoPostsTable } from "@/db/schema";
import { osBase } from "@/lib/orpc-client";
import updatePageCaches from "@/server/page-generation/update-page-caches";

function updatePostPageCaches(id: number) {
  updatePageCaches(["/demo/post/list", `/demo/post/${id}`]);
}

export const getPosts = osBase.handler(async () => {
  await delay(300);
  const posts = await db
    .select({
      id: demoPostsTable.id,
      title: demoPostsTable.title,
      createdAt: demoPostsTable.createdAt,
    })
    .from(demoPostsTable)
    .orderBy(asc(demoPostsTable.id));
  return posts;
});

export const getPost = osBase
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    await delay(300);
    const post = await db
      .select()
      .from(demoPostsTable)
      .where(eq(demoPostsTable.id, input.id));
    const result = post[0] ? post[0] : null;
    return result;
  });

export const addPost = osBase
  .input(z.object({ title: z.string() }))
  .handler(async ({ input }) => {
    await delay(300);
    const post = await db
      .insert(demoPostsTable)
      .values({
        title: input.title,
        content: "",
      })
      .returning({ id: demoPostsTable.id });
    updatePostPageCaches(post[0].id);
    return post[0];
  });

export const removePost = osBase
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    await delay(300);
    await db.delete(demoPostsTable).where(eq(demoPostsTable.id, input.id));
    updatePostPageCaches(input.id);
  });

export const updatePost = osBase
  .input(z.object({ id: z.number(), title: z.string(), content: z.string() }))
  .handler(async ({ input: { id, title, content } }) => {
    await delay(300);
    await db
      .update(demoPostsTable)
      .set({ title, content })
      .where(eq(demoPostsTable.id, id));
    updatePostPageCaches(id);
  });
