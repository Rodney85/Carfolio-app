import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

// Pricing tiers
const tiers = [
  {
    name: 'Founding Member',
    description: 'Exclusive Launch',
    price: '$9.99',
    period: 'per month for life',
    status: 'First to be unlocked',
    remaining: '12/30 spots remaining',
    features: [
      'Founding Member badge on profile',
      'First access to all new features (30 days early)',
      'Unlimited vehicle profiles',
      'Premium analytics dashboard',
      'Lifetime guarantee on this price'
    ],
    cta: 'Join Waitlist to Reserve',
    ctaLink: '/sign-up?plan=founding',
    highlighted: true,
    note: 'Pre-launch reservations get priority access'
  },
  {
    name: 'Early Bird',
    description: 'Early Access',
    price: '$19.99',
    period: 'per month for life',
    status: 'Unlocks after Exclusive Launch fills',
    remaining: '40 spots total',
    features: [
      'Early Bird badge on profile',
      'Early access to new features (20 days early)',
      'Unlimited vehicle profiles',
      'Premium analytics dashboard',
      'Priority support'
    ],
    cta: 'Join Waitlist',
    ctaLink: '/sign-up?plan=earlybird',
    highlighted: false,
    note: 'Get notified when Early Bird tier unlocks'
  },
  {
    name: 'Builder',
    description: 'Build Club',
    price: '$27.99',
    period: 'per month for life',
    status: 'Unlocks after Early Bird fills',
    remaining: '30 spots total',
    features: [
      'Builder badge on profile',
      'Priority access to new features (10 days early)',
      'Unlimited vehicle profiles',
      'Premium analytics dashboard',
      'Community access'
    ],
    cta: 'Join Waitlist',
    ctaLink: '/sign-up?plan=builder',
    highlighted: false,
    note: 'Get notified when Builder tier unlocks'
  },
  {
    name: 'Premium',
    description: 'After Public Launch',
    price: '$49.99',
    period: 'per month',
    status: 'Available to everyone after waitlist',
    features: [
      'Unlimited vehicle profiles',
      'Advanced analytics & reporting',
      'Priority support',
      'Standard access to new features'
    ],
    cta: 'Coming Soon',
    ctaLink: '/sign-up?plan=premium',
    highlighted: false,
    disabled: true
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
            Exclusive Waitlist Pricing
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Reserve Your Tier Before Launch
          </motion.p>
          <motion.p
            className="mt-2 text-gray-400 text-base max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join our waitlist now to lock in these special lifetime prices. All tiers receive premium features, but prices increase as spots fill. Standard pricing after launch will be $49.99/month.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
              
              <div className="p-5 md:p-6">
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-gray-400 mb-3 text-sm font-semibold">{tier.description}</p>
                
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-400 ml-2 text-sm">{tier.period}</span>
                </div>
                
                {tier.status && (
                  <p className="text-xs italic text-primary-400 mb-2">{tier.status}</p>
                )}
                
                {tier.remaining && (
                  <div className="bg-dark-700/50 text-center py-1 px-2 rounded text-xs mb-4 font-semibold">
                    {tier.remaining}
                  </div>
                )}
                
                <ul className="space-y-2 mb-6 text-sm">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={tier.ctaLink} 
                  className={`
                    block w-full py-2.5 rounded-lg text-center font-medium text-sm transition duration-200
                    ${tier.highlighted 
                      ? 'bg-primary-500 hover:bg-primary-600 text-white' 
                      : tier.disabled 
                        ? 'bg-dark-700/50 text-gray-500 cursor-not-allowed' 
                        : 'bg-dark-700 hover:bg-dark-600 text-white border border-dark-600'}
                  `}
                >
                  {tier.cta}
                  {!tier.disabled && <ArrowRight className="inline ml-1" size={14} />}
                </a>
                
                {tier.note && (
                  <p className="text-xs text-gray-500 mt-2 text-center italic">{tier.note}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto bg-dark-800/70 border border-dark-700 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">The Waitlist Advantage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
              <span className="text-gray-300"><span className="font-semibold">Lock in lifetime pricing</span> - Pay the same low founder rate forever, even as standard prices rise</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
              <span className="text-gray-300"><span className="font-semibold">Early feature access</span> - Be first to try new features before everyone else</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
              <span className="text-gray-300"><span className="font-semibold">Exclusive badges</span> - Show your OG status with tier-specific profile badges</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
              <span className="text-gray-300"><span className="font-semibold">Influence development</span> - Early members help shape product priorities</span>
            </div>
            <div className="flex items-start col-span-full">
              <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
              <span className="text-gray-300"><span className="font-semibold">Boost your spot</span> - Refer friends to move up the waitlist and unlock tiers faster</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
