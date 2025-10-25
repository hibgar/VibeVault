import { useState } from "react";
import BottomNavigation, { NavTab } from "../BottomNavigation";

export default function BottomNavigationExample() {
  const [activeTab, setActiveTab] = useState<NavTab>("library");

  return (
    <div className="h-20 relative">
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
