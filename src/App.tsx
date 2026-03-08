import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Products from './sections/Products';
import Promotions from './sections/Promotions';
import Plans from './sections/Plans';
import Features from './sections/Features';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Products />
        <Promotions />
        <Plans />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
