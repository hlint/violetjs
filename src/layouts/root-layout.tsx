import { Outlet } from "react-router";
import HeadMeta from "@/components/app/head-meta";

export default function RootLayout() {
  return (
    <>
      <HeadMeta
        title="VioletJS"
        description="Volitejs is a full-stack ReactJS development framework powered by Vite, featuring SSR and SSG support, along with built-in database, authentication, oRPC, and other feature integrations."
      />
      <Outlet />
    </>
  );
}
