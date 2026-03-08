import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Flame, Clock, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Promotions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured promotion entrance
      gsap.fromTo(
        featuredRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Featured image 3D entrance
      const featuredImage = featuredRef.current?.querySelector('.featured-image');
      if (featuredImage) {
        gsap.fromTo(
          featuredImage,
          { rotateY: -30, z: -200, opacity: 0 },
          {
            rotateY: 0,
            z: 0,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Floating animation
        gsap.to(featuredImage, {
          y: -15,
          rotateY: 5,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Badge bounce
      const badge = featuredRef.current?.querySelector('.promo-badge');
      if (badge) {
        gsap.fromTo(
          badge,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Secondary promotions
      const secondaryCards = secondaryRef.current?.querySelectorAll('.secondary-card');
      if (secondaryCards) {
        gsap.fromTo(
          secondaryCards,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: secondaryRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="promotions"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-[#f5f5f5] to-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#1e40af]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-medium mb-6">
            <Flame className="w-4 h-4" />
            <span>Ofertas Especiales</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0d0d0d] mb-4">
            Promociones <span className="text-gradient">Especiales</span>
          </h2>
          <p className="text-xl text-[#4b5563] max-w-2xl">
            Aprovecha nuestras ofertas por tiempo limitado
          </p>
        </div>

        {/* Promotions grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Featured promotion */}
          <div
            ref={featuredRef}
            className="lg:col-span-3 relative"
          >
            <div className="relative bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] rounded-3xl overflow-hidden p-8 sm:p-12">
              {/* Badge */}
              <div className="promo-badge absolute top-6 right-6 z-20">
                <div className="bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse">
                  <Flame className="w-4 h-4" />
                  MÁS POPULAR
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[#60a5fa]">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-medium">Por tiempo limitado</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold text-white">
                    iPhone 16 Pro Max + Línea Gratis
                  </h3>

                  <p className="text-white/70">
                    Lleva el iPhone más potente con una línea telefónica ilimitada gratis por 3 meses
                  </p>

                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-white">$1,299</span>
                    <span className="text-xl text-white/50 line-through">$1,499</span>
                    <span className="bg-[#22c55e] text-white px-2 py-1 rounded text-sm font-medium">
                      -13%
                    </span>
                  </div>

                  <Button className="gradient-blue text-white font-semibold px-8 py-6 rounded-full text-lg hover:opacity-90 transition-all glow-blue group">
                    Aprovechar Ahora
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Image */}
                <div className="relative flex justify-center perspective-1000">
                  <div className="featured-image relative preserve-3d">
                    <div className="absolute inset-0 bg-[#3b82f6] rounded-full filter blur-[80px] opacity-30" />
                    <img
                      src="/images/iphone-hero.png"
                      alt="iPhone 16 Pro Max"
                      className="relative z-10 w-full max-w-sm drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#3b82f6]" />
            </div>
          </div>

          {/* Secondary promotions */}
          <div ref={secondaryRef} className="lg:col-span-2 space-y-6">
            {/* Promo 2 */}
            <div className="secondary-card bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="flex gap-4">
                <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center">
                  <img
                    src="/images/samsung-s24.png"
                    alt="Samsung Bundle"
                    className="w-20 h-auto object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[#3b82f6] mb-2">
                    <Percent className="w-4 h-4" />
                    <span className="text-xs font-medium">BUNDLE</span>
                  </div>
                  <h4 className="font-semibold text-[#0d0d0d] mb-1">Samsung Bundle</h4>
                  <p className="text-sm text-[#4b5563] mb-2">Galaxy S24 + Watch 6</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#0d0d0d]">$1,299</span>
                    <span className="text-sm text-[#9ca3af] line-through">$1,499</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Promo 3 */}
            <div className="secondary-card bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="flex gap-4">
                <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center">
                  <img
                    src="/images/pixel-9.png"
                    alt="Pixel Perfect"
                    className="w-20 h-auto object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[#3b82f6] mb-2">
                    <Percent className="w-4 h-4" />
                    <span className="text-xs font-medium">COMBO</span>
                  </div>
                  <h4 className="font-semibold text-[#0d0d0d] mb-1">Pixel Perfect</h4>
                  <p className="text-sm text-[#4b5563] mb-2">Pixel 9 + Buds Pro</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#0d0d0d]">$1,099</span>
                    <span className="text-sm text-[#9ca3af] line-through">$1,299</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Promo 4 */}
            <div className="secondary-card bg-gradient-to-br from-[#3b82f6] to-[#1e40af] rounded-3xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">¿Necesitas más?</h4>
                  <p className="text-sm text-white/80">Descubre todas nuestras promociones</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white text-[#3b82f6] hover:bg-white/90 rounded-full"
                >
                  Ver más
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
