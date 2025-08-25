import { Outlet } from "react-router";
import { useRootStore } from "@/store/_root";

export default function SignInGuard() {
  const initialize = useRootStore((s) => s.session.initialize);
  const loggedIn = useRootStore((s) => s.session.loggedIn);
  if (!initialize) {
    return null;
  }
  if (!loggedIn) {
    return <div>Sign In Required</div>;
  }
  return <Outlet />;
}
