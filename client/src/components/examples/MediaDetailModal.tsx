import { useState } from "react";
import MediaDetailModal from "../MediaDetailModal";
import { Button } from "@/components/ui/button";
import thrillerCover from "@assets/generated_images/Thriller_movie_cover_placeholder_31c2e25c.png";

export default function MediaDetailModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const mockMedia = {
    id: "1",
    title: "The Dark Mystery",
    type: "movie" as const,
    status: "completed" as const,
    year: 2024,
    coverUrl: thrillerCover,
    vibes: ["Thrilling", "Mysterious", "Intense"],
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      {isOpen && (
        <MediaDetailModal
          media={mockMedia}
          onClose={() => setIsOpen(false)}
          onUpdateVibes={(id, vibes) =>
            console.log("Updated vibes:", id, vibes)
          }
        />
      )}
    </div>
  );
}
