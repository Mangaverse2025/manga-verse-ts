
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Search from "./pages/Search";
import MangaDetails from "./pages/MangaDetails";
import ChapterReader from "./pages/ChapterReader";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ContinueReading from "./pages/ContinueReading";
import Bookmarks from "./pages/Bookmarks";
import Follows from "./pages/Follows";
import MyGroups from "./pages/MyGroups";
import Announcements from "./pages/Announcements";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GenrePage from "./pages/GenrePage";
import NotificationsPage from "./pages/NotificationsPage";
import VolumeDetails from "./pages/VolumeDetails";
import VolumeReader from "./pages/VolumeReader";
import MyLists from "./pages/MyLists";
import Upload from "./pages/Upload";
import AuthorPage from "./pages/AuthorPage";
import ArtistPage from "./pages/ArtistPage";
import RankingPage from "./pages/RankingPage";
import PopularPage from "./pages/PopularPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<Navigate to="/search" replace />} />
            <Route path="/search" element={<Search />} />
            <Route path="/manga/:id" element={<MangaDetails />} />
            <Route path="/manga/:id/volumes" element={<VolumeDetails />} />
            <Route path="/manga/:mangaId/chapter/:chapterId" element={<ChapterReader />} />
            <Route path="/manga/:mangaId/volume/:volumeId" element={<VolumeReader />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/continue-reading" element={<ContinueReading />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/follows" element={<Follows />} />
            <Route path="/my-lists" element={<MyLists />} />
            <Route path="/my-groups" element={<MyGroups />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/genres/:genre" element={<GenrePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/authors/:authorName" element={<AuthorPage />} />
            <Route path="/artists/:artistName" element={<ArtistPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/popular" element={<PopularPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
