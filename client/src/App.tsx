import { useEffect, useMemo, useState } from "react";
import {
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";

import { queryClient } from "./lib/queryClient";
import { supabase } from "./lib/supabaseClient";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

import BottomNavigation, { NavTab } from "./components/BottomNavigation";
import MediaLibrary from "./components/MediaLibrary";
import AddMedia from "./components/AddMedia";
import VibeFinder from "./components/VibeFinder";
import ProfilePage from "./components/ProfilePage";
import MediaDetailModal from "./components/MediaDetailModal";
import AuthScreen from "@/components/AuthScreen";

import { MediaItem, MediaStatus } from "./components/MediaCard";

function AppContent() {
  const { toast } = useToast();

  // --- Auth session (Supabase is source of truth) ---
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // --- UI state ---
  const [activeTab, setActiveTab] = useState<NavTab>("library");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const userId = session?.user.id;

  // --- Data: fetch media from Supabase ---
  const { data: media = [], isLoading: mediaLoading } = useQuery<MediaItem[]>({
    queryKey: ["media_items", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media_items")
        .select("id,title,type,status,year,cover_url,vibes")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data ?? []).map((row: any) => ({
        id: row.id,
        title: row.title,
        type: row.type,
        status: row.status,
        year: row.year ?? undefined,
        coverUrl: row.cover_url ?? undefined,
        vibes: row.vibes ?? [],
      })) as MediaItem[];
    },
  });

  // --- Mutations: delete/update in Supabase ---
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("media_items")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media_items", userId] });
      toast({
        title: "Media removed",
        description: "The item has been removed from your library",
      });
    },
    onError: (e: any) => {
      toast({
        title: "Error",
        description: e?.message ?? "Failed to remove media",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<MediaItem>;
    }) => {
      // Map camelCase -> snake_case for DB columns
      const payload: any = { ...updates };
      if ("coverUrl" in payload) {
        payload.cover_url = payload.coverUrl;
        delete payload.coverUrl;
      }

      const { error } = await supabase
        .from("media_items")
        .update(payload)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media_items", userId] });
      toast({
        title: "Media updated",
        description: "Your changes have been saved",
      });
    },
    onError: (e: any) => {
      toast({
        title: "Error",
        description: e?.message ?? "Failed to update media",
        variant: "destructive",
      });
    },
  });

  const handleRemoveMedia = (id: string) => deleteMutation.mutate(id);
  const handleUpdateVibes = (mediaId: string, vibes: string[]) =>
    updateMutation.mutate({ id: mediaId, updates: { vibes } });
  const handleUpdateStatus = (mediaId: string, status: MediaStatus) =>
    updateMutation.mutate({ id: mediaId, updates: { status } });

  const handleMediaAdded = () => {
    setActiveTab("library");
    // AddMedia will insert; we just refresh list
    queryClient.invalidateQueries({ queryKey: ["media_items", userId] });
    toast({
      title: "Media added",
      description: "Successfully added to your library",
    });
  };

  const mediaCount = useMemo(
    () => ({
      shows: media.filter((m) => m.type === "show").length,
      movies: media.filter((m) => m.type === "movie").length,
      books: media.filter((m) => m.type === "book").length,
    }),
    [media],
  );

  // --- Rendering gates (AFTER hooks are declared) ---
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking session…
      </div>
    );
  }

  if (!session) {
    // Your AuthScreen expects onAuthenticated — pass a no-op
    return (
      <div className="h-screen flex items-center justify-center p-6">
        <AuthScreen onAuthenticated={() => {}} />
      </div>
    );
  }

  if (mediaLoading) {
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

        {activeTab === "add" && (
          <AddMedia userId={session.user.id} onMediaAdded={handleMediaAdded} />
        )}

        {activeTab === "vibe" && (
          <VibeFinder media={media} onMediaClick={setSelectedMedia} />
        )}

        {activeTab === "profile" && (
          <ProfilePage
            mediaCount={mediaCount}
            onLogout={async () => {
              await supabase.auth.signOut();
              setSelectedMedia(null);
              setActiveTab("library");
            }}
          />
        )}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {selectedMedia && (
        <MediaDetailModal
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
          onRemove={handleRemoveMedia}
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
