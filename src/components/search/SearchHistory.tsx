
import { Button } from "@/components/ui/button";
import { History, X } from "lucide-react";

interface SearchHistoryProps {
  searchHistory: string[];
  setQuery: (query: string) => void;
  removeFromHistory: (item: string) => void;
}

export function SearchHistory({ searchHistory, setQuery, removeFromHistory }: SearchHistoryProps) {
  return (
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
            <X 
              className="h-3 w-3 hover:text-destructive" 
              onClick={(e) => {
                e.stopPropagation();
                removeFromHistory(item);
              }}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
