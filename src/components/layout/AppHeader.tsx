import React from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "../shared/ThemeToggle";
import { fadeIn } from "../../lib/animations";

export const AppHeader: React.FC = () => {
  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="hidden md:flex items-center justify-between py-3 px-6 border-b border-gray-200 dark:border-dark-800 bg-light-300 dark:bg-dark-900"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">🚗</span>
        <h1 className="text-xl font-bold">Carfolio</h1>
      </div>
      
      <ThemeToggle />
    </motion.header>
  );
};

export default AppHeader;
