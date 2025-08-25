import type { StateCreator } from "zustand";
import { orpc } from "@/lib/orpc-client";
import { getSsrData } from "@/lib/ssr-data";
import type { Session } from "@/lib/type";
import type { RootStoreState } from "./_root";

export type SessionSlice = {
  session: Session & {
    isInitialized: boolean;
    isLoading: boolean;
    initialize: () => void;
    refresh: () => Promise<void>;
  };
};

export const createSessionSlice: StateCreator<
  RootStoreState,
  [["zustand/immer", never]],
  [],
  SessionSlice
> = (set, get) => {
  const ssrSession = getSsrData()?.session;
  return {
    session: {
      loggedIn: false,
      username: "",
      email: "",
      image: "",
      ...ssrSession,
      isInitialized: !!ssrSession,
      isLoading: false,
      initialize: () => {
        const s = get().session;
        if (!s.isLoading && !s.isInitialized) {
          s.refresh();
        }
      },
      refresh: async () => {
        set((d) => {
          d.session.isLoading = true;
        });
        await orpc.session
          .getSession()
          .then((session) => {
            set((d) => {
              Object.assign(d.session, session);
              d.session.isInitialized = true;
            });
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            set((d) => {
              d.session.isLoading = false;
            });
          });
      },
    },
  };
};
