
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaGrid } from "@/components/manga/MangaGrid";
import { popularManga } from "@/data/mockData";

const PopularPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Popular Manga</h1>
          <p className="text-muted-foreground">Discover what's trending right now</p>
        </div>

        <div className="grid gap-6">
          <MangaGrid mangas={popularManga} />
        </div>
      </div>
    </MainLayout>
  );
};

export default PopularPage;
