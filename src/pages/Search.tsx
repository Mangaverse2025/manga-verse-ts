
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaCard } from "@/components/manga/MangaCard";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, History, X } from "lucide-react";

// Combine all manga data
const allManga = [...popularManga, ...recentlyUpdatedManga, ...trendingManga];

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [searchHistory] = useState<string[]>(["Demon Slayer", "One Piece", "Fantasy", "Action"]);
  
  // Filter manga based on search
  const searchResults = query.length > 0
    ? allManga.filter(manga => 
        manga.title.toLowerCase().includes(query.toLowerCase()) ||
        manga.author.toLowerCase().includes(query.toLowerCase()) ||
        manga.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase())) ||
        manga.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : [];
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search</h1>
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
        
        {query ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">
                {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for "{query}"
              </h2>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="manga-grid">
                {searchResults.map((manga) => (
                  <MangaCard key={manga.id} {...manga} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center space-y-4">
                <p className="text-lg">No results found for "{query}"</p>
                <p className="text-muted-foreground">Try searching with different keywords</p>
              </div>
            )}
          </div>
        ) : (
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
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
