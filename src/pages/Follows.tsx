
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaCard } from "@/components/manga/MangaCard";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";

export default function Follows() {
  // Combine all available manga lists and take a subset for follows
  const allManga = [...popularManga, ...recentlyUpdatedManga, ...trendingManga];
  const followedManga = allManga.slice(0, 8).map(manga => ({
    ...manga,
    latestChapter: `Chapter ${Math.floor(Math.random() * 100) + 1}`
  }));

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Follows</h1>
        
        {followedManga.length === 0 ? (
          <div className="bg-card p-8 rounded-lg text-center">
            <p className="text-muted-foreground">You're not following any manga yet.</p>
            <p className="mt-2">Follow manga to get updates on new chapters!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {followedManga.map((manga) => (
              <div key={manga.id} className="space-y-2">
                <MangaCard
                  id={manga.id}
                  title={manga.title}
                  coverImage={manga.coverImage}
                  author={manga.author}
                  status={manga.status}
                />
                <p className="text-sm text-muted-foreground">Latest: {manga.latestChapter}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
