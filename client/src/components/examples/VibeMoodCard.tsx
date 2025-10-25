import { Heart } from "lucide-react";
import VibeMoodCard from "../VibeMoodCard";
import { useState } from "react";

export default function VibeMoodCardExample() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="max-w-[150px]">
      <VibeMoodCard
        icon={Heart}
        label="Cozy"
        isSelected={selected}
        onClick={() => setSelected(!selected)}
      />
    </div>
  );
}
