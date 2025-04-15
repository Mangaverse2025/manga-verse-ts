import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";
import { type Manga } from "@/data/mockData";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Combine all manga data and take the first 10 items for the slider
const sliderManga: Manga[] = [...popularManga, ...recentlyUpdatedManga, ...trendingManga]
  .slice(0, 10)
  .filter((manga, index, self) => 
    // Remove duplicates based on id
    index === self.findIndex((m) => m.id === manga.id)
  );

export function MangaSlider() {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  const scrollToSlide = useCallback((index: number) => {
    if (!api) return;
    api.scrollTo(index);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    
    // Set up the interval for auto-sliding
    const interval = setInterval(() => {
      const nextSlide = (current + 1) % sliderManga.length;
      api.scrollTo(nextSlide);
    }, 6000); // 6 seconds interval
    
    return () => clearInterval(interval);
  }, [api, current]);

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {sliderManga.map((manga, index) => (
            <CarouselItem key={manga.id}>
              <div className="relative w-full aspect-[21/9] overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30 z-10" />
                <img 
                  src={manga.coverImage} 
                  alt={manga.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex flex-col justify-center p-6 md:p-10 md:max-w-[50%]">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{manga.title}</h2>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 md:line-clamp-3">
                    {manga.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {manga.genres.slice(0, 3).map((genre) => (
                      <span 
                        key={genre} 
                        className="px-2 py-1 text-xs bg-accent/80 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button asChild>
                      <Link to={`/manga/${manga.id}`}>Read Now</Link>
                    </Button>
                    <Button variant="outline">
                      <Link to={`/manga/${manga.id}`}>Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-4 z-20" />
        <CarouselNext className="right-4 z-20" />
      </Carousel>
      
      <div className="flex justify-center gap-2 mt-4">
        {sliderManga.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === index 
                ? "bg-primary w-6" 
                : "bg-muted hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
