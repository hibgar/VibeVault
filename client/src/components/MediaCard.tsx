import { Film, Tv, BookOpen, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type MediaType = "movie" | "show" | "book";
export type MediaStatus = "not_started" | "in_progress" | "completed";

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  status: MediaStatus;
  year?: number;
  coverUrl?: string;
  vibes: string[];
}

interface MediaCardProps {
  media: MediaItem;
  onRemove?: (id: string) => void;
  onClick?: (media: MediaItem) => void;
}

const typeIcons = {
  movie: Film,
  show: Tv,
  book: BookOpen,
};

const statusColors = {
  not_started: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  in_progress: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const typeColors = {
  movie: "bg-primary/20 text-primary border-primary/20",
  show: "bg-primary/10 text-primary border-primary/20",
  book: "bg-primary/30 text-primary border-primary/20",
};

export default function MediaCard({ media, onRemove, onClick }: MediaCardProps) {
  const Icon = typeIcons[media.type];

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer relative group border-none shadow-sm bg-card/50"
      onClick={() => onClick?.(media)}
      data-testid={`card-media-${media.id}`}
    >
      <div className="aspect-[4/5] bg-muted/30 relative overflow-hidden rounded-md m-2">
        {media.coverUrl ? (
          <img
            src={media.coverUrl}
            alt={media.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={cn("w-full h-full flex items-center justify-center", typeColors[media.type])}>
            <Icon className="w-8 h-8 opacity-40" />
          </div>
        )}
        {onRemove && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(media.id);
            }}
            data-testid={`button-remove-${media.id}`}
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
      <div className="px-3 pb-3 space-y-1.5">
        <h3 className="font-semibold text-sm line-clamp-1 leading-tight" data-testid={`text-title-${media.id}`}>
          {media.title}
        </h3>
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4 font-bold uppercase", typeColors[media.type])}>
            {media.type}
          </Badge>
          <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4 font-bold uppercase", statusColors[media.status])}>
            {media.status.replace("_", " ")}
          </Badge>
        </div>
        {media.vibes.length > 0 && (
          <div className="flex gap-1 overflow-x-auto scrollbar-hide pt-0.5">
            {media.vibes.slice(0, 2).map((vibe, idx) => (
              <span
                key={idx}
                className="text-[10px] text-muted-foreground whitespace-nowrap bg-muted/50 px-1 rounded"
              >
                #{vibe}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
