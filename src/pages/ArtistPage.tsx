
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaGrid } from "@/components/manga/MangaGrid";
import { popularManga } from "@/data/mockData";
import { useParams } from "react-router-dom";

const ArtistPage = () => {
  const { artistName } = useParams();
  const artistManga = popularManga.filter(manga => manga.artist === artistName);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{artistName}</h1>
          <p className="text-muted-foreground">Artist</p>
        </div>

        <div className="grid gap-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Works by {artistName}</h2>
            <MangaGrid mangas={artistManga} />
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default ArtistPage;
