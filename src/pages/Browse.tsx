
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaCard } from "@/components/manga/MangaCard";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Filter, SortDesc, Grid2X2, List } from "lucide-react";
import { useLocation } from "react-router-dom";

// Combine all manga data
const allManga = [...popularManga, ...recentlyUpdatedManga, ...trendingManga];

const Browse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get("sort") || "popular";
  
  const [sort, setSort] = useState<string>(initialSort);
  const [search, setSearch] = useState<string>("");
  const [view, setView] = useState<"grid" | "list">("grid");
  
  // Filter manga based on search
  const filteredManga = allManga.filter(manga => 
    manga.title.toLowerCase().includes(search.toLowerCase()) ||
    manga.author.toLowerCase().includes(search.toLowerCase()) ||
    manga.genres.some(genre => genre.toLowerCase().includes(search.toLowerCase()))
  );
  
  // Sort manga based on selected option
  const sortedManga = [...filteredManga].sort((a, b) => {
    switch (sort) {
      case "popular":
        return b.rating - a.rating;
      case "updated":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case "newest":
        return b.releaseYear - a.releaseYear;
      case "oldest":
        return a.releaseYear - b.releaseYear;
      case "a-z":
        return a.title.localeCompare(b.title);
      case "z-a":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Browse Manga</h1>
        <p className="text-muted-foreground">
          Discover new series or find your favorites from our extensive collection
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-20 border border-border rounded-lg p-4 bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Filters</h3>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Sort By</label>
                <select 
                  className="w-full p-2 rounded-md border border-input bg-background text-sm"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="popular">Popularity</option>
                  <option value="updated">Recently Updated</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">Status</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-input" />
                    <span>Ongoing</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-input" />
                    <span>Completed</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-input" />
                    <span>Hiatus</span>
                  </label>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">Genres</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"].map((genre) => (
                    <label key={genre} className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded border-input" />
                      <span>{genre}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <Input
              type="search"
              placeholder="Search manga..."
              className="max-w-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
            <div className="flex items-center ml-auto">
              <span className="text-sm text-muted-foreground mr-3">
                {sortedManga.length} results
              </span>
              <div className="flex border border-input rounded-md overflow-hidden">
                <Button
                  variant={view === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none border-0"
                  onClick={() => setView("grid")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none border-0"
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {view === "grid" ? (
            <div className="manga-grid">
              {sortedManga.map((manga) => (
                <MangaCard key={manga.id} {...manga} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedManga.map((manga) => (
                <div 
                  key={manga.id} 
                  className="flex gap-4 p-4 border border-border rounded-lg bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <img 
                    src={manga.coverImage} 
                    alt={manga.title} 
                    className="w-24 h-36 object-cover rounded"
                  />
                  <div className="flex-1">
                    <a 
                      href={`/manga/${manga.id}`} 
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {manga.title}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">{manga.author}</p>
                    
                    <p className="text-sm line-clamp-2 mt-2">{manga.description}</p>
                    
                    <div className="flex flex-wrap mt-2 gap-2">
                      {manga.genres.map((genre) => (
                        <span key={genre} className="px-2 py-0.5 text-xs bg-accent rounded-full">
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{manga.rating}</span>
                      </div>
                      <div>{manga.status}</div>
                      <div>{manga.releaseYear}</div>
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="default" 
                      className="whitespace-nowrap"
                      asChild
                    >
                      <a href={`/manga/${manga.id}`}>Read Now</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Browse;
