import MediaCard from "../MediaCard";
import thrillerCover from "@assets/generated_images/Thriller_movie_cover_placeholder_31c2e25c.png";

export default function MediaCardExample() {
  return (
    <div className="max-w-[200px]">
      <MediaCard
        media={{
          id: "1",
          title: "The Dark Mystery",
          type: "movie",
          status: "completed",
          year: 2024,
          coverUrl: thrillerCover,
          vibes: ["Thrilling", "Mysterious", "Intense"],
        }}
        onRemove={(id) => console.log("Remove clicked:", id)}
        onClick={(media) => console.log("Media clicked:", media)}
      />
    </div>
  );
}
