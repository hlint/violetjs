import { type To, useNavigate } from "react-router";
import { useThemeStore } from "@/store/_root";

export function useNavigateTransition() {
  const navigate = useNavigate();
  const pageTransitionAnimation = useThemeStore(
    (s) => s.pageTransitionAnimation
  );
  return (to: To) => {
    pageTransitionAnimation(() => {
      navigate(to);
    });
  };
}
