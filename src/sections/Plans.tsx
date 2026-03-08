import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap, Globe, Headphones, Wifi, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface Plan {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  featured: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: 1,
    name: 'Básico',
    price: 25,
    period: '/mes',
    description: 'Perfecto para comenzar',
    features: [
      '5GB de datos mensuales',
      'Llamadas ilimitadas',
      '100 SMS mensuales',
      'Red 5G',
      'App de gestión',
    ],
    icon: <Wifi className="w-6 h-6" />,
    featured: false,
  },
  {
    id: 2,
    name: 'Premium',
    price: 45,
    period: '/mes',
    description: 'El más elegido por nuestros clientes',
    features: [
      'Datos ilimitados',
      'Llamadas ilimitadas',
      'SMS ilimitados',
      'Red 5G+ ultrarrápida',
      'Roaming incluido',
      'Hotspot 20GB',
      'Soporte prioritario',
    ],
    icon: <Zap className="w-6 h-6" />,
    featured: true,
    badge: 'RECOMENDADO',
  },
  {
    id: 3,
    name: 'Empresarial',
    price: 75,
    period: '/mes',
    description: 'Para equipos que necesitan más',
    features: [
      'Datos ilimitados premium',
      'Llamadas internacionales',
      '5 líneas incluidas',
      'Red 5G+ dedicada',
      'Roaming global',
      'Soporte 24/7',
      'Gestor de cuenta',
    ],
    icon: <Globe className="w-6 h-6" />,
    featured: false,
  },
];

const PlanCard = ({ plan }: { plan: Plan }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Price counter animation
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(
            { value: 0 },
            {
              value: plan.price,
              duration: 1,
              ease: 'power2.out',
              onUpdate: function () {
                setDisplayPrice(Math.round(this.targets()[0].value));
              },
            }
          );
        },
        once: true,
      });
    }, cardRef);

    return () => ctx.revert();
  }, [plan.price]);

  return (
    <div
      ref={cardRef}
      className={`relative group ${plan.featured ? 'lg:-mt-8 lg:mb-8' : ''}`}
    >
      {/* Featured glow */}
      {plan.featured && (
        <div className="absolute -inset-1 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
      )}

      <div
        className={`relative h-full rounded-3xl p-8 transition-all duration-500 ${
          plan.featured
            ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border-2 border-[#3b82f6] glow-blue'
            : 'bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-white/20'
        }`}
      >
        {/* Badge */}
        {plan.badge && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white px-4 py-1 rounded-full text-sm font-bold">
              {plan.badge}
            </div>
          </div>
        )}

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
            plan.featured
              ? 'bg-gradient-to-br from-[#3b82f6] to-[#1e40af] text-white'
              : 'bg-white/10 text-[#60a5fa]'
          }`}
        >
          {plan.icon}
        </div>

        {/* Plan name */}
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-white/60 text-sm mb-6">{plan.description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-white/60 text-2xl">$</span>
          <span
            ref={priceRef}
            className="text-5xl font-bold text-white"
          >
            {displayPrice}
          </span>
          <span className="text-white/60">{plan.period}</span>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  plan.featured
                    ? 'bg-[#3b82f6] text-white'
                    : 'bg-white/10 text-[#60a5fa]'
                }`}
              >
                <Check className="w-3 h-3" />
              </div>
              <span className="text-white/80 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          className={`w-full py-6 rounded-xl font-semibold transition-all ${
            plan.featured
              ? 'gradient-blue text-white hover:opacity-90 glow-blue'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {plan.id === 3 ? 'Contactar Ventas' : `Elegir ${plan.name}`}
        </Button>
      </div>
    </div>
  );
};

const Plans = () => {
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
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards entrance
      const cards = cardsRef.current?.querySelectorAll('.plan-card');
      if (cards) {
        gsap.fromTo(
          cards[0],
          { x: -80, opacity: 0, rotateY: 15 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          cards[1],
          { scale: 0.8, opacity: 0, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          cards[2],
          { x: 80, opacity: 0, rotateY: -15 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
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
      id="plans"
      ref={sectionRef}
      className="relative py-32 gradient-dark overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[#60a5fa] text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>Planes Flexibles</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Planes de <span className="text-gradient">Líneas</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Elige el plan perfecto para tu estilo de vida
          </p>
        </div>

        {/* Plans grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 perspective-1200 items-center"
        >
          {plans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>

        {/* Support note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-white/60">
            <Headphones className="w-5 h-5" />
            <span>¿Tienes dudas? Contacta a nuestro equipo de soporte 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
