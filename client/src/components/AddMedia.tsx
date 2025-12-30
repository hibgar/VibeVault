import { useState } from "react";
import {
  Film,
  Tv,
  BookOpen,
  Plus,
  X,
  CheckCircle2,
  PlayCircle,
  Circle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaType, MediaStatus } from "./MediaCard";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

interface AddMediaProps {
  userId: string;
  onMediaAdded?: () => void;
}

export default function AddMedia({ userId, onMediaAdded }: AddMediaProps) {
  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState<MediaType>("movie");
  const [selectedStatus, setSelectedStatus] =
    useState<MediaStatus>("not_started");
  const [year, setYear] = useState("");
  const [vibeInput, setVibeInput] = useState("");
  const [vibes, setVibes] = useState<string[]>([]);
  const { toast } = useToast();

  const types: Array<{ id: MediaType; label: string; icon: typeof Tv }> = [
    { id: "show", label: "TV Show", icon: Tv },
    { id: "movie", label: "Movie", icon: Film },
    { id: "book", label: "Book", icon: BookOpen },
  ];

  const statuses: Array<{
    id: MediaStatus;
    label: string;
    icon: typeof Circle;
  }> = [
    { id: "not_started", label: "Not Started", icon: Circle },
    { id: "in_progress", label: "In Progress", icon: PlayCircle },
    { id: "completed", label: "Completed", icon: CheckCircle2 },
  ];

  const addMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      type: MediaType;
      status: MediaStatus;
      year?: number;
      vibes: string[];
    }) => {
      // Ensure userId exists (App should only render this when logged in)
      if (!userId) throw new Error("Not authenticated.");

      const { error } = await supabase.from("media_items").insert({
        user_id: userId,
        title: data.title,
        type: data.type,
        status: data.status,
        year: data.year ?? null,
        cover_url: null,
        vibes: data.vibes,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media_items", userId] });

      setTitle("");
      setYear("");
      setVibeInput("");
      setVibes([]);

      toast({
        title: "Saved!",
        description: "Added to your library.",
      });

      onMediaAdded?.();
    },
    onError: (e: any) => {
      toast({
        title: "Error",
        description: e?.message ?? "Failed to add media",
        variant: "destructive",
      });
    },
  });

  const handleAddVibe = () => {
    const v = vibeInput.trim();
    if (!v) return;
    if (vibes.includes(v)) {
      setVibeInput("");
      return;
    }
    setVibes([...vibes, v]);
    setVibeInput("");
  };

  const handleRemoveVibe = (index: number) => {
    setVibes(vibes.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addMutation.mutate({
      title: title.trim(),
      type: selectedType,
      status: selectedStatus,
      year: year ? parseInt(year) : undefined,
      vibes,
    });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20 bg-background/50">
      <div className="p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">New Addition</h1>
          <p className="text-sm text-muted-foreground">
            Save a new show, movie, or book to your library
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Category
              </label>
              <div className="flex gap-2">
                {types.map((type) => {
                  const Icon = type.icon;
                  const isActive = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border shadow-sm",
                        isActive
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-muted-foreground border-card-border hover:bg-muted/50",
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[11px] font-bold uppercase">
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Status
              </label>
              <div className="flex gap-2">
                {statuses.map((status) => {
                  const Icon = status.icon;
                  const isActive = selectedStatus === status.id;
                  return (
                    <button
                      key={status.id}
                      type="button"
                      onClick={() => setSelectedStatus(status.id)}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border shadow-sm",
                        isActive
                          ? "bg-foreground text-background border-foreground"
                          : "bg-card text-muted-foreground border-card-border hover:bg-muted/50",
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[11px] font-bold uppercase">
                        {status.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Title
              </label>
              <Input
                id="title"
                placeholder="What are we watching/reading?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 bg-card border-card-border rounded-xl text-base shadow-sm px-4"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Vibe Tags
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. cozy, intense, funny"
                  value={vibeInput}
                  onChange={(e) => setVibeInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddVibe())
                  }
                  className="h-11 bg-card border-card-border rounded-xl shadow-sm px-4"
                />
                <Button
                  type="button"
                  onClick={handleAddVibe}
                  disabled={!vibeInput.trim()}
                  className="h-11 w-11 rounded-xl"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>

              {vibes.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {vibes.map((vibe, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="pl-3 pr-1 py-1 rounded-full text-xs font-medium border-none bg-primary/10 text-primary"
                    >
                      {vibe}
                      <button
                        type="button"
                        onClick={() => handleRemoveVibe(idx)}
                        className="ml-1.5 hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/20"
            disabled={!title.trim() || addMutation.isPending}
          >
            {addMutation.isPending ? "Saving..." : "Save to Library"}
          </Button>
        </form>
      </div>
    </div>
  );
}
