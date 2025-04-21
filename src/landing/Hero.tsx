import { motion } from 'framer-motion';
import { Check, Rocket, Gauge, Wrench, Camera, Share2, ChevronRight } from 'lucide-react';

// Benefits list
const benefits = [
  'Unlimited car profiles',
  'Custom shareable links',
  'Photo & video showcase',
  'Connect with enthusiasts'
];

// Car parts for the animated background
const carParts = [
  { icon: Gauge, position: 'top-10 right-20', size: 24, rotation: 15, delay: 0 },
  { icon: Wrench, position: 'top-32 right-10', size: 20, rotation: -10, delay: 0.2 },
  { icon: Camera, position: 'bottom-20 right-24', size: 22, rotation: 5, delay: 0.4 },
  { icon: Share2, position: 'bottom-10 left-20', size: 18, rotation: -15, delay: 0.6 },
  { icon: Gauge, position: 'top-14 left-10', size: 16, rotation: 20, delay: 0.8 },
];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-20 md:pt-24 flex flex-col justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:3rem_3rem] pointer-events-none" />
      
      {/* Animated background blobs */}
      <div className="hidden md:block absolute -top-24 -right-24 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="hidden md:block absolute top-20 -left-20 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl opacity-20 animate-pulse" 
        style={{ animationDuration: '8s' }}
      />
      <div className="hidden md:block absolute bottom-20 right-10 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDuration: '12s' }}
      />
      
      {/* Animated car parts icons */}
      {carParts.map((part, index) => (
        <motion.div
          key={index}
          className={`absolute ${part.position} hidden md:block text-primary-500/40 z-0`}
          initial={{ opacity: 0, scale: 0, rotate: part.rotation }}
          animate={{ 
            opacity: 0.4, 
            scale: 1,
            rotate: [part.rotation, -part.rotation, part.rotation] 
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: part.delay,
            ease: 'easeInOut'
          }}
        >
          <part.icon size={part.size} />
        </motion.div>
      ))}
      
      {/* Wire-frame car illustration */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 opacity-10 pointer-events-none hidden md:block">
        <svg viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M300,250 C300,250 350,150 600,150 C850,150 900,250 900,250 L1000,250 L950,100 C950,100 900,50 700,50 C500,50 450,100 450,100 L400,250 L300,250 Z" 
                stroke="currentColor" strokeWidth="2" className="text-primary-500" />
          <circle cx="400" cy="250" r="50" stroke="currentColor" strokeWidth="2" className="text-primary-500" fill="none" />
          <circle cx="800" cy="250" r="50" stroke="currentColor" strokeWidth="2" className="text-primary-500" fill="none" />
          <path d="M580,100 L600,50 L620,100" stroke="currentColor" strokeWidth="2" className="text-primary-500" />
          <path d="M500,150 L450,150" stroke="currentColor" strokeWidth="2" className="text-primary-500" />
          <path d="M700,150 L750,150" stroke="currentColor" strokeWidth="2" className="text-primary-500" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center w-full">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-lg"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
              <Rocket size={14} className="mr-1.5" />
              <span>Now in public beta</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-[1.1]">
              The Linktree for Car Enthusiasts
            </h1>
            
            <p className="mt-4 text-lg text-gray-400 max-w-lg">
              Showcase your car builds, modifications, and affiliate links in one beautiful, shareable profile.
            </p>
            
            <div className="mt-6 space-y-4">
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Check size={18} className="mr-2 text-primary-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Auth buttons instead of waitlist form */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a 
                href="/sign-up" 
                className="flex items-center justify-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition duration-200"
              >
                Get Started
                <ChevronRight size={16} className="ml-1" />
              </a>
              <a 
                href="/sign-in" 
                className="flex items-center justify-center px-6 py-3 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-700 text-white font-medium transition duration-200"
              >
                Sign In
              </a>
            </div>
          </motion.div>
          
          {/* Right Column - App Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="relative bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-5 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="text-xs text-gray-400 bg-dark-700/50 rounded-full px-2 py-0.5 ml-2">
                  carfolio.io/share/mustang-gt
                </div>
              </div>
              
              <div className="aspect-[4/3] bg-dark-900/80 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 to-transparent"></div>
                
                {/* Car profile mockup */}
                <div className="p-4 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <Gauge size={18} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">2022 Ford Mustang GT</h3>
                      <p className="text-xs text-gray-400">Performance Build • 460 HP</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="aspect-square rounded-md bg-dark-800/80 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary-900/50 to-dark-900/50"></div>
                    </div>
                    <div className="aspect-square rounded-md bg-dark-800/80 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/50 to-dark-900/50"></div>
                    </div>
                    <div className="aspect-square rounded-md bg-dark-800/80 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-dark-900/50"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">Engine</div>
                      <div className="text-xs text-white">Coyote V8 + Supercharger</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">Suspension</div>
                      <div className="text-xs text-white">KW Variant 3 Coilovers</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">Wheels</div>
                      <div className="text-xs text-white">Vossen HF-5 20"</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated notifications */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute top-1/4 -right-10 bg-dark-800/90 backdrop-blur-sm border border-dark-700 rounded-lg p-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <Gauge size={16} className="text-primary-500" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">Power Updated</div>
                    <div className="text-[10px] text-gray-400">460 HP</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 }}
                className="absolute bottom-1/4 -left-10 bg-dark-800/90 backdrop-blur-sm border border-dark-700 rounded-lg p-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Camera size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">New Photos</div>
                    <div className="text-[10px] text-gray-400">+3 added</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Mobile-only preview */}
          <motion.div 
            className="sm:hidden mt-8 mx-auto max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-3 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl"></div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <div className="text-xs text-gray-400 bg-dark-700/50 rounded-full px-2 py-0.5">
                  carfolio.io/share/mustang-gt
                </div>
              </div>
              
              <div className="aspect-video bg-dark-900/80 rounded-md flex flex-col items-center justify-center overflow-hidden relative p-3">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 to-transparent"></div>
                
                <div className="relative z-10 space-y-2">
                  <div className="h-2 bg-dark-800 rounded w-3/4 animate-pulse mb-2" />
                  <div className="h-2 bg-dark-800 rounded animate-pulse mb-2" />
                  <div className="h-2 bg-dark-800 rounded w-5/6 animate-pulse mb-2" />
                  <div className="h-2 bg-dark-800 rounded w-2/3 animate-pulse" />
                </div>
                
                <div className="flex gap-2 mt-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <Gauge size={12} className="text-primary-500" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Camera size={12} className="text-blue-500" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Share2 size={12} className="text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
