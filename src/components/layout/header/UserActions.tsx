
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfilePanel } from "../../profile/ProfilePanel";

export function UserActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative hidden md:flex max-w-md">
        <input 
          type="search" 
          placeholder="Search manga..." 
          className="pl-10 pr-4 py-2 text-sm rounded-md border border-input bg-background"
        />
        <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
      </div>

      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <ProfilePanel />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
