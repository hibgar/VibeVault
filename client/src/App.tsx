import { useState } from "react";
import {
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { queryClient, apiRequest } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation, { NavTab } from "./components/BottomNavigation";
import MediaLibrary from "./components/MediaLibrary";
import AddMedia from "./components/AddMedia";
import VibeFinder from "./components/VibeFinder";
import ProfilePage from "./components/ProfilePage";
import MediaDetailModal from "./components/MediaDetailModal";
import { MediaItem, MediaStatus } from "./components/MediaCard";
import { supabase } from "./lib/supabaseClient";
import { useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { Auth } from "./components/Auth";

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>("library");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const { toast } = useToast();

  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) console.error(error);
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      },
    );

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Checking session...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center p-6">
        <Auth />
      </div>
    );
  }

  const userId = session.user.id;

  const { data: media = [], isLoading } = useQuery<MediaItem[]>({
    queryKey: ["/api/media", userId],
    queryFn: async () => {
      const res = await apiRequest(
        "GET",
        `/api/media?userId=${encodeURIComponent(userId)}`,
      );
      return await res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/media/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
      toast({
        title: "Media removed",
        description: "The item has been removed from your library",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove media",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<MediaItem>;
    }) => apiRequest("PATCH", `/api/media/${id}`, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
      toast({
        title: "Media updated",
        description: "Your changes have been saved",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update media",
        variant: "destructive",
      });
    },
  });

  const handleRemoveMedia = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleUpdateVibes = (mediaId: string, vibes: string[]) => {
    updateMutation.mutate({ id: mediaId, updates: { vibes } });
  };

  const handleUpdateStatus = (mediaId: string, status: MediaStatus) => {
    updateMutation.mutate({ id: mediaId, updates: { status } });
  };

  const handleMediaAdded = () => {
    setActiveTab("library");
    toast({
      title: "Media added",
      description: "Successfully added to your library",
    });
  };

  const mediaCount = {
    shows: media.filter((m) => m.type === "show").length,
    movies: media.filter((m) => m.type === "movie").length,
    books: media.filter((m) => m.type === "book").length,
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">
            Loading your library...
          </p>
        </div>
      </div>
    );
  }

  return (
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
        {activeTab === "add" && <AddMedia onMediaAdded={handleMediaAdded} />}
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
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
