import { useState } from "react";
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
} from "lucide-react";
import VibeMoodCard from "./VibeMoodCard";
import MediaCard, { MediaItem } from "./MediaCard";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";

interface VibeFinderProps {
  media: MediaItem[];
  onMediaClick?: (media: MediaItem) => void;
}

const moods = [
  { id: "cozy", label: "Cozy", icon: Heart },
  { id: "intense", label: "Intense", icon: Zap },
  { id: "lighthearted", label: "Lighthearted", icon: Smile },
  { id: "thoughtful", label: "Thoughtful", icon: Brain },
  { id: "thrilling", label: "Thrilling", icon: Flame },
  { id: "relaxing", label: "Relaxing", icon: Cloud },
  { id: "inspiring", label: "Inspiring", icon: Lightbulb },
  { id: "escapist", label: "Escapist", icon: Music },
  { id: "energetic", label: "Energetic", icon: Coffee },
  { id: "adventurous", label: "Adventurous", icon: Mountain },
  { id: "mysterious", label: "Mysterious", icon: Moon },
  { id: "uplifting", label: "Uplifting", icon: Sun },
];

export default function VibeFinder({ media, onMediaClick }: VibeFinderProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<MediaItem[]>([]);

  // Get all unique vibes currently in the library
  const availableVibes = Array.from(
    new Set(media.flatMap((item) => item.vibes))
  ).sort();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    
    const filtered = media.filter((item) =>
      item.vibes.some((v) =>
        v.toLowerCase() === mood.toLowerCase()
      )
    );
    
    setRecommendations(filtered);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setRecommendations([]);
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
          <div className="p-6 pb-4 bg-background/80 backdrop-blur-md border-b border-border space-y-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                {selectedMood} <span className="text-muted-foreground font-medium text-lg ml-1">Vibes</span>
              </h1>
              <Button variant="outline" size="sm" className="rounded-full px-4 h-8 text-[11px] font-bold uppercase" onClick={handleReset}>
                Back
              </Button>
            </div>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
              {recommendations.length} {recommendations.length === 1 ? "match" : "matches"} found
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {recommendations.map((item) => (
                <MediaCard key={item.id} media={item} onClick={onMediaClick} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
