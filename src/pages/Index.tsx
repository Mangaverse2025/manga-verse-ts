
import { MangaSection } from "@/components/manga/MangaSection";
import { MainLayout } from "@/components/layout/MainLayout";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { BookOpen, Compass, Sparkles } from "lucide-react";
import { MangaSlider } from "@/components/manga/MangaSlider";

const Index = () => {
  return (
    <MainLayout>
      <section className="mb-10">
        <MangaSlider />
        
        <div className="flex items-center gap-2 mb-6 mt-10">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Trending Now</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingManga.map((manga) => (
            <div 
              key={manga.id} 
              className="rounded-lg overflow-hidden border border-border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex p-4 gap-4">
                <img 
                  src={manga.coverImage} 
                  alt={manga.title} 
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium line-clamp-2">{manga.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{manga.author}</p>
                    <div className="flex mt-2 gap-2">
                      {manga.genres.slice(0, 2).map((genre) => (
                        <span 
                          key={genre} 
                          className="px-2 py-0.5 text-xs bg-accent rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="mt-2 w-fit"
                    asChild
                  >
                    <a href={`/manga/${manga.id}`}>Read Now</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <MangaSection 
        title="Popular Manga" 
        mangaList={popularManga} 
        viewAllLink="/browse?sort=popular"
      />
      
      <MangaSection 
        title="Recently Updated" 
        mangaList={recentlyUpdatedManga} 
        viewAllLink="/browse?sort=updated"
      />
    </MainLayout>
  );
};

export default Index;
