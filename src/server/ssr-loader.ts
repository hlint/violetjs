import { call } from "@orpc/server";
import type { Session, ThemeColorMode, ThemePalette } from "@/lib/types";
import { getTodos } from "@/pages/demo/todo/actions.server";
import type { SsrData } from "../lib/ssr-data";

export type SsrLoaderContext = {
  session: Session;
  themeColorMode: ThemeColorMode;
  themeIsDark: boolean;
  themePalette: ThemePalette;
};

export default async function ssrLoader(
  url: string,
  context: SsrLoaderContext
): Promise<Partial<SsrData>> {
  const osOptions = { context };
  const ssrData = {} as Partial<SsrData>;
  ssrData.session = context.session;
  ssrData.themeColorMode = context.themeColorMode;
  ssrData.themeIsDark = context.themeIsDark;
  ssrData.themePalette = context.themePalette;
  const urlObj = new URL(url, "http://localhost");
  if (urlObj.pathname === "/demo/todo") {
    ssrData.demo_todos = await call(getTodos, null, osOptions).catch(
      () => undefined
    );
  }
  return ssrData;
}
