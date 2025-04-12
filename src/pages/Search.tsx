
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaCard } from "@/components/manga/MangaCard";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search as SearchIcon, History, X, Filter, Grid2X2, List, Star } from "lucide-react";
import { useLocation } from "react-router-dom";

// Combine all manga data
const allManga = [...popularManga, ...recentlyUpdatedManga, ...trendingManga];

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get("sort") || "popular";
  
  const [query, setQuery] = useState<string>("");
  const [searchHistory] = useState<string[]>(["Demon Slayer", "One Piece", "Fantasy", "Action"]);
  const [sort, setSort] = useState<string>(initialSort);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Filter manga based on search
  const filteredManga = allManga.filter(manga => 
    manga.title.toLowerCase().includes(query.toLowerCase()) ||
    manga.author.toLowerCase().includes(query.toLowerCase()) ||
    manga.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase())) ||
    manga.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
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
        <h1 className="text-3xl font-bold mb-2">Search Manga</h1>
        <p className="text-muted-foreground">
          Search for titles, authors, genres or browse the entire collection
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        {showFilters && (
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
        )}
        
        <div className="flex-1">
          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for manga titles, authors, genres..."
                className="w-full pl-12 py-6 text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <SearchIcon className="h-6 w-6 text-muted-foreground absolute left-4 top-3" />
              {query && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-2"
                  onClick={() => setQuery("")}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Toggle filters and view options */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            
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
          
          {/* Search history and popular tags if no query */}
          {!query ? (
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <History className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-medium">Recent Searches</h2>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item) => (
                    <Button 
                      key={item} 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => setQuery(item)}
                    >
                      {item}
                      <X className="h-3 w-3" />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-medium mb-4">Popular Tags</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Action", "Romance", "Fantasy", "Comedy", "Slice of Life", "Adventure", "Mystery", "Horror", "Sci-Fi", "Drama", "Supernatural", "School Life"].map((tag) => (
                    <Button 
                      key={tag} 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => setQuery(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Search results */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">
                  {sortedManga.length} {sortedManga.length === 1 ? "result" : "results"} for "{query}"
                </h2>
              </div>
              
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
                  <p className="text-lg">No results found for "{query}"</p>
                  <p className="text-muted-foreground">Try searching with different keywords</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
