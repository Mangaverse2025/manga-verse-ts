import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ChapterList } from "@/components/manga/ChapterList";
import { MangaSection } from "@/components/manga/MangaSection";
import { getMangaById, getChaptersByMangaId, popularManga } from "@/data/mockData";
import { BookOpen, Heart, Share2, Calendar, Star, Tag, User, Upload, Flag, List, Plus } from "lucide-react";
import { useState } from "react";
import { AddToListDialog } from "@/components/manga/AddToListDialog";
import { RatingDialog } from "@/components/manga/RatingDialog";
import { ReportDialog } from "@/components/manga/ReportDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Bookmark } from "@/components/manga/Bookmark";

const MangaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const manga = getMangaById(id || "");
  const chapters = getChaptersByMangaId(id || "");
  const [isAddToListOpen, setIsAddToListOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  
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
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-20">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                <img
                  src={manga.coverImage}
                  alt={manga.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/40 hover:bg-black/60">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/40 hover:bg-black/60">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => setIsRatingOpen(true)} variant="outline" className="flex gap-2 items-center justify-center">
                      <Star className="h-4 w-4" />
                      Rating
                    </Button>
                    <Button onClick={() => setIsAddToListOpen(true)} variant="outline" className="flex gap-2 items-center justify-center">
                      <List className="h-4 w-4" />
                      Add to List
                    </Button>
                    <Button onClick={() => setIsReportOpen(true)} variant="outline" className="flex gap-2 items-center justify-center">
                      <Flag className="h-4 w-4" />
                      Report
                    </Button>
                    <Button asChild variant="outline" className="flex gap-2 items-center justify-center">
                      <a href="/upload">
                        <Upload className="h-4 w-4" />
                        Upload
                      </a>
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      <BookOpen className="h-4 w-4" />
                      {chapters.length > 0 ? "Start Reading" : "Start Reading"}
                    </Button>
                    
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Author: {manga.author}</span>
                  </div>
                  {manga.artist && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Artist: {manga.artist}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{manga.rating} / 5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Release: {manga.releaseYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {manga.status === "Ongoing" && (
                        <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-500 rounded-full">
                          Ongoing
                        </span>
                      )}
                      {manga.status === "Completed" && (
                        <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-500 rounded-full">
                          Completed
                        </span>
                      )}
                      {manga.status === "Hiatus" && (
                        <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-500 rounded-full">
                          Hiatus
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>
              <p className="text-muted-foreground mb-4">Last updated: {manga.lastUpdated}</p>
              
              <p className="mb-6">{manga.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {manga.genres.map((genre) => (
                  <a 
                    key={genre} 
                    href={`/genres/${genre.toLowerCase()}`}
                    className="px-3 py-1 bg-accent hover:bg-accent/80 rounded-full text-sm transition-colors"
                  >
                    {genre}
                  </a>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {manga.tags.map((tag) => (
                  <a 
                    key={tag} 
                    href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 border border-border hover:bg-accent/50 rounded-full text-xs transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            
            <ChapterList chapters={chapters} mangaId={manga.id} />
          </div>
        </div>
      </div>
      
      <MangaSection 
        title="You May Also Like" 
        mangaList={popularManga.filter(m => m.id !== manga.id).slice(0, 6)} 
      />

      <AddToListDialog open={isAddToListOpen} onOpenChange={setIsAddToListOpen} />
      <RatingDialog open={isRatingOpen} onOpenChange={setIsRatingOpen} mangaId={manga.id} />
      <ReportDialog open={isReportOpen} onOpenChange={setIsReportOpen} mangaId={manga.id} manga={manga} />
    </MainLayout>
  );
};

export default MangaDetails;
