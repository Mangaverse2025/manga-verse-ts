
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageSelect } from "@/components/manga/LanguageSelect";
import { Search } from "lucide-react";

interface Chapter {
  id: string;
  number: string;
  title: string;
  releaseDate: string;
  group?: string;
}

interface ChapterListProps {
  chapters: Chapter[];
  mangaId: string;
}

export function ChapterList({ chapters, mangaId }: ChapterListProps) {
  const sortedChapters = [...chapters].sort((a, b) => 
    parseFloat(b.number) - parseFloat(a.number)
  );

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
        <LanguageSelect />
        
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chapters..."
            className="pl-10"
          />
        </div>
      </div>
      
      <Tabs defaultValue="chapter">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 mb-6">
          <TabsTrigger value="chapter">CHAPTER</TabsTrigger>
          <TabsTrigger value="volume" asChild>
            <a href={`/manga/${mangaId}/volumes`}>VOLUME</a>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chapter">
          {chapters.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No chapters available yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sortedChapters.map((chapter) => (
                <Link 
                  key={chapter.id}
                  to={`/manga/${mangaId}/chapter/${chapter.id}`}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors"
                >
                  <div>
                    <div className="font-medium">
                      Chapter {chapter.number}
                    </div>
                    {chapter.title && (
                      <div className="text-sm text-muted-foreground">
                        {chapter.title}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {chapter.releaseDate}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
