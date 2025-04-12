
import { Button } from "@/components/ui/button";

interface PopularTagsProps {
  setQuery: (query: string) => void;
}

export function PopularTags({ setQuery }: PopularTagsProps) {
  const popularTags = ["Action", "Romance", "Fantasy", "Comedy", "Slice of Life", "Adventure", "Mystery", "Horror", "Sci-Fi", "Drama", "Supernatural", "School Life"];
  
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Popular Tags</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {popularTags.map((tag) => (
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
  );
}
