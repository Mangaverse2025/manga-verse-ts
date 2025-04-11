
import { Home, BookOpen, Compass, Heart, Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    icon: Home,
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

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">MangaVerse</span>
        </Link>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Popular Genres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {genreItems.map((genre) => (
                <SidebarMenuItem key={genre}>
                  <SidebarMenuButton asChild>
                    <Link to={`/genres/${genre.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-3">
                      <span>{genre}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
