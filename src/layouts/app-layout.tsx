import { Trans } from "@lingui/react/macro";
import { Outlet } from "react-router";
import AppLink from "@/components/app/app-link";
import { ButtonInstallPWA } from "@/components/app/button-install-pwa";
import AppErrorBoundary from "@/components/app/error-boundary";
import LocaleSwitcher from "@/components/app/i18n/locale-switcher";
import { ThemeModeSwitcher } from "@/components/app/theme/theme-mode-switcher";
import { ThemePaletteModalSwitcher } from "@/components/app/theme/theme-palette-modal-switcher";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useSession } from "@/hooks/use-session";

export default function AppLayout() {
  return (
    <main className="flex flex-col min-h-svh p-2">
      <NavMenu />
      <div className="flex-1 flex items-center justify-center">
        <AppErrorBoundary>
          <Outlet />
        </AppErrorBoundary>
      </div>
    </main>
  );
}

function NavMenu() {
  return (
    <nav className="flex-0 flex items-center gap-1">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <AppLink to="/" animate>
                <Trans>Home</Trans>
              </AppLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Trans>Demo</Trans>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <AppLink to="/demo/todo">
                      <Trans>Todo</Trans>
                    </AppLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <AppLink to="/demo/auth-required">
                      <Trans>Auth Required</Trans>
                    </AppLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <AppLink to="/demo/error-handling">
                      <Trans>Error Handling</Trans>
                    </AppLink>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex-1" />
      <LocaleSwitcher />
      <ThemeModeSwitcher />
      <ThemePaletteModalSwitcher />
      <ButtonInstallPWA />
      <UserMenu />
    </nav>
  );
}

function UserMenu() {
  const session = useSession();
  if (!session) {
    return null;
  }
  return session.loggedIn ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Avatar>
            <AvatarImage src={session.image} alt={session.username} />
          </Avatar>
          <span>{session.username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <AppLink to="/auth/sign-in">
            <Trans>Switch Account</Trans>
          </AppLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AppLink to="/auth/sign-out">
            <Trans>Sign Out</Trans>
          </AppLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant="ghost">
      <AppLink to="/auth/sign-in">
        <Trans>Sign In</Trans>
      </AppLink>
    </Button>
  );
}
