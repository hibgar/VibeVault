import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VibeMoodCardProps {
  icon: LucideIcon;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function VibeMoodCard({
  icon: Icon,
  label,
  isSelected,
  onClick,
}: VibeMoodCardProps) {
  return (
    <Card
      className={cn(
        "p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover-elevate active-elevate-2 transition-all aspect-square",
        isSelected && "border-primary border-2"
      )}
      onClick={onClick}
      data-testid={`card-mood-${label.toLowerCase()}`}
    >
      <Icon className={cn("w-8 h-8", isSelected ? "text-primary" : "text-foreground")} />
      <span className={cn("text-sm font-medium text-center", isSelected && "text-primary")}>
        {label}
      </span>
    </Card>
  );
}
