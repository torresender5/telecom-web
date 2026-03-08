import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Productos', href: '#products' },
    { name: 'Promociones', href: '#promotions' },
    { name: 'Planes', href: '#plans' },
    { name: 'Contacto', href: '#footer' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-dark py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-72 h-20 rounded-xls gradient-blues flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              {/* <span className="text-white font-bold text-lg">T</span> */}
              <img
                src="/images/logo.png"
                alt="iPhone 16 Pro Max"
                className="relative z-10 w-full max-w-md lg:max-w-lg drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
                }}
              />
            </div>
            {/* <span className="text-white font-semibold text-xl tracking-tight">
              Asesor de AT&T
            </span> */}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="relative text-white/80 hover:text-white text-sm font-medium transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#3b82f6] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* <button className="relative p-2 text-white/80 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#3b82f6] rounded-full text-xs flex items-center justify-center">
                0
              </span>
            </button> */}
            <Button
              className="gradient-blue text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition-opacity glow-blue"
            >
              Comprar Ahora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="glass rounded-2xl p-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            <Button
              className="w-full gradient-blue text-white font-medium py-3 rounded-xl mt-2"
            >
              Comprar Ahora
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
