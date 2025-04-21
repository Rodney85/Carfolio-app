import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, ExternalLink, Share2 } from "lucide-react";
import { fadeIn } from "../../lib/animations";

interface PublicProfileLinkProps {
  username: string;
}

const PublicProfileLink: React.FC<PublicProfileLinkProps> = ({ username }) => {
  const [copied, setCopied] = useState(false);
  
  const profileUrl = `${window.location.origin}/${username}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <motion.div
      variants={fadeIn}
      className="bg-light-300 border border-gray-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Your Public Profile</h3>
        <a 
          href={`/${username}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1"
        >
          View <ExternalLink size={14} />
        </a>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Share this link on your social media to showcase your car builds
      </p>
      
      <div className="flex items-center gap-2">
        <div className="flex-grow bg-gray-100 dark:bg-dark-700 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-300 truncate">
          {profileUrl}
        </div>
        <button
          onClick={copyToClipboard}
          className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-dark-700 dark:hover:bg-dark-600 rounded-lg transition flex items-center justify-center"
          title="Copy to clipboard"
        >
          <Copy size={18} className={copied ? "text-primary-500" : "text-gray-500 dark:text-gray-400"} />
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `${username}'s Car Builds`,
                text: `Check out my car builds on Carfolio!`,
                url: profileUrl,
              });
            } else {
              copyToClipboard();
            }
          }}
          className="p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition flex items-center justify-center"
          title="Share profile"
        >
          <Share2 size={18} className="text-white" />
        </button>
      </div>
    </motion.div>
  );
};

export default PublicProfileLink;
