import { useState } from "react";
import MediaLibrary from "../MediaLibrary";
import { MediaItem } from "../MediaCard";
import thrillerCover from "@assets/generated_images/Thriller_movie_cover_placeholder_31c2e25c.png";
import bookCover from "@assets/generated_images/Fiction_book_cover_placeholder_657c3f32.png";
import showCover from "@assets/generated_images/Comedy_show_cover_placeholder_b9616d13.png";

const mockMedia: MediaItem[] = [
  {
    id: "1",
    title: "The Dark Mystery",
    type: "movie",
    year: 2024,
    coverUrl: thrillerCover,
    vibes: ["Thrilling", "Mysterious", "Intense"],
  },
  {
    id: "2",
    title: "Cozy Reads",
    type: "book",
    year: 2023,
    coverUrl: bookCover,
    vibes: ["Cozy", "Thoughtful", "Warm"],
  },
  {
    id: "3",
    title: "Happy Days",
    type: "show",
    year: 2024,
    coverUrl: showCover,
    vibes: ["Lighthearted", "Fun", "Uplifting"],
  },
];

export default function MediaLibraryExample() {
  const [media, setMedia] = useState(mockMedia);

  return (
    <div className="h-[600px]">
      <MediaLibrary
        media={media}
        onRemove={(id) => {
          console.log("Remove:", id);
          setMedia(media.filter(m => m.id !== id));
        }}
        onMediaClick={(m) => console.log("Clicked:", m)}
        onAddClick={() => console.log("Add clicked")}
      />
    </div>
  );
}
