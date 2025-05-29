import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Share2, ExternalLink, Copy } from 'lucide-react';
import { staggerChildren } from '../../lib/animations';
import GradientCard from '../ui/GradientCard';
import CarCard from '../cars/CarCard';

// This would come from your Convex DB
import { mockCars } from '../../mocks';
import { Car } from '../../types/car';

const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [copied, setCopied] = useState(false);
  
  // In a real implementation, you would fetch this data from your API
  const userProfile = {
    username,
    displayName: username,
    avatar: 'https://i.pravatar.cc/300',
    bio: 'Car enthusiast and modifier. Building awesome rides for the modern road.',
    socialLinks: {
      instagram: 'https://instagram.com/' + username,
      twitter: 'https://twitter.com/' + username,
      youtube: 'https://youtube.com/@' + username,
    },
    // This would come from your analytics logic
    profileViews: 3240,
    followers: 120
  };
  
  const copyProfileUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="min-h-screen bg-light-200 dark:bg-dark-900 pb-16">
      {/* Hero Banner with SVG Wave */}
      <div className="relative">
        <div className="bg-gradient-to-r from-brand-500 to-primary-500 h-64 md:h-80">
          <div className="container mx-auto px-4 h-full flex items-end">
            <div className="relative bottom-0 translate-y-1/2 z-10 flex flex-col sm:flex-row gap-6 items-center sm:items-end">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-light-200 dark:border-dark-900 overflow-hidden bg-light-300 dark:bg-dark-800 flex-shrink-0">
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.displayName} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center sm:text-left mb-6 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {userProfile.displayName}
                </h1>
                <p className="text-brand-100 font-medium">
                  @{userProfile.username}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* SVG Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path 
              d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 90C672 100 768 110 864 110C960 110 1056 100 1152 85C1248 70 1344 50 1392 40L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" 
              className="fill-light-200 dark:fill-dark-900"
            />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 sm:mt-24">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - About & Stats */}
          <div className="space-y-6">
            {/* About Card */}
            <GradientCard color="brand" className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">About</h2>
              <p className="text-gray-700 dark:text-gray-300">{userProfile.bio}</p>
              
              <div className="mt-6 flex gap-3">
                {userProfile.socialLinks.instagram && (
                  <a 
                    href={userProfile.socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gradient-to-br from-pink-500 to-amber-500 text-white transition-transform hover:scale-110"
                  >
                    <Instagram size={18} />
                  </a>
                )}
                
                {userProfile.socialLinks.twitter && (
                  <a 
                    href={userProfile.socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-brand-500 text-white transition-transform hover:scale-110"
                  >
                    <Twitter size={18} />
                  </a>
                )}
                
                {userProfile.socialLinks.youtube && (
                  <a 
                    href={userProfile.socialLinks.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-red-500 text-white transition-transform hover:scale-110"
                  >
                    <Youtube size={18} />
                  </a>
                )}
              </div>
            </GradientCard>
            
            {/* Stats Card */}
            <GradientCard color="gray" className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Stats</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-gray-100/50 dark:bg-dark-800/50">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.profileViews.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Profile Views</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-100/50 dark:bg-dark-800/50">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.followers}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                </div>
                <div className="col-span-2 text-center p-3 rounded-lg bg-gray-100/50 dark:bg-dark-800/50">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockCars.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Car Builds</p>
                </div>
              </div>
            </GradientCard>
            
            {/* Share Card */}
            <GradientCard color="primary" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Share Profile</h2>
                <Share2 size={18} className="text-primary-500" />
              </div>
              
              <button
                onClick={copyProfileUrl}
                className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition"
              >
                {copied ? 'Copied!' : 'Copy Profile Link'} 
                {copied ? <Copy size={16} className="text-white" /> : <ExternalLink size={16} className="text-white" />}
              </button>
            </GradientCard>
          </div>
          
          {/* Right Column - Car Builds */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Car Builds</h2>
            
            {mockCars.length === 0 ? (
              <GradientCard color="gray" className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No cars yet</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {userProfile.displayName} hasn't added any car builds yet.
                </p>
              </GradientCard>
            ) : (
              <motion.div
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 gap-6"
              >
                {mockCars.map((car: Car, index: number) => (
                  <CarCard key={car.id} car={car} delay={0.05 * index} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
