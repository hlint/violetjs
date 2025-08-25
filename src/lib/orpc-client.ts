import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { os, type RouterClient } from "@orpc/server";
import type { OrpcRouter } from "@/server/orpc-router";
import type { Session } from "./type";

const link = new RPCLink({
  url: () => {
    if (typeof window === "undefined") {
      throw new Error("RPCLink is not allowed on the server side.");
    }

    return `${window.location.origin}/rpc`;
  },
  headers: { Authorization: "Bearer token" },
});

export const orpc: RouterClient<OrpcRouter> = createORPCClient(link);

export type OsContext = { session?: Session };

export const osBase = os.$context<OsContext>().errors({
  RATE_LIMITED: {
    status: 429,
    code: "RATE_LIMITED",
    message: "Rate limit exceeded",
  },
  UNAUTHORIZED: {
    status: 401,
    code: "UNAUTHORIZED",
    message: "Unauthorized",
  },
});

export const middlewareLoggedInRequired = osBase.middleware(
  async ({ context, errors, next }) => {
    if (!context.session?.loggedIn) {
      throw errors.UNAUTHORIZED();
    }
    return next();
  },
);
