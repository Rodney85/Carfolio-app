import { motion } from 'framer-motion';
import { Camera, Link, BarChart3, ChevronRight, Share2 } from 'lucide-react';

// Steps for how the app works with stats
const steps = [
  {
    icon: Camera,
    title: '1. Create Your Vehicle Profiles',
    description: 'Add unlimited vehicles with detailed specs, modifications list, and build history.',
    color: 'primary',
    stat: 'Average setup time: 12 minutes per vehicle'
  },
  {
    icon: Link,
    title: '2. Upload Your Best Media',
    description: 'Showcase your rides with high-quality photos and videos that highlight your builds.',
    color: 'blue',
    stat: 'Support for 4K images and 1080p video'
  },
  {
    icon: Share2,
    title: '3. Share With One Link',
    description: 'Get a personalized URL to share everywhere - social media, forums, car meets, and more.',
    color: 'orange',
    stat: 'Average profile visit duration: 3:45 minutes'
  },
  {
    icon: BarChart3,
    title: '4. Earn From Your Passion',
    description: 'Connect affiliate programs to the parts you recommend and start earning.',
    color: 'green',
    stat: 'Average monthly earnings for active users: $215'
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
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How CarFolio Works
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-400 text-lg font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            From vehicle profiles to monetization in four simple steps
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
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-primary-500 font-bold font-sans">
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
                <h3 className="text-xl font-semibold text-white mb-2 font-sans">{step.title}</h3>
                <p className="text-gray-400 mb-4 font-sans">{step.description}</p>
                <div className="mt-auto pt-3 border-t border-dark-700">
                  <p className="text-sm text-primary-400 font-mono">{step.stat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonials Section */}
        <div className="mt-20 mb-16">
          <motion.h3 
            className="text-2xl font-bold text-center mb-10 font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How Car Enthusiasts Like You Are Using CarFolio
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute -top-3 -left-3 text-5xl text-primary-500/30">"</div>
              <p className="text-gray-300 mb-6 relative z-10 font-sans">
                I used to juggle between Instagram, YouTube and forums to share my GTR build. Now I just send people to my CarFolio. Last month I made $430 in affiliate commissions from parts I'd already installed and photographed anyway.
              </p>
              <div className="border-t border-dark-700 pt-4">
                <p className="font-bold font-sans">Mike T.</p>
                <p className="text-sm text-primary-400 font-sans">2018 Nissan GTR</p>
              </div>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div
              className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -top-3 -left-3 text-5xl text-primary-500/30">"</div>
              <p className="text-gray-300 mb-6 relative z-10 font-sans">
                At my last car meet, I had my CarFolio QR code displayed. Got 57 profile visits that day and connected with builders I never would have met otherwise.
              </p>
              <div className="border-t border-dark-700 pt-4">
                <p className="font-bold font-sans">Sarah K.</p>
                <p className="text-sm text-primary-400 font-sans">2020 Subaru WRX STI</p>
              </div>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div
              className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute -top-3 -left-3 text-5xl text-primary-500/30">"</div>
              <p className="text-gray-300 mb-6 relative z-10 font-sans">
                The analytics showed me which mods get the most attention. Helped me decide what to focus on next with my build.
              </p>
              <div className="border-t border-dark-700 pt-4">
                <p className="font-bold font-sans">Carlos M.</p>
                <p className="text-sm text-primary-400 font-sans">1995 Mazda Miata</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="max-w-md mx-auto bg-dark-800/80 border border-primary-500/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-2 font-sans">Join the CarFolio Revolution</h3>
              <p className="text-gray-300 mb-4 font-sans">Be among the first to showcase your builds, connect with enthusiasts, and monetize your automotive passion.</p>
              <p className="text-sm text-primary-400 mb-3 font-sans">Founding Member tier active - 12/30 spots remaining</p>
              <a 
                href="/sign-up" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition duration-200 mb-2 font-sans"
              >
                JOIN WAITLIST
                <ChevronRight size={16} className="ml-1" />
              </a>
              <p className="text-xs text-gray-400 font-sans">No credit card required. We'll notify you when it's your turn.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
