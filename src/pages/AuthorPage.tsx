
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaGrid } from "@/components/manga/MangaGrid";
import { popularManga } from "@/data/mockData";
import { useParams } from "react-router-dom";

const AuthorPage = () => {
  const { authorName } = useParams();
  const authorManga = popularManga.filter(manga => manga.author === authorName);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{authorName}</h1>
          <p className="text-muted-foreground">Author</p>
        </div>

        <div className="grid gap-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Works by {authorName}</h2>
            <MangaGrid mangas={authorManga} />
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuthorPage;
