import { call } from "@orpc/server";
import type { OsContext } from "@/lib/orpc-client";
import { getTodos } from "@/pages/demo/todo/actions.server";
import type { SsrData } from "../lib/ssr-data";

export default async function ssrLoader(
  url: string,
  context: OsContext,
): Promise<Partial<SsrData>> {
  const osOptions = { context };
  const ssrData = {} as Partial<SsrData>;
  ssrData.session = context.session;
  const urlObj = new URL(url, "http://localhost");
  if (urlObj.pathname === "/demo/todo") {
    ssrData.demo_todos = await call(getTodos, null, osOptions).catch(
      () => undefined,
    );
  }
  return ssrData;
}
