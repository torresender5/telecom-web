import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Headline animation - word by word
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 60, opacity: 0, rotateX: 45 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1 },
          0.2
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        0.6
      );

      // Description
      tl.fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.8
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' },
        1
      );

      // iPhone image - 3D entrance
      tl.fromTo(
        imageRef.current,
        { z: -500, rotateY: 45, opacity: 0 },
        { z: 0, rotateY: 0, opacity: 1, duration: 1.4 },
        0.4
      );

      // Floating animation for iPhone
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Particle animation
      const particles = particlesRef.current?.querySelectorAll('.particle');
      if (particles) {
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: -100 - Math.random() * 200,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: 4 + Math.random() * 4,
            repeat: -1,
            delay: i * 0.3,
            ease: 'none',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-based parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -progress * 80,
          rotateY: progress * 15,
          duration: 0.3,
        });
      }

      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          y: -progress * 100,
          opacity: 1 - progress * 0.8,
          duration: 0.3,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPromotions = () => {
    const element = document.querySelector('#promotions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden gradient-mesh"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 animate-gradient-shift opacity-50">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(30, 64, 175, 0.15) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-[#3b82f6] rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${60 + Math.random() * 30}%`,
              opacity: 0.6,
              boxShadow: '0 0 6px rgba(59, 130, 246, 0.8)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 perspective-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[#60a5fa] text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Nueva Colección 2026</span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight preserve-3d"
            >
              <span className="word inline-block">TECNOLOGÍA</span>{' '}
              <span className="word inline-block">QUE</span>
              <br />
              <span className="word inline-block text-gradient">INSPIRA</span>
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="text-2xl sm:text-3xl text-white/90 font-light"
            >
              Descubre los productos más innovadores
            </p>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-lg text-white/70 max-w-lg leading-relaxed"
            >
              Líneas telefónicas, smartphones y accesorios de última generación
              para mantenerte conectado con el mundo.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToProducts}
                className="gradient-blue text-white font-semibold px-8 py-6 rounded-full text-lg hover:opacity-90 transition-all duration-300 glow-blue group"
              >
                Explorar Productos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={scrollToPromotions}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg transition-all duration-300"
              >
                Ver Promociones
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-white/60">Clientes felices</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-white/60">Productos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/60">Soporte</div>
              </div>
            </div>
          </div>

          {/* iPhone Image */}
          <div className="relative flex justify-center lg:justify-end perspective-1000">
            <div
              ref={imageRef}
              className="relative preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-[#3b82f6] rounded-full filter blur-[100px] opacity-30 scale-75" />

              {/* Phone image */}
              <img
                src="/images/iphone-hero.png"
                alt="iPhone 16 Pro Max"
                className="relative z-10 w-full max-w-md lg:max-w-lg drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
                }}
              />

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#3b82f6]/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#60a5fa]/20 rounded-full blur-2xl animate-pulse delay-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
    </section>
  );
};

export default Hero;
