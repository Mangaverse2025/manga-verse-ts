
import { MainLayout } from "@/components/layout/MainLayout";
import { MangaGrid } from "@/components/manga/MangaGrid";
import { popularManga } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RankingPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ranking</h1>
          <Select defaultValue="all-time">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All Time</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6">
          <MangaGrid 
            mangas={popularManga.sort((a, b) => b.rating - a.rating)}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default RankingPage;
