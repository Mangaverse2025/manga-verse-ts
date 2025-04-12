
import { Search } from "lucide-react";
import { AppLogo } from "./header/AppLogo";
import { NavigationLinks } from "./header/NavigationLinks";
import { UserActions } from "./header/UserActions";
import { MobileMenu } from "./header/MobileMenu";

export function AppHeader() {
  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <AppLogo />

        {/* Desktop Navigation */}
        <NavigationLinks />

        {/* Search and User Actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:flex max-w-md">
            <input 
              type="search" 
              placeholder="Search manga..." 
              className="pl-10 pr-4 py-2 text-sm rounded-md border border-input bg-background"
            />
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
          </div>

          {/* User Actions */}
          <UserActions />

          {/* Mobile Menu Trigger */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
