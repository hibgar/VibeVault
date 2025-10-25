import { useState } from "react";
import { Film, Tv, BookOpen, Loader2, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaType } from "./MediaCard";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AddMediaProps {
  onMediaAdded?: () => void;
}

export default function AddMedia({ onMediaAdded }: AddMediaProps) {
  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState<MediaType>("movie");
  const [year, setYear] = useState("");
  const [vibeInput, setVibeInput] = useState("");
  const [vibes, setVibes] = useState<string[]>([]);
  const { toast } = useToast();

  const types: Array<{ id: MediaType; label: string; icon: typeof Tv }> = [
    { id: "show", label: "TV Show", icon: Tv },
    { id: "movie", label: "Movie", icon: Film },
    { id: "book", label: "Book", icon: BookOpen },
  ];

  const addMutation = useMutation({
    mutationFn: (data: { title: string; type: MediaType; year?: number; vibes: string[] }) =>
      apiRequest("POST", "/api/media", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
      setTitle("");
      setYear("");
      setVibes([]);
      onMediaAdded?.();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add media",
        variant: "destructive",
      });
    },
  });

  const handleAddVibe = () => {
    if (!vibeInput.trim()) return;
    setVibes([...vibes, vibeInput.trim()]);
    setVibeInput("");
  };

  const handleRemoveVibe = (index: number) => {
    setVibes(vibes.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addMutation.mutate({
      title: title.trim(),
      type: selectedType,
      year: year ? parseInt(year) : undefined,
      vibes,
    });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20">
      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Add to Library</h1>
          <p className="text-sm text-muted-foreground">
            Add shows, movies, or books to your collection
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Type</label>
            <div className="flex gap-2">
              {types.map((type) => {
                const Icon = type.icon;
                const isActive = selectedType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "flex-1 flex flex-col items-center gap-2 p-4 rounded-lg text-sm font-medium transition-colors hover-elevate active-elevate-2 border",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border"
                    )}
                    data-testid={`type-${type.id}`}
                  >
                    <Icon className="w-6 h-6" />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 text-base"
              data-testid="input-title"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="year" className="text-sm font-medium">
              Year (optional)
            </label>
            <Input
              id="year"
              type="number"
              placeholder="e.g. 2024"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="h-12 text-base"
              data-testid="input-year"
              min="1900"
              max="2100"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Vibe Tags (optional)</label>
            {vibes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {vibes.map((vibe, idx) => (
                  <Badge key={idx} variant="outline" className="text-sm pr-1">
                    {vibe}
                    <button
                      type="button"
                      onClick={() => handleRemoveVibe(idx)}
                      className="ml-2 hover-elevate rounded-full p-0.5"
                      data-testid={`button-remove-vibe-${idx}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Add a vibe (cozy, thrilling, etc.)"
                value={vibeInput}
                onChange={(e) => setVibeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddVibe())}
                className="h-10"
                data-testid="input-vibe"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddVibe}
                disabled={!vibeInput.trim()}
                data-testid="button-add-vibe"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Add tags like: cozy, thrilling, lighthearted, mysterious, uplifting
            </p>
          </div>

          <Button
            type="submit"
            className="w-full h-12"
            disabled={!title.trim() || addMutation.isPending}
            data-testid="button-submit"
          >
            {addMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Add to Library
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
