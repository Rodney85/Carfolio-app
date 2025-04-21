import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Car, Settings, Plus, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useTheme } from "../../providers/ThemeProvider";

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
        "flex flex-col items-center justify-center px-2",
        isActive ? "text-primary-500" : "text-gray-400"
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

// Theme toggle button for mobile
const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="flex flex-col items-center justify-center"
    >
      <div className="text-gray-400 p-2">
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </div>
      <span className="text-xs mt-1 text-gray-400">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
};

export const MobileNav: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/dashboard" },
    { icon: <Car size={20} />, label: "Cars", path: "/app/cars" },
    { icon: <Settings size={20} />, label: "Profile", path: "/profile" },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-900 border-t border-dark-800 z-30"
    >
      <div className="flex items-center justify-around h-16 px-4">
        {/* First three nav items */}
        {navItems.slice(0, 2).map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={location.pathname === item.path}
          />
        ))}
        
        {/* Add Car Button (Center) */}
        <Link
          to="/app/cars/new"
          className="flex flex-col items-center justify-center"
        >
          <div className="bg-primary-500 text-white p-3 rounded-full -mt-6 shadow-lg">
            <Plus size={20} />
          </div>
          <span className="text-xs mt-1 text-gray-400">Add Car</span>
        </Link>
        
        {/* Theme Toggle */}
        <ThemeToggleButton />
        
        {/* Last nav item */}
        {navItems.slice(2).map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={location.pathname === item.path}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default MobileNav;
