import { X, Film, Tv, BookOpen, Plus } from "lucide-react";
import { MediaItem } from "./MediaCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface MediaDetailModalProps {
  media: MediaItem;
  onClose: () => void;
  onUpdateVibes?: (mediaId: string, vibes: string[]) => void;
}

const typeIcons = {
  movie: Film,
  show: Tv,
  book: BookOpen,
};

export default function MediaDetailModal({
  media,
  onClose,
  onUpdateVibes,
}: MediaDetailModalProps) {
  const Icon = typeIcons[media.type];
  const [vibes, setVibes] = useState(media.vibes);
  const [newVibe, setNewVibe] = useState("");

  useEffect(() => {
    setVibes(media.vibes);
  }, [media.vibes]);

  const handleAddVibe = () => {
    if (!newVibe.trim()) return;
    const updated = [...vibes, newVibe.trim()];
    setVibes(updated);
    onUpdateVibes?.(media.id, updated);
    setNewVibe("");
  };

  const handleRemoveVibe = (index: number) => {
    const updated = vibes.filter((_, i) => i !== index);
    setVibes(updated);
    onUpdateVibes?.(media.id, updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-card border border-card-border rounded-t-2xl md:rounded-2xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
          data-testid="button-close-modal"
        >
          <X className="w-5 h-5" />
        </Button>

        {media.coverUrl ? (
          <div className="w-full aspect-[3/2] md:aspect-[5/3] relative overflow-hidden rounded-t-2xl">
            <img
              src={media.coverUrl}
              alt={media.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-[3/2] md:aspect-[5/3] bg-muted flex items-center justify-center rounded-t-2xl">
            <Icon className="w-24 h-24 text-muted-foreground" />
          </div>
        )}

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs font-semibold uppercase">
                {media.type}
              </Badge>
              {media.year && (
                <span className="text-sm text-muted-foreground">{media.year}</span>
              )}
            </div>
            <h2 className="text-2xl font-semibold" data-testid="text-modal-title">
              {media.title}
            </h2>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Vibe Tags</h3>

            <div className="flex flex-wrap gap-2">
              {vibes.map((vibe, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-sm font-accent pr-1"
                >
                  {vibe}
                  <button
                    onClick={() => handleRemoveVibe(idx)}
                    className="ml-2 hover-elevate rounded-full p-0.5"
                    data-testid={`button-remove-vibe-${idx}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add a vibe tag..."
                value={newVibe}
                onChange={(e) => setNewVibe(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddVibe()}
                data-testid="input-new-vibe"
              />
              <Button
                onClick={handleAddVibe}
                disabled={!newVibe.trim()}
                data-testid="button-add-vibe"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Vibe tags help us recommend the perfect content based on your current mood.
              Add your own or let AI analyze this {media.type} for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
