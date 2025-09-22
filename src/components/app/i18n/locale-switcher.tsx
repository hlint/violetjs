import { LanguagesIcon } from "lucide-react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { locales } from "./defines";
import { useLocale } from "./use-locale";

export default function LocaleSwitcher() {
  const { locale, path } = useLocale();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <LanguagesIcon />{" "}
          {locales.find((localeItem) => localeItem.code === locale)?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map((localeItem) => (
          <DropdownMenuItem
            key={localeItem.code}
            onClick={() => {
              navigate(`/${localeItem.code}${path}`);
            }}
            className={cn(localeItem.code === locale && "text-primary")}
          >
            {localeItem.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
