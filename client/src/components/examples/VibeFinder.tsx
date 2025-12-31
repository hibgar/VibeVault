import VibeFinder from "../VibeFinder";
import { MediaItem } from "../MediaCard";
import thrillerCover from "@assets/generated_images/Thriller_movie_cover_placeholder_31c2e25c.png";
import bookCover from "@assets/generated_images/Fiction_book_cover_placeholder_657c3f32.png";
import showCover from "@assets/generated_images/Comedy_show_cover_placeholder_b9616d13.png";

const mockMedia: MediaItem[] = [
  {
    id: "1",
    title: "The Dark Mystery",
    type: "movie",
    status: "completed",
    year: 2024,
    coverUrl: thrillerCover,
    vibes: ["Thrilling", "Mysterious", "Intense"],
  },
  {
    id: "2",
    title: "Cozy Reads",
    type: "book",
    status: "in_progress",
    year: 2023,
    coverUrl: bookCover,
    vibes: ["Cozy", "Thoughtful", "Relaxing"],
  },
  {
    id: "3",
    title: "Happy Days",
    type: "show",
    status: "not_started",
    year: 2024,
    coverUrl: showCover,
    vibes: ["Lighthearted", "Uplifting", "Energetic"],
  },
];

export default function VibeFinderExample() {
  return (
    <div className="h-[700px]">
      <VibeFinder
        media={mockMedia}
        onMediaClick={(m) => console.log("Clicked:", m)}
      />
    </div>
  );
}
