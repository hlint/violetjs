import { call } from "@orpc/server";
import type { Params } from "react-router";
import { getPost, getPosts } from "@/pages/demo/post/actions.server";
import { getTodos } from "@/pages/demo/todo/actions.server";
import { langs } from "./components/app/i18n/defines";
import type { OsContext } from "./lib/orpc-client";
import type { SsrData } from "./lib/ssr-data";

export const serverRoutes: ServerRouteObject[] = langs.map((lang) => ({
  path: lang,
  ssrHandle: async ({ ssrData, url }) => {
    ssrData.url = url;
    return true;
  },
  children: [
    {
      path: "auth",
      children: [
        { path: "sign-in", ssg: true },
        { path: "sign-out", ssg: true },
      ],
    },
    {
      path: "demo",
      children: [
        {
          path: "todo",
          ssg: true,
          ssrHandle: async ({ ssrData, mainPath }) => {
            ssrData.swrFallback[mainPath] = await call(getTodos, null);
          },
        },
        {
          path: "post/list",
          isr: true,
          ssg: true,
          ssrHandle: async ({ ssrData, mainPath }) => {
            ssrData.swrFallback[mainPath] = await call(getPosts, null);
          },
        },
        {
          path: "post/:id",
          ssg: true,
          isr: true,
          ssgParams: async () => {
            const posts = await call(getPosts, null);
            return { id: posts.map((post) => post.id.toString()) };
          },
          ssrHandle: async ({ params: { id }, ssrData, mainPath }) => {
            ssrData.swrFallback[mainPath] = await call(getPost, {
              id: Number(id),
            });
          },
        },
      ],
    },
  ],
}));

export type ServerRouteObject = {
  path?: string;
  children?: ServerRouteObject[];
  ssg?: boolean; // enable ssg
  ssgParams?: // segments with dynamic params
  Record<string, string[]> | (() => Promise<Record<string, string[]>>);
  isr?: boolean; // enable isr
  isrTtl?: number; // default 600s
  ssrHandle?: (_: {
    langPath: string;
    mainPath: string;
    url: string;
    params: Params<string>;
    ssrData: SsrData;
    osOptions: { context: OsContext };
    context: Record<string, unknown>;
    // biome-ignore lint/suspicious/noConfusingVoidType: Return true or void
  }) => Promise<true | void>;
  index?: boolean;
};
