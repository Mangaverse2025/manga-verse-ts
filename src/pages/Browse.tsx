
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaCard } from "@/components/manga/MangaCard";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Grid2X2, List, Star, Filter } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SearchFilters } from "@/components/search/SearchFilters";

// Combine all manga data
const allManga = [...popularManga, ...recentlyUpdatedManga, ...trendingManga];

const Browse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get("sort") || "popular";
  
  const [sort, setSort] = useState<string>(initialSort);
  const [search, setSearch] = useState<string>("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Filter manga based on search, genres, and status
  const filteredManga = allManga.filter(manga => {
    // Search filter
    const matchesSearch = 
      manga.title.toLowerCase().includes(search.toLowerCase()) ||
      manga.author.toLowerCase().includes(search.toLowerCase()) ||
      manga.genres.some(genre => genre.toLowerCase().includes(search.toLowerCase()));
    
    // Genre filter
    const matchesGenre = selectedGenres.length === 0 || 
      selectedGenres.some(genre => manga.genres.includes(genre));
    
    // Status filter
    const matchesStatus = statusFilters.length === 0 || 
      statusFilters.includes(manga.status);
    
    return matchesSearch && matchesGenre && matchesStatus;
  });
  
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
  
  // Update URL query params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("sort", sort);
    
    if (selectedGenres.length > 0) {
      params.set("genres", selectedGenres.join(","));
    }
    
    if (statusFilters.length > 0) {
      params.set("status", statusFilters.join(","));
    }
    
    const newUrl = `${location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [sort, selectedGenres, statusFilters, location.pathname]);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Browse Manga</h1>
        <p className="text-muted-foreground">
          Discover new series or find your favorites from our extensive collection
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Search bar and filters button */}
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search manga..."
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          
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
        
        {/* Horizontal filter panel */}
        {showFilters && (
          <SearchFilters 
            sort={sort} 
            setSort={setSort}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            statusFilters={statusFilters}
            setStatusFilters={setStatusFilters}
          />
        )}
        
        {/* Results count */}
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground">
            {sortedManga.length} results
          </span>
        </div>
        
        {/* Results */}
        {sortedManga.length > 0 ? (
          view === "grid" ? (
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
          )
        ) : (
          <div className="py-16 text-center space-y-4">
            <p className="text-lg">No results found</p>
            <p className="text-muted-foreground">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Browse;
