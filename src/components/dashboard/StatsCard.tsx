import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/animations";

interface StatItemProps {
  value: number | string;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export const StatItem: React.FC<StatItemProps> = ({ value, label, icon, highlight = false }) => {
  return (
    <div 
      className={`bg-gray-100 dark:bg-dark-700 rounded-lg p-4 text-center ${
        highlight ? "ring-2 ring-primary-500/50" : ""
      }`}
    >
      {icon && <div className="mb-1 flex justify-center">{icon}</div>}
      <p className={`text-2xl font-bold ${highlight ? "text-primary-500" : "text-gray-800 dark:text-white"}`}>
        {value}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  stats: {
    value: number | string;
    label: string;
    icon?: React.ReactNode;
    highlight?: boolean;
  }[];
}

const StatsCard: React.FC<StatsCardProps> = ({ title, stats }) => {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-light-300 border border-gray-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-6 shadow-sm"
    >
      <h3 className="font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
            highlight={stat.highlight}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default StatsCard;
