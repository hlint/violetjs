import { useEffect } from "react";
import { Outlet } from "react-router";
import { useSessionStore } from "@/store/_root";

export default function RootLayout() {
  const initialize = useSessionStore((s) => s.initialize);
  useEffect(() => {
    initialize();
  }, [initialize]);
  return <Outlet />;
}
