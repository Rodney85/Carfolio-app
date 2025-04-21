import { motion } from 'framer-motion';
import { Camera, Link, BarChart3, ChevronRight } from 'lucide-react';

// Steps for how the app works
const steps = [
  {
    icon: Camera,
    title: 'Create Your Profile',
    description: 'Sign up and add your car builds with photos, videos, and detailed specs.',
    color: 'primary'
  },
  {
    icon: Link,
    title: 'Share Your Link',
    description: 'Get a custom link (username.carmods.app) to share on social media.',
    color: 'blue'
  },
  {
    icon: BarChart3,
    title: 'Track Engagement',
    description: 'See who\'s viewing your builds and clicking on your affiliate links.',
    color: 'green'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="hidden md:block absolute top-0 left-0 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-[100px] opacity-50" />
      <div className="hidden md:block absolute bottom-0 right-0 w-1/4 h-1/4 bg-primary-600/10 rounded-full blur-[100px] opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How Carfolio Works
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Three simple steps to showcase your builds and connect with enthusiasts
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-primary-500 font-bold">
                {index + 1}
              </div>
              
              {/* Connected line between steps (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-0.5 bg-gradient-to-r from-primary-500/50 to-blue-500/50 -translate-x-1/2"></div>
              )}
              
              {/* Step content */}
              <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 hover:border-primary-500/50 transition duration-300 h-full">
                <div className={`w-12 h-12 rounded-lg bg-${step.color}-500/20 flex items-center justify-center mb-4`}>
                  <step.icon size={24} className={`text-${step.color}-500`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a 
              href="/sign-up" 
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition duration-200"
            >
              Get Started Now
              <ChevronRight size={16} className="ml-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
