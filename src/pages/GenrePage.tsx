
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaCard } from "@/components/manga/MangaCard";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Combine all manga data
const allManga = [...popularManga, ...recentlyUpdatedManga, ...trendingManga];

const GenrePage = () => {
  const { genre } = useParams<{ genre: string }>();
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("popular");
  
  const displayGenre = genre ? genre.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "";
  
  // Filter manga by genre
  const genreManga = allManga.filter(manga => 
    manga.genres.some(g => g.toLowerCase() === displayGenre.toLowerCase())
  );
  
  // Filter by search
  const filteredManga = genreManga.filter(manga => 
    manga.title.toLowerCase().includes(search.toLowerCase()) ||
    manga.author.toLowerCase().includes(search.toLowerCase())
  );
  
  // Sort manga
  const sortedManga = [...filteredManga].sort((a, b) => {
    switch (sort) {
      case "popular":
        return b.rating - a.rating;
      case "recent":
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
        <h1 className="text-3xl font-bold mb-2">{displayGenre} Manga</h1>
        <p className="text-muted-foreground">
          Discover {displayGenre} manga from our collection
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="search"
          placeholder={`Search ${displayGenre} manga...`}
          className="max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="flex gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <ArrowUpDown className="h-4 w-4" />
                {sort === "popular" && "Most Popular"}
                {sort === "recent" && "Recently Updated"}
                {sort === "newest" && "Newest First"}
                {sort === "oldest" && "Oldest First"}
                {sort === "a-z" && "A to Z"}
                {sort === "z-a" && "Z to A"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSort("popular")}>
                Most Popular
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("recent")}>
                Recently Updated
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("newest")}>
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("oldest")}>
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("a-z")}>
                A to Z
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("z-a")}>
                Z to A
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {sortedManga.length > 0 ? (
        <div className="manga-grid">
          {sortedManga.map((manga) => (
            <MangaCard key={manga.id} {...manga} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4">
          <p className="text-lg">No {displayGenre} manga found</p>
          <p className="text-muted-foreground">Try a different genre or check back later</p>
        </div>
      )}
    </MainLayout>
  );
};

export default GenrePage;
