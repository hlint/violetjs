import { useMemo } from "react";
import { NavLink as RouterNavLink } from "react-router";
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
  const { locale } = useLocale();
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
