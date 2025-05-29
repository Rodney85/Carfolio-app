import { motion } from 'framer-motion';
import { Gauge, Wrench, Camera, Share2, ChevronRight, Mail } from 'lucide-react';
import HeroScrollDemo from '../components/ui/container-scroll-animation-demo';

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
    <section className="relative pt-0 flex flex-col justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:3rem_3rem] pointer-events-none z-0" />
      
      {/* Animated background blobs */}
      <div className="hidden md:block absolute -top-24 -right-24 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl opacity-30 animate-pulse z-0" />
      <div className="hidden md:block absolute top-20 -left-20 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl opacity-20 animate-pulse z-0" 
        style={{ animationDuration: '8s' }}
      />
      <div className="hidden md:block absolute bottom-20 right-10 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl opacity-20 animate-pulse z-0"
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
      
      {/* Scroll Animation Hero Section */}
      <HeroScrollDemo />
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-16 mb-24">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 my-8 bg-dark-800/90 backdrop-blur-sm border border-dark-700 rounded-xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-white">Join the Exclusive Waitlist</h3>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full pl-10 pr-3 py-3 bg-dark-800 border border-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white" 
                />
              </div>
              <button className="inline-flex items-center rounded-md bg-primary-600 px-6 py-3 text-white font-medium shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition duration-300 justify-center whitespace-nowrap">
                Join Now <ChevronRight size={16} className="ml-2" />
              </button>
            </div>
            <div className="font-mono bg-dark-800/70 py-1 px-3 rounded mt-1 text-primary-300 inline-block">
              carfolio.io/your-username
            </div>
            <p className="text-sm text-primary-400 italic">Lock in founder pricing for life - up to 80% off standard rates</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
