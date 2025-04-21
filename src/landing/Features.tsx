import { motion } from 'framer-motion';
import { Gauge, Wrench, Share2, Users, Link, BarChart3 } from 'lucide-react';

// Feature items
const features = [
  {
    icon: Gauge,
    title: 'Showcase Your Builds',
    description: 'Create beautiful profiles for each of your car builds with specs, photos, and videos.',
    color: 'primary'
  },
  {
    icon: Wrench,
    title: 'Organized Mod Lists',
    description: 'Categorize your modifications by type (engine, suspension, etc.) for easy browsing.',
    color: 'blue'
  },
  {
    icon: Link,
    title: 'Affiliate Links',
    description: 'Add your affiliate links to parts and earn from your audience when they shop your builds.',
    color: 'green'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track profile views, car clicks, and part link engagement to optimize your content.',
    color: 'purple'
  },
  {
    icon: Share2,
    title: 'One Link to Share',
    description: 'Just like Linktree, but specifically designed for car enthusiasts and their builds.',
    color: 'orange'
  },
  {
    icon: Users,
    title: 'Build Community',
    description: 'Connect with other enthusiasts and grow your audience with shareable profiles.',
    color: 'pink'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="hidden md:block absolute top-1/4 right-0 w-1/3 h-1/3 bg-primary-600/10 rounded-full blur-[100px] opacity-70" />
      <div className="hidden md:block absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-600/10 rounded-full blur-[100px] opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything You Need to Showcase Your Cars
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built by car enthusiasts, for car enthusiasts. The perfect platform to show off your builds and connect with the community.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 hover:border-primary-500/50 transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}-500/20 flex items-center justify-center mb-4`}>
                <feature.icon size={24} className={`text-${feature.color}-500`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
