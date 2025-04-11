
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { MangaCard } from "./MangaCard";

interface MangaSectionProps {
  title: string;
  mangaList: {
    id: string;
    title: string;
    coverImage: string;
    author?: string;
    status?: "Ongoing" | "Completed" | "Hiatus";
  }[];
  viewAllLink?: string;
  className?: string;
}

export function MangaSection({ title, mangaList, viewAllLink, className }: MangaSectionProps) {
  return (
    <section className={cn("mb-10", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllLink && (
          <Link 
            to={viewAllLink} 
            className="flex items-center text-sm text-primary hover:underline"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
      <div className="manga-grid">
        {mangaList.map((manga) => (
          <MangaCard key={manga.id} {...manga} />
        ))}
      </div>
    </section>
  );
}
