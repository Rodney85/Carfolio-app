import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Car, Plus, BarChart2, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { MdOutlineHub } from "react-icons/md";
import { cn } from "../../lib/utils";
import { slowSpin } from "../../lib/animations";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, isActive }) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex flex-col items-center justify-center px-2 transition-all duration-200",
        isActive ? "text-primary-500" : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
      )}
    >
      <div className={cn(
        "flex-shrink-0 transition-transform duration-200",
        isActive ? "text-primary-500" : "",
        "hover:scale-110 group-hover:scale-105"
      )}>{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

// Removed unused ThemeToggleButton component

export const MobileNav: React.FC = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800 z-30"
    >
      <div className="flex items-center justify-around h-16 px-4">
        {/* CarFolio Logo/Icon */}
        <motion.div
          variants={slowSpin}
          animate="animate"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-300 dark:bg-dark-900 rounded-full p-2 border border-gray-200 dark:border-dark-800 shadow-md"
        >
          <MdOutlineHub size={24} className="text-primary-500 dark:text-primary-400" />
        </motion.div>
        {/* Standard Navigation Items */}
        <NavItem
          key="dashboard"
          icon={<Home size={20} />}
          label="Dashboard"
          path="/dashboard"
          isActive={location.pathname === "/dashboard"}
        />
        
        <NavItem
          key="cars"
          icon={<Car size={20} />}
          label="My Cars"
          path="/cars"
          isActive={location.pathname === "/cars"}
        />
        
        {/* Add Car button in the center */}
        <Link
          to="/cars/new"
          className="flex flex-col items-center justify-center"
        >
          <div className="bg-primary-500 text-white p-3 rounded-full -mt-6 shadow-lg hover:bg-primary-600 transition-colors duration-200">
            <Plus size={20} />
          </div>
          <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Add Car</span>
        </Link>
        
        <NavItem
          key="analytics"
          icon={<BarChart2 size={20} />}
          label="Analytics"
          path="/analytics"
          isActive={location.pathname === "/analytics"}
        />
        
        <NavItem
          key="settings"
          icon={<Settings size={20} />}
          label="Settings"
          path="/settings"
          isActive={location.pathname === "/settings"}
        />
      </div>
    </motion.div>
  );
};

export default MobileNav;
