import { Outlet } from "react-router";
import { useSession } from "@/hooks/use-session";

export default function SignInGuard() {
  const session = useSession();
  if (!session) {
    return null;
  }
  if (!session.loggedIn) {
    return <div>Sign In Required</div>;
  }
  return <Outlet />;
}
