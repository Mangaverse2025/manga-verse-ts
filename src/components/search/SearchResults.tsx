
import { Button } from "@/components/ui/button";
import { MangaCard } from "@/components/manga/MangaCard";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface MangaItem {
  id: string;
  title: string;
  coverImage: string;
  author: string;
  description: string;
  genres: string[];
  tags: string[];
  rating: number;
  status: string;
  releaseYear: number;
  lastUpdated: string;
}

interface SearchResultsProps {
  query: string;
  sortedManga: MangaItem[];
  view: "grid" | "list";
}

export function SearchResults({ query, sortedManga, view }: SearchResultsProps) {
  return (
    <>
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
                  <Link 
                    to={`/manga/${manga.id}`} 
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {manga.title}
                  </Link>
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
                    <Link to={`/manga/${manga.id}`}>Read Now</Link>
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
  );
}
