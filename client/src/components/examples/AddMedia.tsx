import AddMedia from "../AddMedia";

export default function AddMediaExample() {
  return (
    <div className="h-[600px]">
      <AddMedia
        userId="example-user-id"
        onMediaAdded={() => console.log("Media added!")}
      />
    </div>
  );
}
