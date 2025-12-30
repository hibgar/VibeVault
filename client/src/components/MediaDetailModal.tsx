import { X, Film, Tv, BookOpen, Plus, CheckCircle2, PlayCircle, Circle } from "lucide-react";
import { MediaItem, MediaStatus } from "./MediaCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MediaDetailModalProps {
  media: MediaItem;
  onClose: () => void;
  onUpdateVibes?: (mediaId: string, vibes: string[]) => void;
  onUpdateStatus?: (mediaId: string, status: MediaStatus) => void;
}

const typeIcons = {
  movie: Film,
  show: Tv,
  book: BookOpen,
};

const statusOptions: Array<{ id: MediaStatus; label: string; icon: typeof Circle }> = [
  { id: "not_started", label: "Not Started", icon: Circle },
  { id: "in_progress", label: "In Progress", icon: PlayCircle },
  { id: "completed", label: "Completed", icon: CheckCircle2 },
];

export default function MediaDetailModal({
  media,
  onClose,
  onUpdateVibes,
  onUpdateStatus,
}: MediaDetailModalProps) {
  const Icon = typeIcons[media.type];
  const [vibes, setVibes] = useState(media.vibes);
  const [newVibe, setNewVibe] = useState("");

  useEffect(() => {
    setVibes(media.vibes);
  }, [media.vibes]);

  const handleAddVibe = () => {
    if (!newVibe.trim()) return;
    if (vibes.includes(newVibe.trim())) {
      setNewVibe("");
      return;
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative bg-card border border-card-border rounded-3xl w-full md:max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 rounded-full bg-background/50 backdrop-blur-md"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="p-8 space-y-8">
          <div className="flex gap-6 items-start">
            <div className="w-24 aspect-[4/5] bg-muted/30 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner border border-card-border/50">
              {media.coverUrl ? (
                <img src={media.coverUrl} alt={media.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-20">
                  <Icon className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="space-y-3 pt-1">
              <div className="flex gap-2">
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20 bg-primary/5 text-primary">
                  {media.type}
                </Badge>
                {media.year && <span className="text-xs text-muted-foreground font-medium">{media.year}</span>}
              </div>
              <h2 className="text-2xl font-bold tracking-tight leading-tight">
                {media.title}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Current Status</label>
            <div className="flex gap-2">
              {statusOptions.map((status) => {
                const StatusIcon = status.icon;
                const isActive = media.status === status.id;
                return (
                  <button
                    key={status.id}
                    onClick={() => onUpdateStatus?.(media.id, status.id)}
                    className={cn(
                      "flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all border shadow-sm",
                      isActive
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background/50 text-muted-foreground border-card-border hover:bg-muted/50"
                    )}
                  >
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase whitespace-nowrap">{status.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Vibe Collection</label>
              <span className="text-[10px] font-bold text-muted-foreground/50">{vibes.length} TAGS</span>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[2rem]">
              {vibes.map((vibe, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="pl-3 pr-1 py-1 rounded-full text-xs font-medium border-none bg-primary/10 text-primary"
                >
                  {vibe}
                  <button
                    onClick={() => handleRemoveVibe(idx)}
                    className="ml-1.5 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="New vibe..."
                value={newVibe}
                onChange={(e) => setNewVibe(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddVibe()}
                className="h-11 bg-muted/20 border-none rounded-xl px-4"
              />
              <Button
                onClick={handleAddVibe}
                disabled={!newVibe.trim()}
                className="h-11 w-11 rounded-xl"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
