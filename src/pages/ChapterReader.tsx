
import { useParams } from "react-router-dom";
import { MangaReader } from "@/components/manga/MangaReader";
import { getMangaById, getChapterById, getChaptersByMangaId } from "@/data/mockData";

const ChapterReader = () => {
  const { mangaId, chapterId } = useParams<{ mangaId: string; chapterId: string }>();
  
  const manga = getMangaById(mangaId || "");
  const chapter = getChapterById(mangaId || "", chapterId || "");
  const allChapters = getChaptersByMangaId(mangaId || "");
  
  if (!manga || !chapter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Chapter Not Found</h1>
        <p className="text-muted-foreground mb-6">The chapter you're looking for doesn't exist or has been removed.</p>
        <a href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Return Home
        </a>
      </div>
    );
  }
  
  const chapterIndex = allChapters.findIndex(c => c.id === chapterId);
  const prevChapterId = chapterIndex > 0 ? allChapters[chapterIndex - 1].id : undefined;
  const nextChapterId = chapterIndex < allChapters.length - 1 ? allChapters[chapterIndex + 1].id : undefined;
  
  return (
    <MangaReader
      mangaId={mangaId || ""}
      chapterId={chapterId || ""}
      chapterNumber={chapter.number}
      chapterTitle={chapter.title}
      pages={chapter.pages || []}
      prevChapterId={prevChapterId}
      nextChapterId={nextChapterId}
    />
  );
};

export default ChapterReader;
