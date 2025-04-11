
import { Link } from "react-router-dom";
import { BookOpen, Compass, Heart, Search, User, Bell, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationItems = [
  {
    title: "Home",
    icon: BookOpen,
    path: "/",
  },
  {
    title: "Browse",
    icon: Compass,
    path: "/browse",
  },
  {
    title: "Search",
    icon: Search,
    path: "/search",
  },
  {
    title: "Library",
    icon: BookOpen,
    path: "/library",
  },
  {
    title: "Favorites",
    icon: Heart,
    path: "/favorites",
  },
];

const genreItems = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
];

export function AppHeader() {
  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">MangaVerse</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationItems.slice(0, 3).map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link to={item.path}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span>{item.title}</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Genres</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                  {genreItems.map((genre) => (
                    <Link 
                      key={genre} 
                      to={`/genres/${genre.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{genre}</div>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/library" className="flex items-center w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Library</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/favorites" className="flex items-center w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Favorites</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-6">
                <Link to="/" className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl">MangaVerse</span>
                </Link>
                
                <div className="relative mb-4">
                  <input 
                    type="search" 
                    placeholder="Search manga..." 
                    className="pl-10 pr-4 py-2 text-sm rounded-md w-full border border-input bg-background"
                  />
                  <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
                </div>
                
                <nav className="flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.path}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-accent"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Popular Genres</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {genreItems.slice(0, 6).map((genre) => (
                      <Link
                        key={genre}
                        to={`/genres/${genre.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm p-2 hover:text-primary"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
