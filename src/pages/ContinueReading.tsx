
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaCard } from "@/components/manga/MangaCard";
import { popularManga, recentlyUpdatedManga, trendingManga } from "@/data/mockData";

export default function ContinueReading() {
  // Combine all available manga lists and take a subset for continue reading
  const allManga = [...popularManga, ...recentlyUpdatedManga, ...trendingManga];
  const continueReadingManga = allManga.slice(0, 6).map(manga => ({
    ...manga,
    lastReadChapter: `Chapter ${Math.floor(Math.random() * 20) + 1}`
  }));

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Continue Reading</h1>
        
        {continueReadingManga.length === 0 ? (
          <div className="bg-card p-8 rounded-lg text-center">
            <p className="text-muted-foreground">You don't have any manga in progress.</p>
            <p className="mt-2">Start reading to see your progress here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {continueReadingManga.map((manga) => (
              <div key={manga.id} className="space-y-2">
                <MangaCard
                  id={manga.id}
                  title={manga.title}
                  coverImage={manga.coverImage}
                  author={manga.author}
                  status={manga.status}
                />
                <p className="text-sm text-muted-foreground">Last read: {manga.lastReadChapter}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
