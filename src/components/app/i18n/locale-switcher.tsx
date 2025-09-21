import { LanguagesIcon } from "lucide-react";
import { useLocale } from "@/components/app/i18n/use-locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { locales } from "./defines";

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <LanguagesIcon />{" "}
          {locales.find((localeItem) => localeItem.code === locale)?.name ||
            "English"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map((localeItem) => (
          <DropdownMenuItem
            key={localeItem.code}
            onClick={() => setLocale(localeItem.code)}
            className={cn(localeItem.code === locale && "text-primary")}
          >
            {localeItem.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
