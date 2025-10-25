import { useState } from "react";
import { Search, Film, Tv, BookOpen, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MediaType } from "./MediaCard";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  type: MediaType;
  year?: number;
  coverUrl?: string;
}

interface AddMediaProps {
  onAdd?: (result: SearchResult) => void;
}

export default function AddMedia({ onAdd }: AddMediaProps) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<MediaType | "all">("all");
  const [isSearching, setIsSearching] = useState(false);

  const types = [
    { id: "all" as const, label: "All", icon: Search },
    { id: "show" as const, label: "Shows", icon: Tv },
    { id: "movie" as const, label: "Movies", icon: Film },
    { id: "book" as const, label: "Books", icon: BookOpen },
  ];

  const handleSearch = () => {
    if (!query.trim()) return;
    
    console.log("Searching for:", query, "Type:", selectedType);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Add to Library</h1>
          <p className="text-sm text-muted-foreground">
            Search for shows, movies, or books to add to your collection
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {types.map((type) => {
            const Icon = type.icon;
            const isActive = selectedType === type.id;

            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors hover-elevate active-elevate-2 border",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border"
                )}
                data-testid={`type-filter-${type.id}`}
              >
                <Icon className="w-4 h-4" />
                {type.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 h-12 text-base"
              data-testid="input-media-search"
            />
          </div>

          <Button
            onClick={handleSearch}
            disabled={!query.trim() || isSearching}
            className="w-full h-12"
            data-testid="button-search"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-20">
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <Sparkles className="w-16 h-16 text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Start Searching</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Enter a title above to search for media. We'll find it and automatically
              tag it with AI-generated vibe traits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
