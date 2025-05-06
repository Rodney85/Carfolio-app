import { motion, AnimatePresence } from "framer-motion";
import { User, BarChart3, TrendingUp, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useTheme } from "../../hooks/useTheme";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import EditProfileForm from "../auth/EditProfileForm";
import { fadeIn, staggerChildren, slideUp } from "../../lib/animations";

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
  
  if (!user) return null;

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
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Username</h3>
                    <p className="text-sm">{user?.username ? `@${user.username}` : ''}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Account Created</h3>
                    <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      onClick={() => {
                        setDetailsOpen(false);
                        setEditProfileOpen(true);
                      }}
                      className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {editProfileOpen && (
          <EditProfileForm 
            isOpen={editProfileOpen} 
            onClose={() => setEditProfileOpen(false)}
            userBio={userBio}
            onBioUpdate={(newBio) => setUserBio(newBio)}
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-8rem)] pb-4"
      >
        <motion.div 
          variants={fadeIn}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-gray-400 text-sm">Dashboard / Overview</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => toggleTheme()}
              className="flex items-center justify-center w-10 h-10 bg-transparent border border-gray-200 dark:border-dark-700 text-gray-700 dark:text-gray-300 rounded-lg transition hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              <span className="sr-only">Toggle theme</span>
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>
            <button 
              className="flex items-center justify-center w-10 h-10 bg-transparent border border-gray-200 dark:border-dark-700 text-gray-700 dark:text-gray-300 rounded-lg transition hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              <span className="sr-only">Notifications</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>

          </div>
        </motion.div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* Preview Card - Left Side - Mobile Phone Preview */}
          <motion.div 
            variants={slideUp}
            className="lg:col-span-5 bg-white dark:bg-dark-900 rounded-xl p-6 flex flex-col items-center justify-center h-auto"
          >
            {/* Phone Frame */}
            <div className="w-full max-w-[360px] bg-gray-100 dark:bg-gray-900 rounded-[32px] p-3 shadow-lg relative">
              {/* Phone Screen */}
              <div className="bg-white dark:bg-dark-800 rounded-[24px] overflow-hidden h-[600px] p-5 flex flex-col">
                {/* Profile Section */}
                <div className="flex flex-col items-center pt-4 pb-6">
                  
                  {/* Profile Image */}
                  {user?.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700 mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center mb-4">
                      <User className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                  
                  {/* Profile Username */}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{user?.username ? `@${user.username}` : ''}</h2>
                  
                  {/* Profile Bio */}
                  <p className="text-gray-600 dark:text-gray-300 text-base text-center mb-5">
                    {userBio}
                  </p>
                </div>
                
                {/* Car Cards Section - Scrollable with Hidden Scrollbar */}
                <div className="flex-1 space-y-3 py-2 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {/* Car Card 1 */}
                  <div className="bg-gray-100 dark:bg-dark-700 rounded-xl p-3 mb-3">
                    <div className="bg-gray-200 dark:bg-gray-800 h-28 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Car Image</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-medium text-base">2018 Toyota Supra</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">3.0L Turbo • 382 HP • Modified</p>
                  </div>
                  
                  {/* Car Card 2 */}
                  <div className="bg-gray-100 dark:bg-dark-700 rounded-xl p-3 mb-3">
                    <div className="bg-gray-200 dark:bg-gray-800 h-28 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Car Image</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-medium text-base">2022 Honda Civic Type R</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">2.0L Turbo • 315 HP • Stock+</p>
                  </div>
                  
                  {/* Car Card 3 */}
                  <div className="bg-gray-100 dark:bg-dark-700 rounded-xl p-3 mb-3">
                    <div className="bg-gray-200 dark:bg-gray-800 h-28 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Car Image</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-medium text-base">2019 BMW M4</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">3.0L Twin-Turbo • 425 HP • Modified</p>
                  </div>
                  
                  {/* Car Card 4 */}
                  <div className="bg-gray-100 dark:bg-dark-700 rounded-xl p-3">
                    <div className="bg-gray-200 dark:bg-gray-800 h-28 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Car Image</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-medium text-base">2023 Porsche 911 GT3</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">4.0L NA • 502 HP • Stock</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side Content */}
          <div className="lg:col-span-7 space-y-4 flex flex-col h-full">
            {/* Main Content Area */}
            <motion.div 
              variants={slideUp}
              className="bg-white border border-gray-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-6 flex-shrink-0"
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
            </motion.div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-4 gap-4 flex-shrink-0">
              <motion.div variants={fadeIn} className="bg-white border border-gray-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-3 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-1">
                  <User size={16} className="text-amber-400" />
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">0</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Profile Visits</p>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white border border-gray-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-3 flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 text-green-500 dark:text-green-400 text-xs font-medium">
                  <BarChart3 size={16} className="text-green-400" />
                  <span>3.2K profile views</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">0</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mod Clicks</p>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white border border-gray-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-3 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp size={16} className="text-purple-400" />
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">0%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Weekly Growth</p>
              </motion.div>
            </div>

            {/* Bottom Content Area */}
            <motion.div 
              variants={slideUp}
              className="bg-white border border-gray-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-4 flex-grow overflow-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Recent Activity</h2>
                <Link to="/app/analytics" className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
                  View All
                </Link>
              </div>
              
              <div className="text-center py-4">
                <p className="text-gray-400 text-sm">No recent activity yet</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Information section removed as requested */}
      </motion.div>
    </>
  );
}
