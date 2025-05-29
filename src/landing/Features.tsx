import { motion } from 'framer-motion';
import { Gauge, Share2, Users, Link, Check } from 'lucide-react';

// Feature items
const features = [
  {
    icon: Gauge,
    title: '📱 Digital Car Portfolios',
    description: 'Create dedicated profiles for each vehicle with specs, modification history, and media galleries that you control.',
    color: 'primary'
  },
  {
    icon: Share2,
    title: '🔗 One Shareable Link',
    description: 'carfolio.io/yourusername - One simple link to share across Instagram, TikTok, forums, and with other enthusiasts.',
    color: 'orange'
  },
  {
    icon: Link,
    title: '💰 Monetize Your Knowledge',
    description: "Add affiliate links to parts you've used and earn commission when your followers purchase through your recommendations.",
    color: 'green'
  },
  {
    icon: Check,
    title: '✅ Build Credibility',
    description: 'Verified profiles establish your expertise and build trust with your automotive community.',
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
            Key Features
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            CarFolio is the solution car enthusiasts have been waiting for.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
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
        
        {/* The Problem We're Solving */}
        <motion.div
          className="mt-16 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">The Problem We're Solving</h3>
          <p className="text-gray-300 mb-4">As car enthusiasts ourselves, we know the frustration:</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span className="text-gray-300">Social media buries your best build photos in your feed</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span className="text-gray-300">Forums limit your ability to showcase multiple cars</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span className="text-gray-300">There's no easy way to share your complete build history</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span className="text-gray-300">You spend time recommending parts but earn nothing from it</span>
            </li>
          </ul>
        </motion.div>
        
        {/* Enthusiast Guarantee */}
        <div className="max-w-xl mx-auto mt-12 bg-dark-800/60 border border-primary-500/20 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Enthusiast Guarantee</h3>
          <p className="text-gray-300">
            We're builders too. If CarFolio doesn't help you better showcase your vehicles and connect with the community within 30 days of launch, we'll refund your first month and help you export your data.
          </p>
        </div>
      </div>
    </section>
  );
}
