import { useState } from "react";
import { Film, Tv, BookOpen, Search } from "lucide-react";
import MediaCard, { MediaItem, MediaType } from "./MediaCard";
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

const categories = [
  { id: "all" as CategoryFilter, label: "All", icon: null },
  { id: "show" as CategoryFilter, label: "Shows", icon: Tv },
  { id: "movie" as CategoryFilter, label: "Movies", icon: Film },
  { id: "book" as CategoryFilter, label: "Books", icon: BookOpen },
];

export default function MediaLibrary({ media, onRemove, onMediaClick, onAddClick }: MediaLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedia = media.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.type === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-library-search"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors hover-elevate active-elevate-2 border",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border"
                  )}
                  data-testid={`filter-${cat.id}`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredMedia.length === 0 ? (
          <EmptyState
            icon={activeCategory === "all" ? Film : categories.find(c => c.id === activeCategory)?.icon || Film}
            title={`No ${activeCategory === "all" ? "media" : activeCategory + "s"} yet`}
            description={`Start building your collection by adding your favorite ${activeCategory === "all" ? "shows, movies, or books" : activeCategory + "s"}`}
            actionLabel={`Add ${activeCategory === "all" ? "media" : activeCategory}`}
            onAction={onAddClick}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-20">
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
