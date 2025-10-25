import AddMedia from "../AddMedia";

export default function AddMediaExample() {
  return (
    <div className="h-[600px]">
      <AddMedia onAdd={(result) => console.log("Added:", result)} />
    </div>
  );
}
