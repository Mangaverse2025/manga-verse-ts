
import { Button } from "@/components/ui/button";
import { Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface Chapter {
  id: string;
  number: string;
  title: string;
  releaseDate: string;
  readStatus?: "read" | "unread";
}

interface ChapterListProps {
  chapters: Chapter[];
  mangaId: string;
}

export function ChapterList({ chapters, mangaId }: ChapterListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Chapters</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Newest
          </Button>
          <Button variant="outline" size="sm">
            Oldest
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {chapters.map((chapter) => (
          <div 
            key={chapter.id} 
            className={`p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors ${
              chapter.readStatus === "read" ? "opacity-60" : ""
            }`}
          >
            <Link to={`/manga/${mangaId}/chapter/${chapter.id}`} className="block">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Chapter {chapter.number}</span>
                    {chapter.title && (
                      <span className="text-muted-foreground">- {chapter.title}</span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {chapter.releaseDate}
                    </span>
                    {chapter.readStatus === "read" && (
                      <span className="flex items-center gap-1 text-primary">
                        <BookOpen className="h-3 w-3" />
                        Read
                      </span>
                    )}
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Read
                </Button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
