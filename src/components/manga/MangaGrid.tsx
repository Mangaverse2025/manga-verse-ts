
import { Manga } from "@/data/mockData";
import { MangaCard } from "./MangaCard";

interface MangaGridProps {
  mangas: Manga[];
}

export function MangaGrid({ mangas }: MangaGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {mangas.map((manga) => (
        <MangaCard key={manga.id} {...manga} />
      ))}
    </div>
  );
}
