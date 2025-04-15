
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Filter, Search as SearchIcon, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchHistory } from "@/components/search/SearchHistory";
import { PopularTags } from "@/components/search/PopularTags";
import { SearchResults } from "@/components/search/SearchResults";
import { ViewToggle } from "@/components/search/ViewToggle";

// Combine all manga data
const allManga = [...popularManga, ...recentlyUpdatedManga, ...trendingManga];

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get("sort") || "popular";
  
  const [query, setQuery] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>(["Demon Slayer", "One Piece", "Fantasy", "Action"]);
  const [sort, setSort] = useState<string>(initialSort);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  
  // Filter manga based on search, genres, and status
  const filteredManga = allManga.filter(manga => {
    // Search filter
    const matchesSearch = 
      !query || 
      manga.title.toLowerCase().includes(query.toLowerCase()) ||
      manga.author.toLowerCase().includes(query.toLowerCase()) ||
      manga.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase())) ||
      manga.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    
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

  // Handle search submission
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery && !searchHistory.includes(searchQuery)) {
      setSearchHistory(prev => [searchQuery, ...prev].slice(0, 10));
    }
  };

  // Remove item from search history
  const removeFromHistory = (item: string) => {
    setSearchHistory(prev => prev.filter(i => i !== item));
  };
  
  // Update URL query params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("sort", sort);
    
    if (selectedGenres.length > 0) {
      params.set("genres", selectedGenres.join(","));
    }
    
    if (statusFilters.length > 0) {
      params.set("status", statusFilters.join(","));
    }
    
    const newUrl = `${location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [query, sort, selectedGenres, statusFilters, location.pathname]);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Search Manga</h1>
        <p className="text-muted-foreground">
          Search for titles, authors, genres or browse the entire collection
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Search bar and filters toggle button */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <SearchBar query={query} setQuery={handleSearch} />
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          <Button
            variant="default"
            className="flex items-center gap-2"
            onClick={() => handleSearch(query)}
          >
            <SearchIcon className="h-4 w-4" />
            Search
          </Button>
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
        
        {/* View toggle */}
        {query && (
          <div className="flex items-center justify-between">
            <ViewToggle view={view} setView={setView} resultCount={sortedManga.length} />
          </div>
        )}
        
        {/* Search history and popular tags if no query */}
        {!query ? (
          <div>
            <SearchHistory 
              searchHistory={searchHistory} 
              setQuery={handleSearch}
              removeFromHistory={removeFromHistory}
            />
            <PopularTags setQuery={handleSearch} />
          </div>
        ) : (
          <SearchResults query={query} sortedManga={sortedManga} view={view} />
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
