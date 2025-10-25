import AddMedia from "../AddMedia";

export default function AddMediaExample() {
  return (
    <div className="h-[600px]">
      <AddMedia onMediaAdded={() => console.log("Media added!")} />
    </div>
  );
}
