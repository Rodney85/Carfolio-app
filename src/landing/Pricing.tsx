import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

// Pricing tiers
const tiers = [
  {
    name: 'Free',
    description: 'Perfect for casual enthusiasts',
    price: '$0',
    period: 'forever',
    features: [
      'Up to 2 car profiles',
      'Basic analytics',
      'Photo & video uploads',
      'Shareable link'
    ],
    cta: 'Get Started',
    ctaLink: '/sign-up',
    highlighted: false
  },
  {
    name: 'Pro',
    description: 'For serious car builders',
    price: '$9.99',
    period: 'per month',
    features: [
      'Unlimited car profiles',
      'Advanced analytics',
      'Custom domain',
      'Priority support',
      'Verified badge',
      'No ads'
    ],
    cta: 'Get Pro',
    ctaLink: '/sign-up?plan=pro',
    highlighted: true
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="hidden md:block absolute top-0 right-0 w-1/3 h-1/3 bg-primary-600/10 rounded-full blur-[100px] opacity-50" />
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
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Start for free, upgrade when you're ready. No hidden fees or complicated tiers.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className={`
                relative rounded-2xl overflow-hidden
                ${tier.highlighted 
                  ? 'border-2 border-primary-500 bg-gradient-to-b from-dark-800 to-dark-900' 
                  : 'border border-dark-700 bg-dark-800/50'}
              `}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-primary-500 text-white text-xs font-bold text-center py-1">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 mb-6">{tier.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-400 ml-2">{tier.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={tier.ctaLink} 
                  className={`
                    block w-full py-3 rounded-lg text-center font-medium transition duration-200
                    ${tier.highlighted 
                      ? 'bg-primary-500 hover:bg-primary-600 text-white' 
                      : 'bg-dark-700 hover:bg-dark-600 text-white border border-dark-600'}
                  `}
                >
                  {tier.cta}
                  <ArrowRight className="inline ml-1" size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400">
            Need a custom solution for your car club or business?{' '}
            <a href="/contact" className="text-primary-400 hover:text-primary-300 underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
