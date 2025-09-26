import { cloneDeep, isFunction } from "es-toolkit";
import { langs } from "@/components/app/i18n/defines";
import type { ServerRouteObject } from "@/routes-server";

export function mainPath2langPath(basePath: string) {
  return langs.map((lang) => `/${lang}${basePath}`);
}

export function mainPaths2langPaths(basePaths: string[]) {
  return basePaths.flatMap(mainPath2langPath);
}

export async function getSsgUrlsFromRoutes(routes: ServerRouteObject[]) {
  // traverse routes and collect context
  type TraverseRouteContext = {
    paths: string[];
    params: Record<string, string[]>;
  };
  const r1: TraverseRouteContext[] = [];
  const traverseRoute = async (
    route: ServerRouteObject,
    c: Readonly<TraverseRouteContext>,
  ) => {
    const currentContext = cloneDeep(c);
    currentContext.paths.push(route.path ?? "");
    if (isFunction(route.ssgParams)) {
      Object.assign(currentContext.params, await route.ssgParams());
    } else if (route.ssgParams) {
      Object.assign(currentContext.params, route.ssgParams);
    }
    if (route.children) {
      for (const child of route.children) {
        await traverseRoute(child, currentContext);
      }
    } else if (route.ssg) {
      r1.push(currentContext);
    }
  };
  for (const route of routes) {
    await traverseRoute(route, { paths: [], params: {} });
  }

  // normalize paths
  for (const context of r1) {
    context.paths = context.paths.join("/").split("/").filter(Boolean);
  }

  // generate urls for each context
  const urlAssamble = (c: TraverseRouteContext) => {
    let urls: string[] = [""];
    for (const segment of c.paths) {
      const matchedParams = segment.match(/^:(\w+)$/);
      if (matchedParams) {
        const [, paramName] = matchedParams;
        const params = c.params[paramName];
        urls = urls.flatMap((url) => params.map((param) => `${url}/${param}`));
      } else {
        urls = urls.map((url) => `${url}/${segment}`);
      }
    }
    return urls;
  };
  const r2 = r1.flatMap(urlAssamble);
  return r2;
}

export function pathnameToPageCacheFilepath(pathname: string) {
  return `./runtime/pages/${pathname.replace("/", "") || "index"}.html`;
}

export function getFullpathFromUrl(url: string) {
  try {
    return new URL(url, "http://localhost").pathname;
  } catch (_error) {
    return url;
  }
}
