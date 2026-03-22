import { Home, Search, Library, Plus } from "lucide-react";
import { motion } from "motion/react";

export default function BottomNav({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: (t: string) => void;
}) {
  const navItems = [
    { id: "home", icon: Home, label: "Início" },
    { id: "search", icon: Search, label: "Buscar" },
    { id: "library", icon: Library, label: "Sua Biblioteca" },
    { id: "create", icon: Plus, label: "Criar" },
  ];

  return (
    <div className="h-[72px] bg-transparent flex items-center justify-around px-2 pb-4 pt-2 z-40 relative">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <motion.button
            whileTap={item.id !== "library" ? { scale: 0.85 } : {}}
            key={item.id}
            onClick={() => item.id !== "library" && setCurrentTab(item.id)}
            className={`flex flex-col items-center gap-1 ${isActive ? "text-white" : "text-neutral-400 hover:text-neutral-300"} ${item.id === "library" ? "cursor-default" : ""}`}
          >
            <motion.div
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                className={isActive && item.id === "home" ? "fill-white" : ""}
              />
            </motion.div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
