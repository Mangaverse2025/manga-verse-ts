import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

export interface MangaCardProps {
  id: string;
  title: string;
  coverImage: string;
  author?: string;
  artist?: string;
  status?: "Ongoing" | "Completed" | "Hiatus";
  className?: string;
}

export function MangaCard({ id, title, coverImage, author, artist, status, className }: MangaCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={cn("group relative rounded-lg overflow-hidden flex flex-col bg-card", className)}>
      <div className="relative aspect-[2/3] overflow-hidden">
        <Link to={`/manga/${id}`}>
          <img
            src={coverImage}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "absolute top-2 right-2 h-8 w-8 rounded-full bg-black/40 hover:bg-black/60",
                  isFavorite && "text-red-500"
                )}
                onClick={toggleFavorite}
              >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {status && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs px-2 py-1 text-center">
            {status}
          </div>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <Link to={`/manga/${id}`} className="font-medium line-clamp-2 hover:text-primary transition-colors">
          {title}
        </Link>
        {author && (
          <Link to={`/authors/${author}`} className="text-xs text-muted-foreground mt-1 hover:text-primary">
            {author}
          </Link>
        )}
        {artist && author !== artist && (
          <Link to={`/artists/${artist}`} className="text-xs text-muted-foreground mt-0.5 hover:text-primary">
            Art by {artist}
          </Link>
        )}
      </div>
    </div>
  );
}
