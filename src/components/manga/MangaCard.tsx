
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface MangaCardProps {
  id: string;
  title: string;
  coverImage: string;
  author?: string;
  status?: "Ongoing" | "Completed" | "Hiatus";
  className?: string;
}

export function MangaCard({ id, title, coverImage, author, status, className }: MangaCardProps) {
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
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/40 hover:bg-black/60"
        >
          <Heart className="h-4 w-4" />
        </Button>
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
        {author && <p className="text-xs text-muted-foreground mt-1">{author}</p>}
      </div>
    </div>
  );
}
