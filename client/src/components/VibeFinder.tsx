import { useState, useMemo } from "react";
import {
  Heart,
  Zap,
  Smile,
  Brain,
  Flame,
  Cloud,
  Lightbulb,
  Music,
  Coffee,
  Mountain,
  Moon,
  Sun,
  Sparkles,
  Filter,
} from "lucide-react";
import VibeMoodCard from "./VibeMoodCard";
import MediaCard, { MediaItem, MediaStatus } from "./MediaCard";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";
import { cn } from "@/lib/utils";

interface VibeFinderProps {
  media: MediaItem[];
  onMediaClick?: (media: MediaItem) => void;
}

const statusFilters: { id: MediaStatus | "all"; label: string }[] = [
  { id: "all", label: "All Statuses" },
  { id: "completed", label: "Completed" },
  { id: "in_progress", label: "In Progress" },
  { id: "not_started", label: "Not Started" },
];

const typeFilters: { id: "movie" | "show" | "book" | "all"; label: string }[] = [
  { id: "all", label: "All Types" },
  { id: "movie", label: "Movies" },
  { id: "show", label: "Shows" },
  { id: "book", label: "Books" },
];

export default function VibeFinder({ media, onMediaClick }: VibeFinderProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<MediaStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<"movie" | "show" | "book" | "all">("all");

  // Get all unique vibes currently in the library
  const availableVibes = useMemo(() => {
    return Array.from(
      new Set(media.flatMap((item) => item.vibes))
    ).sort();
  }, [media]);

  const filteredRecommendations = useMemo(() => {
    if (!selectedMood) return [];
    
    return media.filter((item) => {
      const matchesMood = item.vibes.some((v) =>
        v.toLowerCase() === selectedMood.toLowerCase()
      );
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      return matchesMood && matchesStatus && matchesType;
    });
  }, [media, selectedMood, statusFilter, typeFilter]);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setStatusFilter("all");
    setTypeFilter("all");
  };

  const handleReset = () => {
    setSelectedMood(null);
    setStatusFilter("all");
    setTypeFilter("all");
  };

  return (
    <div className="flex flex-col h-full bg-background/50">
      {!selectedMood ? (
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-6 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Your Library Vibes</h1>
              <p className="text-sm text-muted-foreground">
                Pick a vibe from your collection to see what matches
              </p>
            </div>

            {availableVibes.length === 0 ? (
              <EmptyState
                icon={Sparkles}
                title="No vibes found"
                description="Add some vibe tags to your media items first!"
              />
            ) : (
              <div className="flex flex-wrap gap-3 justify-center">
                {availableVibes.map((vibe) => (
                  <button
                    key={vibe}
                    onClick={() => handleMoodSelect(vibe)}
                    className="px-6 py-3 rounded-2xl bg-card border border-card-border shadow-sm hover-elevate active-elevate-2 text-sm font-semibold text-primary transition-all"
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="p-6 pb-4 bg-background/80 backdrop-blur-md border-b border-border space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                {selectedMood} <span className="text-muted-foreground font-medium text-lg ml-1">Vibes</span>
              </h1>
              <Button variant="outline" size="sm" className="rounded-full px-4 h-8 text-[11px] font-bold uppercase" onClick={handleReset}>
                Back
              </Button>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                {statusFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setStatusFilter(filter.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap transition-all border",
                      statusFilter === filter.id
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                    )}
                    data-testid={`button-filter-status-${filter.id}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <div className="w-3.5 h-3.5 shrink-0" /> {/* Spacer to align with top row's icon */}
                {typeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setTypeFilter(filter.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap transition-all border",
                      typeFilter === filter.id
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                    )}
                    data-testid={`button-filter-type-${filter.id}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
              {filteredRecommendations.length} {filteredRecommendations.length === 1 ? "match" : "matches"} found
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20">
            {filteredRecommendations.length === 0 ? (
              <div className="h-full flex items-center justify-center py-12">
                <p className="text-sm text-muted-foreground">No matches for this filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {filteredRecommendations.map((item) => (
                  <MediaCard key={item.id} media={item} onClick={onMediaClick} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
