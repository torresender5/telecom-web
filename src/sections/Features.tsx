import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, Shield, Headphones, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: 'Envío Gratis',
    description: 'Entrega en 24-48 horas a todo el país',
    icon: Truck,
    color: 'from-[#3b82f6] to-[#60a5fa]',
  },
  {
    id: 2,
    title: 'Garantía Extendida',
    description: '2 años de protección en todos los dispositivos',
    icon: Shield,
    color: 'from-[#22c55e] to-[#4ade80]',
  },
  {
    id: 3,
    title: 'Soporte 24/7',
    description: 'Atención personalizada cuando la necesites',
    icon: Headphones,
    color: 'from-[#f59e0b] to-[#fbbf24]',
  },
  {
    id: 4,
    title: 'Devolución Fácil',
    description: '30 días para cambios y devoluciones',
    icon: RefreshCw,
    color: 'from-[#ec4899] to-[#f472b6]',
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards pop-in animation
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.1,
            }
          );

          // Icon rotation
          const icon = card.querySelector('.feature-icon');
          if (icon) {
            gsap.fromTo(
              icon,
              { rotate: -180, scale: 0 },
              {
                rotate: 0,
                scale: 1,
                duration: 0.6,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
                delay: i * 0.1 + 0.2,
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1e40af]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0d0d0d] mb-4">
            ¿Por Qué <span className="text-gradient">Elegirnos?</span>
          </h2>
          <p className="text-xl text-[#4b5563] max-w-2xl mx-auto">
            La mejor experiencia en telecomunicaciones
          </p>
        </div>

        {/* Features grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="feature-card group relative bg-gradient-to-b from-[#f5f5f5] to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Icon */}
                <div
                  className={`feature-icon w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0d0d0d] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#4b5563] leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
