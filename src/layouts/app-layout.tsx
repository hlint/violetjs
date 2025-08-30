import { NavLink, Outlet } from "react-router";
import { ThemeModeSwitcher } from "@/components/app/theme/theme-mode-switcher";
import { ThemePaletteSwitcher } from "@/components/app/theme/theme-palette-switcher";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
    <main className="flex flex-col h-screen w-screen p-2">
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
              <NavLink to="/">Home</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Demo</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <NavLink to="/demo/todo">Todo</NavLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <NavLink to="/demo/auth-required">Auth Required</NavLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <NavLink to="/demo/error-handling">Error Handling</NavLink>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <NavLink to="/about">About</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex-1" />
      <ThemePaletteSwitcher />
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
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
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
