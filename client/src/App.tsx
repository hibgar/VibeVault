import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNavigation, { NavTab } from "./components/BottomNavigation";
import MediaLibrary from "./components/MediaLibrary";
import AddMedia from "./components/AddMedia";
import VibeFinder from "./components/VibeFinder";
import ProfilePage from "./components/ProfilePage";
import MediaDetailModal from "./components/MediaDetailModal";
import { MediaItem } from "./components/MediaCard";
import thrillerCover from "@assets/generated_images/Thriller_movie_cover_placeholder_31c2e25c.png";
import bookCover from "@assets/generated_images/Fiction_book_cover_placeholder_657c3f32.png";
import showCover from "@assets/generated_images/Comedy_show_cover_placeholder_b9616d13.png";

const initialMockMedia: MediaItem[] = [
  {
    id: "1",
    title: "The Dark Mystery",
    type: "movie",
    year: 2024,
    coverUrl: thrillerCover,
    vibes: ["Thrilling", "Mysterious", "Intense"],
  },
  {
    id: "2",
    title: "Cozy Autumn Reads",
    type: "book",
    year: 2023,
    coverUrl: bookCover,
    vibes: ["Cozy", "Thoughtful", "Relaxing"],
  },
  {
    id: "3",
    title: "Happy Days",
    type: "show",
    year: 2024,
    coverUrl: showCover,
    vibes: ["Lighthearted", "Uplifting", "Energetic"],
  },
  {
    id: "4",
    title: "Midnight Tales",
    type: "book",
    year: 2024,
    vibes: ["Mysterious", "Thoughtful", "Intense"],
  },
  {
    id: "5",
    title: "Summer Adventures",
    type: "show",
    year: 2023,
    vibes: ["Adventurous", "Energetic", "Uplifting"],
  },
  {
    id: "6",
    title: "Quiet Moments",
    type: "movie",
    year: 2024,
    vibes: ["Cozy", "Relaxing", "Thoughtful"],
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("library");
  const [media, setMedia] = useState<MediaItem[]>(initialMockMedia);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleRemoveMedia = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
    console.log("Removed media:", id);
  };

  const handleUpdateVibes = (mediaId: string, vibes: string[]) => {
    setMedia(
      media.map((m) =>
        m.id === mediaId ? { ...m, vibes } : m
      )
    );
  };

  const mediaCount = {
    shows: media.filter((m) => m.type === "show").length,
    movies: media.filter((m) => m.type === "movie").length,
    books: media.filter((m) => m.type === "book").length,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="h-screen flex flex-col bg-background">
          <main className="flex-1 overflow-hidden">
            {activeTab === "library" && (
              <MediaLibrary
                media={media}
                onRemove={handleRemoveMedia}
                onMediaClick={setSelectedMedia}
                onAddClick={() => setActiveTab("add")}
              />
            )}
            {activeTab === "add" && <AddMedia />}
            {activeTab === "vibe" && (
              <VibeFinder media={media} onMediaClick={setSelectedMedia} />
            )}
            {activeTab === "profile" && <ProfilePage mediaCount={mediaCount} />}
          </main>

          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {selectedMedia && (
            <MediaDetailModal
              media={selectedMedia}
              onClose={() => setSelectedMedia(null)}
              onUpdateVibes={handleUpdateVibes}
            />
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
