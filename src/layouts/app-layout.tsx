import { Outlet } from "react-router";
import { NavLinkTransition } from "@/components/app/navigate-transition";
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
    <main className="flex flex-col h-screen p-2">
      <NavMenu />
      <div className="flex-1 flex items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
}

function NavMenu() {
  return (
    <nav className="flex-0 flex items-center">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <NavLinkTransition to="/">Home</NavLinkTransition>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Demo</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <NavLinkTransition to="/demo/todo">Todo</NavLinkTransition>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <NavLinkTransition to="/demo/auth-required">
                      Auth Required
                    </NavLinkTransition>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <NavLinkTransition to="/demo/error-handling">
                      Error Handling
                    </NavLinkTransition>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex-1" />
      <ThemePaletteModalSwitcher />
      <ThemeModeSwitcher />
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
          <a href="/auth/sign-in">Switch Account</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/auth/sign-out">Sign Out</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant="ghost">
      <a href="/auth/sign-in">Sign In</a>
    </Button>
  );
}
