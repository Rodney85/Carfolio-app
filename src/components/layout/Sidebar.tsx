import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Car,
  Settings,
  BarChart2,
  ChevronRight,
  ChevronLeft,
  X,
  ImageIcon,
  Share2,
  Plus,
  Heart,
  LogOut
} from "lucide-react";
import { UserButton, useAuth } from "@clerk/clerk-react";

import { fadeIn } from "../../lib/animations";
import { cn } from "../../lib/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, isActive, isOpen }) => {
  return (
    <Link
      to={path}
      className={cn(
        "relative flex items-center rounded-lg transition-all group",
        isOpen ? "px-3 py-2" : "p-2",
        isActive
          ? "bg-primary-500/10 text-primary-500"
          : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/60 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-dark-800/60"
      )}
      title={!isOpen ? label : undefined}
    >
      <div
        className={cn(
          "flex-shrink-0 transition-transform",
          isOpen ? "group-hover:scale-105" : "group-hover:scale-110",
          isActive && "text-primary-500"
        )}
      >
        {icon}
      </div>
      {isOpen && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          className="ml-3 whitespace-nowrap overflow-hidden"
        >
          {label}
        </motion.span>
      )}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  // Navigation items grouped by section based on PRD requirements
  const navSections = {
    main: [
      { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
      { icon: <Car size={20} />, label: "My Cars", path: "/cars" },
      { icon: <Plus size={20} />, label: "Add Car", path: "/cars/new" },
    ],
    content: [
      { icon: <ImageIcon size={20} />, label: "Media Gallery", path: "/gallery" },
      { icon: <Share2 size={20} />, label: "Share Profile", path: "/share" },
      { icon: <Heart size={20} />, label: "Saved Parts", path: "/saved" },
    ],
    system: [
      { icon: <BarChart2 size={20} />, label: "Analytics", path: "/analytics" },
      { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
    ]
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className={cn(
        "h-screen fixed left-0 top-0 z-30 flex flex-col bg-white border-r border-gray-200 dark:bg-dark-900 dark:border-dark-800 transition-all duration-300 shadow-xl hidden md:flex",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Close button - only visible when sidebar is open */}
      {isOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute right-2 top-2 p-1 rounded-md hover:bg-gray-200 text-gray-500 hover:text-gray-900 dark:hover:bg-dark-800 dark:text-gray-400 dark:hover:text-white"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      )}

      {/* Collapse/Expand button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white border border-gray-200 dark:bg-dark-900 dark:border-dark-800 rounded-full p-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white shadow-md hidden md:flex"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Logo and App Name */}
      <div className={cn(
        "flex items-center px-4 py-5",
        "justify-start"
      )}>
        <div className="text-2xl font-bold bg-primary-500 text-white p-2 rounded-lg transition-transform hover:scale-105">
          <Car size={24} />
        </div>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-3 text-xl font-bold text-gray-900 dark:text-white"
          >
            CarMods
          </motion.span>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-dark-700">
        {Object.entries(navSections).map(([section, items]) => (
          <div key={section} className="space-y-1">
            {items.map((item) => (
              <NavItem
                key={item.path}
                {...item}
                isActive={location.pathname === item.path}
                isOpen={isOpen}
              />
            ))}
            {section !== "system" && <div className="border-t border-gray-200 dark:border-dark-800 my-4" />}
          </div>
        ))}
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-800 flex items-center justify-between">
        <div className="flex flex-col items-center">
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10", // Make avatar larger
                userButtonAvatarBox: "w-10 h-10",
                userButtonTrigger: "w-10 h-10"
              }
            }}
          />
          {!isOpen && (
            <button
              onClick={() => signOut()}
              className="mt-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
        
        {isOpen && (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;