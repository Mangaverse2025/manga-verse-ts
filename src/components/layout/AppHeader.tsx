
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

        {/* User Actions */}
        <UserActions />

        {/* Mobile Menu Trigger */}
        <MobileMenu />
      </div>
    </header>
  );
}
