
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Lock, Globe } from "lucide-react";
import { MangaCard } from "@/components/manga/MangaCard";
import { popularManga } from "@/data/mockData";

// Mock data for user lists
const MY_LISTS = [
  { id: "1", name: "Favorites", isPrivate: false, mangaCount: 24 },
  { id: "2", name: "Reading Now", isPrivate: false, mangaCount: 12 },
  { id: "3", name: "To Read Later", isPrivate: true, mangaCount: 45 },
  { id: "4", name: "Dropped", isPrivate: true, mangaCount: 8 },
];

// Mock data for followed lists
const FOLLOWED_LISTS = [
  { id: "5", name: "Best Isekai", owner: "MangaFan42", mangaCount: 37 },
  { id: "6", name: "Top Romance", owner: "OtakuQueen", mangaCount: 28 },
  { id: "7", name: "Hidden Gems", owner: "MangaScout", mangaCount: 19 },
];

export default function MyLists() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Lists</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New List
          </Button>
        </div>
        
        <Tabs defaultValue="my-lists" className="mb-10">
          <TabsList>
            <TabsTrigger value="my-lists">My Lists</TabsTrigger>
            <TabsTrigger value="followed-lists">Followed Lists</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-lists" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MY_LISTS.map((list) => (
                <a 
                  key={list.id}
                  href={`/lists/${list.id}`}
                  className="bg-card rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-border h-full"
                >
                  <div className="grid grid-cols-3 h-full">
                    <div className="col-span-1 bg-muted">
                      <div className="grid grid-cols-2 grid-rows-2 h-full">
                        {popularManga.slice(0, 4).map((manga, index) => (
                          <div key={index} className="overflow-hidden">
                            <img
                              src={manga.coverImage}
                              alt={manga.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="col-span-2 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold line-clamp-1">{list.name}</h3>
                          {list.isPrivate ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Globe className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {list.mangaCount} manga
                        </p>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        {list.isPrivate ? "Private list" : "Public list"}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="followed-lists" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FOLLOWED_LISTS.map((list) => (
                <a
                  key={list.id}
                  href={`/lists/${list.id}`}
                  className="bg-card rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-border h-full"
                >
                  <div className="grid grid-cols-3 h-full">
                    <div className="col-span-1 bg-muted">
                      <div className="grid grid-cols-2 grid-rows-2 h-full">
                        {popularManga.slice(0, 4).map((manga, index) => (
                          <div key={index} className="overflow-hidden">
                            <img
                              src={manga.coverImage}
                              alt={manga.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="col-span-2 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold line-clamp-1 mb-1">{list.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          by {list.owner}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {list.mangaCount} manga
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
