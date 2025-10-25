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

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    
    const filtered = media.filter((item) =>
      item.vibes.some((vibe) =>
        vibe.toLowerCase().includes(moodId.toLowerCase())
      )
    );
    
    setRecommendations(filtered);
    console.log(`Finding ${moodId} vibes...`, filtered);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setRecommendations([]);
  };

  return (
    <div className="flex flex-col h-full">
      {!selectedMood ? (
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold">What's Your Vibe?</h1>
              <p className="text-sm text-muted-foreground">
                Tell us how you're feeling and we'll recommend something perfect
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {moods.map((mood) => (
                <VibeMoodCard
                  key={mood.id}
                  icon={mood.icon}
                  label={mood.label}
                  isSelected={false}
                  onClick={() => handleMoodSelect(mood.id)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="p-6 pb-4 border-b border-border space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">
                  {moods.find((m) => m.id === selectedMood)?.label} Vibes
                </h1>
                <p className="text-sm text-muted-foreground">
                  {recommendations.length} {recommendations.length === 1 ? "match" : "matches"} found
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset} data-testid="button-reset-vibe">
                Change Vibe
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 pb-20">
            {recommendations.length === 0 ? (
              <EmptyState
                icon={moods.find((m) => m.id === selectedMood)?.icon || Heart}
                title="No matches found"
                description={`We couldn't find any media matching your ${selectedMood} vibe. Try adding more to your library or selecting a different mood.`}
              />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recommendations.map((item) => (
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
