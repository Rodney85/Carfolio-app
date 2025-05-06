import React from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "../../lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-md transition-all duration-300 ease-in-out",
        theme === "dark" 
          ? "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-yellow-300" 
          : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-amber-600",
        className
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </motion.button>
  );
}; 