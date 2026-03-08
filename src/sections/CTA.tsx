import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      const headline = contentRef.current?.querySelector('h2');
      const description = contentRef.current?.querySelector('p');
      const buttons = contentRef.current?.querySelectorAll('button');

      if (headline) {
        const words = headline.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (description) {
        gsap.fromTo(
          description,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (buttons) {
        gsap.fromTo(
          buttons[0],
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        if (buttons[1]) {
          gsap.fromTo(
            buttons[1],
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // Floating circles animation
      const circles = circlesRef.current?.querySelectorAll('.floating-circle');
      if (circles) {
        circles.forEach((circle, i) => {
          gsap.to(circle, {
            y: -30 + Math.random() * 60,
            x: -20 + Math.random() * 40,
            duration: 5 + i * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-blue animate-gradient-shift" />

      {/* Floating decorative circles */}
      <div ref={circlesRef} className="absolute inset-0 pointer-events-none">
        <div
          className="floating-circle absolute w-64 h-64 bg-white/10 rounded-full blur-3xl"
          style={{ top: '10%', left: '5%' }}
        />
        <div
          className="floating-circle absolute w-96 h-96 bg-white/5 rounded-full blur-3xl"
          style={{ top: '50%', right: '10%' }}
        />
        <div
          className="floating-circle absolute w-48 h-48 bg-white/10 rounded-full blur-2xl"
          style={{ bottom: '20%', left: '30%' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="text-center">
          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="word inline-block">¿Listo</span>{' '}
            <span className="word inline-block">para</span>{' '}
            <span className="word inline-block">tu</span>{' '}
            <span className="word inline-block">nuevo</span>
            <br />
            <span className="word inline-block">dispositivo?</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Visita nuestra tienda o compra online con envío gratis a todo el país
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="bg-white text-[#3b82f6] font-semibold px-8 py-6 rounded-full text-lg hover:bg-white/90 transition-all shadow-xl group"
            >
              Comprar Ahora
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg backdrop-blur-sm"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar Ventas
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-sm">Envío gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-sm">Garantía 2 años</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <span className="text-sm">Soporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
