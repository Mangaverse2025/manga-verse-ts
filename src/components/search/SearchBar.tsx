
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
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
  );
}
