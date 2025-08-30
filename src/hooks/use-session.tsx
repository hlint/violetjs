import { createContext, useContext } from "react";
import useSWR from "swr";
import { orpc } from "@/lib/orpc-client";
import type { Session } from "@/lib/types";

const Context = createContext<Session | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSWR("session", orpc.session.getSession);
  return <Context.Provider value={session}>{children}</Context.Provider>;
}

export function useSession() {
  return useContext(Context);
}
