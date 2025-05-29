import { Instagram, Youtube, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-900 border-t border-dark-800 py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:3rem_3rem] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                CarFolio
              </span>
            </a>
            <p className="text-gray-400 mb-4 max-w-md">
              Showcase, Share & Monetize Your Car Builds. Create stunning digital showcases for your vehicles and earn from your automotive passion.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition duration-200">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition duration-200">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="mailto:info@carfolio.io" className="text-gray-400 hover:text-primary-500 transition duration-200">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-primary-400 transition duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-primary-400 transition duration-200">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-primary-400 transition duration-200">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/sign-up" className="text-gray-400 hover:text-primary-400 transition duration-200">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-gray-400 hover:text-primary-400 transition duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-primary-400 transition duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary-400 transition duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} CarFolio. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0 flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for car enthusiasts
          </p>
          <p className="text-gray-500 text-xs mt-2 text-center w-full md:w-auto">
            Currently in private beta, launching publicly in 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
