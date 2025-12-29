import { useState } from "react";
import { Film, Tv, BookOpen, Search } from "lucide-react";
import MediaCard, { MediaItem, MediaType, MediaStatus } from "./MediaCard";
import EmptyState from "./EmptyState";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MediaLibraryProps {
  media: MediaItem[];
  onRemove?: (id: string) => void;
  onMediaClick?: (media: MediaItem) => void;
  onAddClick?: () => void;
}

type CategoryFilter = "all" | MediaType;
type StatusFilter = "all" | MediaStatus;

const categories = [
  { id: "all" as CategoryFilter, label: "All", icon: null },
  { id: "show" as CategoryFilter, label: "Shows", icon: Tv },
  { id: "movie" as CategoryFilter, label: "Movies", icon: Film },
  { id: "book" as CategoryFilter, label: "Books", icon: BookOpen },
];

const statuses = [
  { id: "all" as StatusFilter, label: "All Status" },
  { id: "not_started" as StatusFilter, label: "Not Started" },
  { id: "in_progress" as StatusFilter, label: "In Progress" },
  { id: "completed" as StatusFilter, label: "Completed" },
];

export default function MediaLibrary({ media, onRemove, onMediaClick, onAddClick }: MediaLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedia = media.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.type === activeCategory;
    const matchesStatus = activeStatus === "all" || item.status === activeStatus;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-10">
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/20 border-none h-10"
              data-testid="input-library-search"
            />
          </div>

          <div className="space-y-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all border",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/50"
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {statuses.map((status) => {
                const isActive = activeStatus === status.id;
                return (
                  <button
                    key={status.id}
                    onClick={() => setActiveStatus(status.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all border",
                      isActive
                        ? "bg-foreground text-background border-foreground shadow-sm"
                        : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/50"
                    )}
                  >
                    {status.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredMedia.length === 0 ? (
          <EmptyState
            icon={activeCategory === "all" ? Film : categories.find(c => c.id === activeCategory)?.icon || Film}
            title="No matches"
            description="Try adjusting your filters or search terms"
            actionLabel="Clear Filters"
            onAction={() => {
              setActiveCategory("all");
              setActiveStatus("all");
              setSearchQuery("");
            }}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pb-20">
            {filteredMedia.map((item) => (
              <MediaCard
                key={item.id}
                media={item}
                onRemove={onRemove}
                onClick={onMediaClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
