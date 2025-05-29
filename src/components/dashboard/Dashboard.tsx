import { motion, AnimatePresence } from "framer-motion";
import { User, BarChart3, TrendingUp, ChevronRight, X } from "lucide-react";
import GradientCard from "../ui/GradientCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useTheme } from "../../hooks/useTheme";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import EditProfileForm from "../auth/EditProfileForm";
import { fadeIn, staggerChildren } from "../../lib/animations";
import LoadingSpinner from "../shared/LoadingSpinner";

export default function Dashboard() {
  // Get user information directly from Clerk
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  
  // Get user profile from Convex
  const userProfile = useQuery(api.users.getUserProfile);
  const [userBio, setUserBio] = useState<string>("");
  
  // Initialize user data from Convex when available
  useEffect(() => {
    if (isLoaded) {
      console.log('Authentication status:', isSignedIn ? 'Signed In' : 'Signed Out');
      
      // Set bio from Convex profile if available
      if (userProfile) {
        // Only update if we have data from Convex
        if (userProfile.bio) {
          setUserBio(userProfile.bio);
        } else if (!userBio) {
          // Set default bio only if we don't have one yet
          setUserBio("Car enthusiast and modifier. Building awesome rides for the modern road.");
        }
      }
    }
  }, [isLoaded, isSignedIn, userProfile, userBio]);
  
  if (!isLoaded || !user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  return (
    <>
      {/* Modals */}
      <AnimatePresence>
        {detailsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setDetailsOpen(false)}
          >
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-light-300 dark:bg-dark-900 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-800">
                <h3 className="font-bold text-lg">Profile Details</h3>
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-dark-800 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Profile Details Content */}
              <div className="p-4">
                <div className="flex flex-col items-center mb-6">
                  {user?.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center mb-4">
                      <User className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                  <h2 className="text-xl font-bold">{user?.username ? `@${user.username}` : ''}</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                    <p>{user?.primaryEmailAddress?.emailAddress || 'No email provided'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
                    <p className="text-gray-700 dark:text-gray-300">{userBio}</p>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setDetailsOpen(false);
                        setEditProfileOpen(true);
                      }}
                      className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {editProfileOpen && (
          <EditProfileForm 
            isOpen={editProfileOpen}
            onClose={() => setEditProfileOpen(false)}
            userBio={userBio}
            onBioUpdate={(newBio) => setUserBio(newBio)}
          />
        )}
      </AnimatePresence>
      
      {/* Main Dashboard */}
      <motion.div 
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
        className="p-6 flex-1"
      >
        {/* Dashboard Title - Top Row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 bg-transparent border border-gray-200 dark:border-dark-700 text-gray-700 dark:text-gray-300 rounded-lg transition hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              <span className="sr-only">Toggle Theme</span>
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile Preview */}
          <div className="lg:col-span-5">
            <GradientCard
              color="brand"
              className="h-full p-6 flex flex-col items-center justify-center text-center relative border-2 border-brand-200 dark:border-brand-700/40 shadow-lg"
            >
              <div className="flex flex-col items-center pt-4 pb-6">
                {/* Profile Image */}
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-white dark:border-dark-800"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 border-4 border-white dark:border-dark-800">
                    <User className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                
                {/* Username */}
                <h2 className="text-xl font-bold mb-2">
                  @{user?.username || user?.id?.substring(0, 8)}
                </h2>
                
                {/* Bio */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                  {userBio}
                </p>
                
                {/* View/Edit Profile Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
                  <button 
                    onClick={() => setDetailsOpen(true)}
                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 dark:hover:bg-dark-600 rounded-lg transition flex items-center justify-center"
                  >
                    Edit Details
                  </button>
                  <Link 
                    to={`/${user?.username}`} 
                    className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition flex items-center justify-center"
                  >
                    Preview Profile
                  </Link>
                </div>
              </div>
              
              {/* Sample Car Preview */}
              <div className="mt-4 w-full max-w-md">
                <div className="bg-white dark:bg-dark-700 rounded-lg p-3 mb-3">
                  <div className="aspect-video bg-gray-100 dark:bg-dark-600 rounded-md flex items-center justify-center text-gray-400 mb-2">
                    Car Image
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">2018 Toyota Supra</h3>
                      <p className="text-xs text-gray-500">3.0L Turbo • 382 HP • Modified</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </GradientCard>
          </div>
          
          {/* Right Column - Stats & Activity */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Profile Summary Card */}
            <GradientCard
              color="gray"
              className="p-4 border-2 border-gray-200 dark:border-gray-800/50 shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Your Profile</h2>
                <button 
                  onClick={() => setDetailsOpen(true)} 
                  className="text-primary-400 hover:text-primary-300 text-sm flex items-center"
                >
                  View Details
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{user?.fullName || ''}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.username ? `@${user.username}` : ''}</p>
                </div>
              </div>
            </GradientCard>

            {/* Quick Stats Cards - Enhanced with bolder design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
              {/* Profile Visits Card */}
              <GradientCard 
                color="amber"
                className="flex flex-col shadow-lg border-2 border-amber-200 dark:border-amber-900/40 !bg-gradient-to-br !from-amber-500/20 !to-amber-600/10 dark:!from-amber-500/30 dark:!to-amber-600/20"
              >
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <User size={40} className="text-amber-500" />
                </div>
                <h3 className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">Profile Visits</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                  <span className="text-xs px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">New</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <span>Start sharing your profile</span>
                </div>
              </GradientCard>
              
              {/* Mod Clicks Card */}
              <GradientCard 
                color="green"
                className="flex flex-col shadow-lg border-2 border-green-200 dark:border-green-900/40 !bg-gradient-to-br !from-green-500/20 !to-green-600/10 dark:!from-green-500/30 dark:!to-green-600/20"
              >
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <BarChart3 size={40} className="text-green-500" />
                </div>
                <h3 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Mod Clicks</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <span>Add mods to get started</span>
                </div>
              </GradientCard>
              
              {/* Car Views Card */}
              <GradientCard 
                color="indigo"
                className="flex flex-col shadow-lg border-2 border-indigo-200 dark:border-indigo-900/40 !bg-gradient-to-br !from-indigo-500/20 !to-indigo-600/10 dark:!from-indigo-500/30 dark:!to-indigo-600/20"
              >
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path>
                    <circle cx="7" cy="17" r="2"></circle>
                    <path d="M9 17h6"></path>
                    <circle cx="17" cy="17" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-1">Car Views</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <span>Add cars to your profile</span>
                </div>
              </GradientCard>
              
              {/* Weekly Growth Card */}
              <GradientCard 
                color="purple"
                className="flex flex-col shadow-lg border-2 border-purple-200 dark:border-purple-900/40 !bg-gradient-to-br !from-purple-500/20 !to-purple-600/10 dark:!from-purple-500/30 dark:!to-purple-600/20"
              >
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <TrendingUp size={40} className="text-purple-500" />
                </div>
                <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">Weekly Growth</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0%</p>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <span>Track your weekly progress</span>
                </div>
              </GradientCard>
            </div>

            {/* Recent Activity Card */}
            <GradientCard 
              color="gray"
              className="p-4 flex-grow overflow-auto border-2 border-gray-200 dark:border-dark-700/50 shadow-md backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Recent Activity</h2>
                <Link to="/analytics" className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
                  View All
                </Link>
              </div>
              
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm">No recent activity yet</p>
              </div>
            </GradientCard>
          </div>
        </div>
      </motion.div>
    </>
  );
}
