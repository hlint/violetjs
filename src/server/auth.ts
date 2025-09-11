import type { ExpressAuthConfig } from "@auth/express";
import GitHub from "@auth/express/providers/github";
import { isDev } from "@/lib/env.server";

export const authConfig: ExpressAuthConfig = {
  trustHost: true,
  providers: [GitHub],
  debug: false,
  logger: {
    error: (message) => {
      if (isDev) {
        console.error(message);
      }
    },
    warn: (message) => {
      if (isDev) {
        console.warn(message);
      }
    },
    debug: (message) => {
      if (isDev) {
        console.debug(message);
      }
    },
  },
};
