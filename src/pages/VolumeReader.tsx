
import { useParams } from "react-router-dom";
import { getVolumeById, getVolumesByMangaId } from "@/data/volume-pages";
import { getMangaById } from "@/data/mockData";
import { MangaReader } from "@/components/manga/MangaReader";
import { chapterPages } from "@/data/chapter-pages";

const VolumeReader = () => {
  const { mangaId, volumeId } = useParams<{ mangaId: string; volumeId: string }>();
  
  const manga = getMangaById(mangaId || "");
  const volume = getVolumeById(mangaId || "", volumeId || "");
  const volumes = getVolumesByMangaId(mangaId || "");
  
  if (!manga || !volume) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Volume Not Found</h1>
        <p className="text-muted-foreground mb-6">The volume you're looking for doesn't exist or has been removed.</p>
        <a href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Return Home
        </a>
      </div>
    );
  }
  
  const volumeIndex = volumes.findIndex(v => v.id === volumeId);
  const prevVolumeId = volumeIndex > 0 ? volumes[volumeIndex - 1].id : undefined;
  const nextVolumeId = volumeIndex < volumes.length - 1 ? volumes[volumeIndex + 1].id : undefined;
  
  // Use sample pages from the chapter pages data for demo
  const samplePages = chapterPages["c1"].map(page => page.url);
  
  return (
    <MangaReader
      mangaId={mangaId || ""}
      chapterId={volumeId || ""}
      chapterNumber={volume.number}
      chapterTitle={volume.title}
      pages={samplePages}
      prevChapterId={prevVolumeId}
      nextChapterId={nextVolumeId}
    />
  );
};

export default VolumeReader;
