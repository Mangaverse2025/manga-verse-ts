
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaCard } from "@/components/manga/MangaCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { mockMangaList } from "@/data/mockData";

type BookmarkCategory = 'all' | 'reading' | 'completed' | 'plan-to-read' | 'on-hold' | 're-reading' | 'dropped';

export default function Bookmarks() {
  const [activeCategory, setActiveCategory] = useState<BookmarkCategory>('all');
  
  // Simulate categorized manga for the demo
  const categories = {
    'all': mockMangaList.slice(0, 12),
    'reading': mockMangaList.slice(0, 5),
    'completed': mockMangaList.slice(5, 8),
    'plan-to-read': mockMangaList.slice(8, 11),
    'on-hold': mockMangaList.slice(11, 13),
    're-reading': mockMangaList.slice(13, 15),
    'dropped': mockMangaList.slice(15, 16),
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Bookmarks</h1>
        
        <div className="flex flex-wrap gap-2 pb-2 border-b">
          <Button 
            variant={activeCategory === 'all' ? 'default' : 'outline'} 
            onClick={() => setActiveCategory('all')}
          >
            All
          </Button>
          <Button 
            variant={activeCategory === 'reading' ? 'default' : 'outline'} 
            onClick={() => setActiveCategory('reading')}
          >
            Reading
          </Button>
          <Button 
            variant={activeCategory === 'completed' ? 'default' : 'outline'} 
            onClick={() => setActiveCategory('completed')}
          >
            Completed
          </Button>
          <Button 
            variant={activeCategory === 'plan-to-read' ? 'default' : 'outline'} 
            onClick={() => setActiveCategory('plan-to-read')}
          >
            Plan to Read
          </Button>
          <Button 
            variant={activeCategory === 'on-hold' ? 'default' : 'outline'} 
            onClick={() => setActiveCategory('on-hold')}
          >
            On Hold
          </Button>
          <Button 
            variant={activeCategory === 're-reading' ? 'default' : 'outline'} 
            onClick={() => setActiveCategory('re-reading')}
          >
            Re-reading
          </Button>
          <Button 
            variant={activeCategory === 'dropped' ? 'default' : 'outline'} 
            onClick={() => setActiveCategory('dropped')}
          >
            Dropped
          </Button>
        </div>
        
        {categories[activeCategory].length === 0 ? (
          <div className="bg-card p-8 rounded-lg text-center">
            <p className="text-muted-foreground">No manga in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {categories[activeCategory].map((manga) => (
              <MangaCard
                key={manga.id}
                id={manga.id}
                title={manga.title}
                coverImage={manga.coverImage}
                author={manga.author}
                status={manga.status as "Ongoing" | "Completed" | "Hiatus" | undefined}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
