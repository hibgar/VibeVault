import { Film } from "lucide-react";
import EmptyState from "../EmptyState";

export default function EmptyStateExample() {
  return (
    <EmptyState
      icon={Film}
      title="No movies yet"
      description="Start building your collection by adding your favorite movies"
      actionLabel="Add your first movie"
      onAction={() => console.log("Add movie clicked")}
    />
  );
}
