import React from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeIn } from "../../lib/animations";

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  link: string;
}

interface OnboardingChecklistProps {
  items: ChecklistItem[];
  progress: number; // 0-100
}

const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({ items, progress }) => {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-light-300 border border-gray-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Get Started</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">{progress}% complete</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-dark-700 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-primary-500 rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Checklist */}
      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition"
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                item.completed 
                  ? "bg-primary-500 text-white" 
                  : "bg-gray-200 dark:bg-dark-700 text-gray-500 dark:text-gray-400"
              }`}>
                {item.completed ? (
                  <Check size={14} />
                ) : (
                  <span className="text-xs">{items.findIndex(i => i.id === item.id) + 1}</span>
                )}
              </div>
              <span className={item.completed ? "text-gray-400 dark:text-gray-300 line-through" : "text-gray-800 dark:text-white"}>
                {item.label}
              </span>
            </div>
            <ChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default OnboardingChecklist;
