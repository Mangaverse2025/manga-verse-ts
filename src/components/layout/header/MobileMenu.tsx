
import { Link } from "react-router-dom";
import { BookOpen, Compass, Heart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Navigation items for mobile menu
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

// Genre items
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

export function MobileMenu() {
  return (
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
  );
}
