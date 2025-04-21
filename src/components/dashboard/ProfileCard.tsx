import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Copy, ExternalLink, Settings } from "lucide-react";
import { fadeIn } from "../../lib/animations";
import { useUser } from "@clerk/clerk-react";
import { getProfileUrl } from "../../lib/utils";

interface ProfileCardProps {
  isPro?: boolean;
  profileViews?: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isPro = false, profileViews = 0 }) => {
  const { user } = useUser();
  const username = user?.username || user?.id?.substring(0, 8) || 'user';
  const profileUrl = getProfileUrl(username);
  
  const copyProfileUrl = () => {
    const fullUrl = `${window.location.origin}${profileUrl}`;
    navigator.clipboard.writeText(fullUrl);
    // In a real app, you'd show a toast notification here
    alert("Profile URL copied to clipboard!");
  };

  if (!user) return null;

  return (
    <motion.div
      variants={fadeIn}
      className="bg-light-300 border border-gray-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-700 flex-shrink-0">
          {user.imageUrl && (
            <img 
              src={user.imageUrl} 
              alt={user.fullName || "User"} 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="font-bold text-lg">{user.fullName}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{user.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>
      
      {/* Subscription Badge */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 ${
          isPro 
            ? "bg-primary-500 text-white" 
            : "bg-primary-500/20 text-primary-400"
        } rounded-full text-sm`}>
          {isPro ? "Pro Plan" : "Free Plan"}
        </span>
        
        {profileViews > 0 && (
          <span className="px-3 py-1 bg-dark-700 text-gray-300 rounded-full text-sm">
            {profileViews} profile views
          </span>
        )}
      </div>
      
      {/* Public Profile URL */}
      <div className="mb-4 p-2 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-gray-500 dark:text-gray-400 text-sm">carfolio.com/</span>
          <span className="text-gray-900 dark:text-white text-sm font-medium truncate">{username}</span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={copyProfileUrl}
            className="p-1.5 hover:bg-dark-600 rounded-md transition"
            title="Copy profile URL"
          >
            <Copy size={14} />
          </button>
          <a 
            href={profileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 hover:bg-dark-600 rounded-md transition"
            title="Open profile in new tab"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
      
      {/* Manage Profile Button */}
      <Link 
        to="/profile" 
        className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 dark:hover:bg-dark-600 text-gray-700 dark:text-white rounded-lg transition"
      >
        <Settings size={16} />
        <span>Manage Profile</span>
      </Link>
    </motion.div>
  );
};

export default ProfileCard;
