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
    <div className="flex flex-col h-full overflow-y-auto">
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
              isSelected={selectedMood === mood.id}
              onClick={() => handleMoodSelect(mood.id)}
            />
          ))}
        </div>

        {selectedMood && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={handleReset} data-testid="button-reset-vibe">
              Reset Selection
            </Button>
          </div>
        )}
      </div>

      {selectedMood && (
        <div className="px-6 pb-20">
          <h2 className="text-lg font-semibold mb-4">
            Recommendations for {moods.find((m) => m.id === selectedMood)?.label}
          </h2>

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
      )}
    </div>
  );
}
