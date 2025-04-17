
import { Volume } from "@/data/volume-pages";
import { Link } from "react-router-dom";

interface VolumeGridProps {
  volumes: Volume[];
  mangaId: string;
}

export function VolumeGrid({ volumes, mangaId }: VolumeGridProps) {
  if (volumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-muted-foreground">No volumes available yet.</p>
      </div>
    );
  }

  // Sort volumes by number in descending order (newest first)
  const sortedVolumes = [...volumes].sort((a, b) => 
    parseFloat(b.number) - parseFloat(a.number)
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {sortedVolumes.map((volume) => (
        <Link 
          key={volume.id} 
          to={`/manga/${mangaId}/volume/${volume.id}`}
          className="group"
        >
          <div className="flex flex-col gap-2">
            <div className="aspect-[2/3] overflow-hidden rounded-md relative">
              <img
                src={volume.coverImage}
                alt={`Volume ${volume.number}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="text-center">
              <p className="font-medium">Vol {volume.number}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
