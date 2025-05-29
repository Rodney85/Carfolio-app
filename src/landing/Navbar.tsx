import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { MdOutlineHub } from 'react-icons/md';
import { motion } from 'framer-motion';
import { slowSpin } from '../lib/animations';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-900/90 backdrop-blur-md py-3 shadow-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="flex items-center gap-1">
              <span 
                className="text-2xl md:text-3xl text-primary-500 dark:text-primary-400 atma-regular" 
                data-component-name="Navbar"
                style={{ fontFamily: '"Atma", system-ui', fontWeight: 400 }}
              >
                Carfolio
              </span>
              <motion.div
                animate="animate"
                variants={slowSpin}
                className="flex items-center justify-center ml-0.5"
                style={{ marginTop: '2px' }}
              >
                <MdOutlineHub 
                  size={24} 
                  className="text-primary-500 dark:text-primary-400" 
                  data-component-name="MdOutlineHub" 
                />
              </motion.div>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition duration-200">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition duration-200">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition duration-200">
              Pricing
            </a>
            
            <div className="flex items-center space-x-3">
              <a 
                href="/sign-in" 
                className="text-gray-200 hover:text-white transition duration-200"
              >
                Sign In
              </a>
              <a 
                href="/sign-up" 
                className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition duration-200"
              >
                Get Started
              </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-800 border-t border-dark-700 mt-2">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <a 
              href="#features" 
              className="block text-gray-300 hover:text-white transition duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="block text-gray-300 hover:text-white transition duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="block text-gray-300 hover:text-white transition duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            
            <div className="pt-3 border-t border-dark-700 flex flex-col space-y-3">
              <a 
                href="/sign-in" 
                className="block text-gray-200 hover:text-white transition duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </a>
              <a 
                href="/sign-up" 
                className="block px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
