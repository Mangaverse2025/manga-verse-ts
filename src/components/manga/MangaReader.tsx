
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Settings, List, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface MangaReaderProps {
  mangaId: string;
  chapterId: string;
  chapterNumber: string;
  chapterTitle: string;
  pages: string[];
  prevChapterId?: string;
  nextChapterId?: string;
}

export function MangaReader({
  mangaId,
  chapterId,
  chapterNumber,
  chapterTitle,
  pages,
  prevChapterId,
  nextChapterId,
}: MangaReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  
  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (nextChapterId) {
      navigate(`/manga/${mangaId}/chapter/${nextChapterId}`);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (prevChapterId) {
      navigate(`/manga/${mangaId}/chapter/${prevChapterId}`);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/manga/${mangaId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-medium">Chapter {chapterNumber}</h1>
              {chapterTitle && (
                <p className="text-sm text-muted-foreground">{chapterTitle}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <List className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main 
        className="flex-1 overflow-auto flex items-center justify-center p-4 relative"
        onClick={goToNextPage}
      >
        <img 
          src={pages[currentPage]} 
          alt={`Page ${currentPage + 1}`} 
          className="max-h-full max-w-full object-contain"
        />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevPage();
          }}
          disabled={currentPage === 0 && !prevChapterId}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60"
          onClick={(e) => {
            e.stopPropagation();
            goToNextPage();
          }}
          disabled={currentPage === pages.length - 1 && !nextChapterId}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </main>
      
      <footer className="p-4 bg-background/90 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={goToPrevPage}
            disabled={currentPage === 0 && !prevChapterId}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="text-sm">
            Page {currentPage + 1} of {pages.length}
          </div>
          
          <Button 
            variant="outline" 
            onClick={goToNextPage}
            disabled={currentPage === pages.length - 1 && !nextChapterId}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
