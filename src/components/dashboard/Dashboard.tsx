import { motion } from "framer-motion";
import { Plus, Car, ChevronRight, Activity, Users, Gauge, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import ProfileCard from "./ProfileCard";
import StatsCard from "./StatsCard";
import OnboardingChecklist from "./OnboardingChecklist";
import PublicProfileLink from "./PublicProfileLink";
import ProfilePreviewModal from "./ProfilePreviewModal";
import { fadeIn, staggerChildren, slideUp } from "../../lib/animations";

export default function Dashboard() {
  // Get user information directly from Clerk
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const [previewOpen, setPreviewOpen] = useState(false);
  
  // Log user authentication status
  useEffect(() => {
    if (isLoaded) {
      console.log('Authentication status:', isSignedIn ? 'Signed In' : 'Signed Out');
      if (user) {
        console.log('User details:', {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName
        });
      }
    }
  }, [isLoaded, isSignedIn, user]);
  
  if (!user) return null;

  return (
    <>
      <ProfilePreviewModal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} />
      
      <motion.div 
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        <motion.div 
          variants={fadeIn}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome, {user.firstName || 'Car Enthusiast'}!</h1>
            <p className="text-gray-400">Manage your car builds and showcase your mods</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setPreviewOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white rounded-lg transition"
            >
              <Eye size={18} />
              <span>Preview</span>
            </button>
            <Link to="/app/cars/new" className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition">
              <Plus size={18} />
              <span>Add Car</span>
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content - Car List */}
          <div className="md:col-span-2 space-y-6">
            <motion.div 
              variants={slideUp}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Your Cars</h2>
                <Link to="/app/cars" className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
                  View All <ChevronRight size={16} />
                </Link>
              </div>
              
              {/* Empty state - we'll add real data later with Convex */}
              <div className="text-center py-8 border border-dashed border-dark-600 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-700 flex items-center justify-center">
                  <Car className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">No cars yet</h3>
                <p className="text-gray-400 mb-4 max-w-md mx-auto">Add your first car to start showcasing your builds and mods</p>
                <Link to="/app/cars/new" className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition">
                  Add Your First Car
                </Link>
              </div>
            </motion.div>

            {/* Onboarding Checklist */}
            <OnboardingChecklist 
              progress={25} 
              items={[
                { id: 'profile', label: 'Complete your profile', completed: true, link: '/profile' },
                { id: 'car', label: 'Add your first car', completed: false, link: '/app/cars/new' },
                { id: 'mods', label: 'Add mods to your car', completed: false, link: '/app/cars' },
                { id: 'share', label: 'Share your profile', completed: false, link: '#' }
              ]} 
            />

            {/* Public Profile Link */}
            <PublicProfileLink username={user.username || user.id?.substring(0, 8) || 'user'} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <ProfileCard isPro={false} profileViews={0} />

            {/* Quick Stats */}
            <StatsCard 
              title="Quick Stats" 
              stats={[
                { value: '0', label: 'Cars', icon: <Car size={18} className="text-primary-400" />, highlight: true },
                { value: '0', label: 'Mods', icon: <Gauge size={18} /> },
                { value: '0', label: 'Views', icon: <Activity size={18} /> },
                { value: '0', label: 'Followers', icon: <Users size={18} /> }
              ]} 
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
