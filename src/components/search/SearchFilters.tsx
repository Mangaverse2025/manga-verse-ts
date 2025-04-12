
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react";

interface SearchFiltersProps {
  sort: string;
  setSort: (sort: string) => void;
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  statusFilters: string[];
  setStatusFilters: (status: string[]) => void;
}

export function SearchFilters({ 
  sort, 
  setSort, 
  selectedGenres, 
  setSelectedGenres, 
  statusFilters, 
  setStatusFilters 
}: SearchFiltersProps) {
  const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"];
  const statuses = ["Ongoing", "Completed", "Hiatus"];

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    }
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setStatusFilters([...statusFilters, status]);
    } else {
      setStatusFilters(statusFilters.filter(s => s !== status));
    }
  };

  return (
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
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`status-${status}`} 
                    checked={statusFilters.includes(status)}
                    onCheckedChange={(checked) => handleStatusChange(status, checked === true)}
                  />
                  <label 
                    htmlFor={`status-${status}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Genres</label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`genre-${genre}`} 
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={(checked) => handleGenreChange(genre, checked === true)}
                  />
                  <label 
                    htmlFor={`genre-${genre}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            className="w-full"
            onClick={() => {
              setSelectedGenres([]);
              setStatusFilters([]);
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
