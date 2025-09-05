import { NavLink, type To, useNavigate } from "react-router";
import { useThemeStore } from "@/store/_root";

export function NavLinkTransition(props: React.ComponentProps<typeof NavLink>) {
  const navigate = useNavigateTransition();
  return (
    <NavLink
      {...props}
      onClick={(e) => {
        e.preventDefault();
        navigate(props.to);
      }}
    />
  );
}

export function useNavigateTransition() {
  const navigate = useNavigate();
  const pageTransitionAnimation = useThemeStore(
    (s) => s.pageTransitionAnimation,
  );
  return (to: To) => {
    pageTransitionAnimation(() => {
      navigate(to);
    });
  };
}
