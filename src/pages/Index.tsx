
import { MangaSection } from "@/components/manga/MangaSection";
import { MainLayout } from "@/components/layout/MainLayout";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { BookOpen, Compass, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-10">
          <div className="md:flex-1 space-y-4">
            <h1 className="text-4xl font-bold">MangaVerse</h1>
            <p className="text-lg text-muted-foreground">
              Your ultimate destination for manga reading. Explore thousands of titles from 
              various genres and enjoy a seamless reading experience.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="gap-2">
                <BookOpen className="h-4 w-4" />
                Start Reading
              </Button>
              <Button variant="outline" className="gap-2">
                <Compass className="h-4 w-4" />
                Browse Catalog
              </Button>
            </div>
          </div>
          <div className="md:flex-1 relative h-60 md:h-80">
            <div className="absolute top-0 left-[10%] w-[80%] h-full bg-gradient-to-r from-manga-primary/20 to-manga-secondary/20 blur-3xl -z-10 rounded-full"></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="bg-manga-darker p-2 rounded-lg shadow-xl transform rotate-3 z-10">
                <img 
                  src={popularManga[0].coverImage} 
                  alt="Featured Manga" 
                  className="h-56 md:h-72 w-auto rounded"
                />
              </div>
              <div className="bg-manga-darker p-2 rounded-lg shadow-xl transform -rotate-3 absolute -left-6 top-6 z-0">
                <img 
                  src={popularManga[1].coverImage} 
                  alt="Featured Manga" 
                  className="h-52 md:h-64 w-auto rounded opacity-90"
                />
              </div>
              <div className="bg-manga-darker p-2 rounded-lg shadow-xl transform rotate-6 absolute -right-4 top-4 z-0">
                <img 
                  src={popularManga[2].coverImage} 
                  alt="Featured Manga" 
                  className="h-48 md:h-60 w-auto rounded opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
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
