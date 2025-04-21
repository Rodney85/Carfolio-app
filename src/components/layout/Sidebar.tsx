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
  X
} from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { ThemeToggle } from "../shared/ThemeToggle";
import { fadeIn, slideUp } from "../../lib/animations";
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
        "flex items-center gap-3 px-3 py-3 rounded-lg transition-all",
        isActive 
          ? "bg-primary-500/10 text-primary-500" 
          : "hover:bg-dark-800 text-gray-400 hover:text-white"
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      {isOpen && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          className="whitespace-nowrap overflow-hidden"
        >
          {label}
        </motion.span>
      )}
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();
  
  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Car size={20} />, label: "My Cars", path: "/app/cars" },
    { icon: <BarChart2 size={20} />, label: "Analytics", path: "/app/analytics" },
    { icon: <Settings size={20} />, label: "Settings", path: "/profile" },
  ];

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className={cn(
        "h-screen fixed left-0 top-0 z-30 flex flex-col bg-dark-900 border-r border-dark-800 transition-all duration-300 shadow-xl hidden md:flex",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Close button - only visible when sidebar is open */}
      {isOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute right-2 top-2 p-1 rounded-md hover:bg-dark-800 text-gray-400 hover:text-white"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      )}

      {/* Collapse/Expand button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-dark-900 border border-dark-800 rounded-full p-1 text-gray-400 hover:text-white shadow-md hidden md:flex"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Logo and App Name */}
      <div className={cn(
        "flex items-center px-4 py-5",
        isOpen ? "justify-start" : "justify-center"
      )}>
        <div className="text-2xl font-bold text-primary-500">🚗</div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 text-xl font-bold"
          >
            Carfolio
          </motion.div>
        )}
      </div>

      {/* User Profile */}
      <div className={cn(
        "flex items-center px-4 py-4 border-b border-dark-800",
        isOpen ? "justify-start" : "justify-center"
      )}>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-dark-800 flex-shrink-0">
          {user?.imageUrl && (
            <img 
              src={user.imageUrl} 
              alt={user.fullName || "User"} 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-3 overflow-hidden"
          >
            <div className="font-medium truncate">
              {user?.fullName || "User"}
            </div>
            <div className="text-xs text-gray-400 truncate">
              {user?.primaryEmailAddress?.emailAddress || ""}
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <motion.nav variants={slideUp} className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
              isOpen={isOpen}
            />
          ))}
        </motion.nav>
      </div>

      {/* Theme Toggle and Logout */}
      <div className={cn(
        "mt-auto p-4 border-t border-dark-800",
        isOpen ? "flex justify-between items-center" : "flex flex-col gap-4 items-center"
      )}>
        <ThemeToggle className="flex-shrink-0" />
        
        {isOpen ? (
          <button
            onClick={() => signOut()}
            className="text-gray-400 hover:text-white flex items-center gap-2"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signOut()}
            className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-dark-800"
            title="Sign Out"
          >
            <Settings size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
