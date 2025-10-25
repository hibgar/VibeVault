import { Library, Plus, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavTab = "library" | "add" | "vibe" | "profile";

interface BottomNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const tabs = [
  { id: "library" as NavTab, label: "Library", icon: Library },
  { id: "add" as NavTab, label: "Add", icon: Plus },
  { id: "vibe" as NavTab, label: "Vibe", icon: Sparkles },
  { id: "profile" as NavTab, label: "Profile", icon: User },
];

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border h-16 flex items-center justify-around px-2 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 min-w-[60px] h-12 rounded-md transition-colors hover-elevate active-elevate-2",
              isActive && "text-primary"
            )}
            data-testid={`nav-${tab.id}`}
          >
            <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
