import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Twitter, Instagram, Youtube, Send, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo and description
      const logo = footerRef.current?.querySelector('.footer-logo');
      const desc = footerRef.current?.querySelector('.footer-desc');
      const columns = footerRef.current?.querySelectorAll('.footer-column');
      const newsletter = footerRef.current?.querySelector('.footer-newsletter');
      const socials = footerRef.current?.querySelectorAll('.social-icon');
      const bottom = footerRef.current?.querySelector('.footer-bottom');

      if (logo) {
        gsap.fromTo(logo, { opacity: 0 }, {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
      }

      if (desc) {
        gsap.fromTo(desc, { y: 20, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.1,
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
      }

      if (columns && columns.length > 0) {
        columns.forEach((col, i) => {
          gsap.fromTo(col, { y: 30, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2 + i * 0.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
          });
        });
      }

      if (newsletter) {
        gsap.fromTo(newsletter, { x: 30, opacity: 0 }, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        });
      }

      if (socials && socials.length > 0) {
        gsap.fromTo(socials, { scale: 0 }, {
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: { trigger: footerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        });
      }

      if (bottom) {
        gsap.fromTo(bottom, { opacity: 0 }, {
          opacity: 1,
          duration: 0.4,
          delay: 0.6,
          scrollTrigger: { trigger: footerRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`¡Gracias por suscribirte con: ${email}!`);
    setEmail('');
  };

  const productLinks = ['Smartphones', 'Accesorios', 'Planes', 'Promociones'];
  const supportLinks = ['Centro de ayuda', 'Contacto', 'Garantía', 'Devoluciones'];

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative bg-[#0d0d0d] pt-20 pb-8"
    >
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="footer-logo flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-white font-semibold text-2xl">Asesor de AT&T</span>
            </div>
            <p className="footer-desc text-white/60 mb-8 max-w-sm leading-relaxed">
              Tu destino principal para tecnología móvil y planes de comunicación. 
              Conectamos tu mundo con los mejores dispositivos y servicios.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-white/60">
                <Phone className="w-5 h-5 text-[#3b82f6]" />
                <span>+1 800 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Mail className="w-5 h-5 text-[#3b82f6]" />
                <span>hola@telecomstore.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-[#3b82f6]" />
                <span>Ciudad de México, México</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#3b82f6] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products column */}
          <div className="footer-column">
            <h4 className="text-white font-semibold mb-6">Productos</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-[#3b82f6] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div className="footer-column">
            <h4 className="text-white font-semibold mb-6">Soporte</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-[#3b82f6] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div className="footer-newsletter">
            <h4 className="text-white font-semibold mb-6">Suscríbete</h4>
            <p className="text-white/60 mb-4 text-sm">
              Recibe las últimas ofertas y novedades directamente en tu correo.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-12 rounded-xl"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 gradient-blue rounded-lg p-2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Asesor de AT&T. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
