import type { DemoTodo } from "@/db/schema";
import type { Session } from "./types";

export type SsrData = {
  session: Session;
  demo_todos: DemoTodo[];
};

export const refSsrData = {
  current: {} as Partial<SsrData> | undefined,
};

export function getSsrData() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return refSsrData.current;
  }
  return window.__SSR_DATA__;
}
