import { User, BarChart3, Settings, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

interface ProfilePageProps {
  mediaCount: {
    shows: number;
    movies: number;
    books: number;
  };
}

export default function ProfilePage({ mediaCount }: ProfilePageProps) {
  const total = mediaCount.shows + mediaCount.movies + mediaCount.books;

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20">
      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Your Library</h1>
            <p className="text-sm text-muted-foreground">
              {total} {total === 1 ? "item" : "items"} in your collection
            </p>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Collection Stats</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">TV Shows</span>
              <span className="font-medium" data-testid="stat-shows">
                {mediaCount.shows}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Movies</span>
              <span className="font-medium" data-testid="stat-movies">
                {mediaCount.movies}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Books</span>
              <span className="font-medium" data-testid="stat-books">
                {mediaCount.books}
              </span>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <h2 className="font-semibold">Settings</h2>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Theme</span>
              </div>
              <ThemeToggle />
            </div>
          </Card>
        </div>

        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("Clear library")}
            data-testid="button-clear-library"
          >
            Clear Library
          </Button>
        </div>
      </div>
    </div>
  );
}
