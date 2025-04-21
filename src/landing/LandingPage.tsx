import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import Footer from './Footer';

export default function LandingPage() {
  React.useEffect(() => {
    document.title = 'Carfolio - The Linktree for Car Builds';
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
}
