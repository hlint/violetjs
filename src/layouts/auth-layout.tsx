import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex h-screen items-center justify-center bg-muted">
      <Outlet />
    </div>
  );
}
