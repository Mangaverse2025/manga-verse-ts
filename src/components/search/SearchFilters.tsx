
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Filter } from "lucide-react";

interface SearchFiltersProps {
  sort: string;
  setSort: (sort: string) => void;
}

export function SearchFilters({ sort, setSort }: SearchFiltersProps) {
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
  );
}
