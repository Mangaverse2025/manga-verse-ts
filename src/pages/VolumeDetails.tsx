
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { getVolumeById, getVolumesByMangaId } from "@/data/volume-pages";
import { getMangaById } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { LanguageSelect } from "@/components/manga/LanguageSelect";
import { Search } from "lucide-react";
import { VolumeGrid } from "@/components/manga/VolumeGrid";

const VolumeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const manga = getMangaById(id || "");
  const volumes = getVolumesByMangaId(id || "");
  
  if (!manga) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">Manga Not Found</h1>
          <p className="text-muted-foreground mb-6">The manga you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{manga.title}</h1>
          <p className="text-muted-foreground">Volumes</p>
        </div>
        
        <div className="bg-card rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
            <LanguageSelect />
            
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search volumes..."
                className="pl-10"
              />
            </div>
          </div>
          
          <Tabs defaultValue="volume">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 mb-6">
              <TabsTrigger value="chapter" asChild>
                <a href={`/manga/${id}`}>CHAPTER</a>
              </TabsTrigger>
              <TabsTrigger value="volume">VOLUME</TabsTrigger>
            </TabsList>
            
            <TabsContent value="volume">
              <VolumeGrid volumes={volumes} mangaId={manga.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default VolumeDetails;
