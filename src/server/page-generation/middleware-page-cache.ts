import { differenceInSeconds } from "date-fns";
import type { RequestHandler } from "express";
import fs from "fs-extra";
import { matchRoutes, type RouteObject } from "react-router";
import z from "zod";
import { type ServerRouteObject, serverRoutes } from "@/routes-server";
import updatePageCaches from "./update-page-caches";
import { getFullpathFromUrl, pathnameToPageCacheFilepath } from "./utils";

export const middlewarePageCache: RequestHandler = async (req, res, next) => {
  const url = req.originalUrl;
  const fullpath = getFullpathFromUrl(url);
  const pageCache = await getPageCache(fullpath, () => {
    updatePageCaches([fullpath], true);
  });
  if (pageCache) {
    res.send(pageCache);
    return;
  }
  next();
};

async function getPageCache(fullpath: string, onIsrMiss: () => void) {
  const filepath = pathnameToPageCacheFilepath(fullpath);
  const pageCache = await fs.readFile(filepath, "utf-8").catch(() => null);
  const routeObject = getRouteObjectFromFullpath(fullpath);
  if (pageCache) {
    if (routeObject?.isr) {
      const meta = parseMetaFromPageCache(pageCache);
      if (meta?.generatedAt) {
        const ttl = routeObject.isrTtl ?? 600;
        if (differenceInSeconds(new Date(), new Date(meta.generatedAt)) < ttl) {
          return pageCache;
        } else {
          onIsrMiss();
        }
      }
    } else {
      return pageCache;
    }
  }
  if (routeObject?.isr) {
    onIsrMiss();
  }
  return null;
}

function parseMetaFromPageCache(pageCache: string) {
  const meta = pageCache.match(/<!--(.*?)-->/s);
  if (meta) {
    try {
      return z
        .object({
          generatedAt: z.string(),
        })
        .parse(JSON.parse(meta[1]));
    } catch (_error) {}
  }
  return null;
}

function getRouteObjectFromFullpath(fullpath: string) {
  const matches = matchRoutes(serverRoutes as RouteObject[], fullpath);
  if (matches) {
    return matches[matches.length - 1].route as ServerRouteObject;
  }
  return null;
}
