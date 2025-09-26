import { useMemo } from "react";
import { NavLink as RouterNavLink, useNavigate } from "react-router";
import { useLocale } from "./i18n/use-locale";
import { useNavigateTransition } from "./navigate-transition";

export default function AppLink({
  children,
  onClick,
  to,
  animate,
  skipLocale,
  ...props
}: Omit<React.ComponentProps<typeof RouterNavLink>, "to"> & {
  to: string;
  skipLocale?: boolean;
  animate?: boolean;
}) {
  const navigate = useNavigateTransition();
  const { lang: locale } = useLocale();
  const toFixed = useMemo(() => {
    if (skipLocale || !to.startsWith("/")) {
      return to;
    }
    return `/${locale}${to}`;
  }, [to, locale, skipLocale]);
  return (
    <RouterNavLink
      {...props}
      to={toFixed}
      onClick={(e) => {
        onClick?.(e);
        if (animate) {
          e.preventDefault();
          navigate(toFixed);
        }
      }}
    >
      {children}
    </RouterNavLink>
  );
}

export function useAppNavigate() {
  const navigateTransition = useNavigateTransition();
  const navigate = useNavigate();
  const { lang: locale } = useLocale();
  return (
    to: string,
    options?: { animate?: boolean; skipLocale?: boolean },
  ) => {
    const toFixed = (() => {
      if (options?.skipLocale || !to.startsWith("/")) {
        return to;
      }
      return `/${locale}${to}`;
    })();
    if (options?.animate) {
      navigateTransition(toFixed);
    } else {
      navigate(toFixed);
    }
  };
}
