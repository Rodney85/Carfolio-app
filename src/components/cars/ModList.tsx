import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mod } from "../../types/mod";
import { ModCategory } from "../../types/car";
import { formatCurrency } from "../../lib/utils";
import { fadeIn, listItem, staggerChildren } from "../../lib/animations";
import { useAnalytics } from "../../hooks/useAnalytics";

interface ModListProps {
  mods: Mod[];
}

export const ModList: React.FC<ModListProps> = ({ mods }) => {
  const [activeCategory, setActiveCategory] = useState<ModCategory | "All">("All");
  const { trackModClick } = useAnalytics();
  
  const categories = ["All", ...new Set(mods.map(mod => mod.category))];
  
  const filteredMods = activeCategory === "All" 
    ? mods 
    : mods.filter(mod => mod.category === activeCategory);

  const handleModClick = (mod: Mod) => {
    if (mod.affiliateLink) {
      trackModClick(mod.id);
      window.open(mod.affiliateLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Modifications</h2>
      
      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category as ModCategory | "All")}
            className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Mods List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredMods.length === 0 ? (
            <motion.p
              variants={fadeIn}
              className="col-span-full text-center text-gray-500 dark:text-gray-400"
            >
              No mods in this category
            </motion.p>
          ) : (
            filteredMods.map(mod => (
              <motion.div
                key={mod.id}
                variants={listItem}
                onClick={() => handleModClick(mod)}
                className={`rounded-lg border border-gray-200 bg-white p-4 transition-all dark:border-gray-800 dark:bg-gray-800 ${
                  mod.affiliateLink ? "cursor-pointer hover:border-primary hover:shadow-md" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{mod.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{mod.brand}</p>
                  </div>
                  {mod.price > 0 && (
                    <span className="font-medium text-primary">
                      {formatCurrency(mod.price)}
                    </span>
                  )}
                </div>
                
                {mod.description && (
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {mod.description}
                  </p>
                )}
                
                {mod.affiliateLink && (
                  <div className="mt-3 text-right">
                    <span className="text-xs text-primary">Shop Now →</span>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 