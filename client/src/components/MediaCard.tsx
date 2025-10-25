import { Film, Tv, BookOpen, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type MediaType = "movie" | "show" | "book";

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
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

export default function MediaCard({ media, onRemove, onClick }: MediaCardProps) {
  const Icon = typeIcons[media.type];

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer relative group"
      onClick={() => onClick?.(media)}
      data-testid={`card-media-${media.id}`}
    >
      <div className="aspect-[2/3] bg-muted relative overflow-hidden rounded-t-md">
        {media.coverUrl ? (
          <img
            src={media.coverUrl}
            alt={media.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        {onRemove && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(media.id);
            }}
            data-testid={`button-remove-${media.id}`}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="p-3 space-y-1">
        <h3 className="font-medium text-base line-clamp-2 leading-tight" data-testid={`text-title-${media.id}`}>
          {media.title}
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs font-semibold uppercase">
            {media.type}
          </Badge>
          {media.year && (
            <span className="text-xs text-muted-foreground">{media.year}</span>
          )}
        </div>
        {media.vibes.length > 0 && (
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pt-1">
            {media.vibes.slice(0, 3).map((vibe, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs font-accent shrink-0"
              >
                {vibe}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
