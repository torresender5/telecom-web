import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingCart} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  tagline: string;
  price: string;
  image: string;
  sms?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 16 Pro Max',
    tagline: 'El más potente',
    price: '$1,299',
    image: '/images/iphone-hero.png',
    sms: `https://wa.me/+584125041143?text=${encodeURIComponent('Buenas Tardes! me puede facilitar informacion para la compra de el telefono *iPhone 16 Pro Max* ')}`
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    tagline: 'Innovación total',
    price: '$1,199',
    image: '/images/samsung-s24.png',
  },
  {
    id: 3,
    name: 'Google Pixel 9 Pro',
    tagline: 'Inteligencia pura',
    price: '$999',
    image: '/images/pixel-9.png',
  },
  {
    id: 4,
    name: 'Xiaomi 14 Ultra',
    tagline: 'Rendimiento extremo',
    price: '$899',
    image: '/images/xiaomi-14.png',
  },
  {
    id: 5,
    name: 'OnePlus 12',
    tagline: 'Velocidad superior',
    price: '$799',
    image: '/images/oneplus-12.png',
  },
  {
    id: 6,
    name: 'Motorola Edge 50',
    tagline: 'Estilo único',
    price: '$699',
    image: '/images/motorola-edge.png',
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(cardRef.current, {
      rotateX: -rotateX,
      rotateY: -rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setIsHovered(false);

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className={`relative bg-gradient-to-b from-white/10 to-white/5 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 ${
          isHovered ? 'glow-blue' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Product image */}
        <div className="relative h-64 sm:h-72 flex items-center justify-center p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 max-h-full w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
          />
        </div>

        {/* Product info */}
        <div className="p-6 space-y-3" style={{ transform: 'translateZ(30px)' }}>
          <div className="text-[#60a5fa] text-sm font-medium">
            {product.tagline}
          </div>
          <h3 className="text-white text-xl font-semibold">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{product.price}</span>
            <Button
              size="sm"
              className="gradient-blue text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              <a href={product.sms} target="_blank" rel="noopener noreferrer">
                Añadir
              </a>
              
            </Button>
          </div>
        </div>

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/0 via-[#3b82f6]/10 to-[#3b82f6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ transform: 'translateZ(10px)' }}
        />
      </div>
    </div>
  );
};

const Products = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const cards = gridRef.current?.querySelectorAll('.product-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { rotateY: 90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="products"
      ref={sectionRef}
      className="relative py-32 gradient-dark overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1e40af]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[#60a5fa] text-sm font-medium mb-6">
            <span>Catálogo</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nuestros <span className="text-gradient">Productos</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Lo último en tecnología móvil, diseñado para quienes buscan lo mejor
          </p>
          
          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#3b82f6]" />
            <div className="w-3 h-3 bg-[#3b82f6] rounded-full" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#3b82f6]" />
          </div>
        </div>

        {/* Products grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1200"
        >
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View all button */}
        {/* <div className="text-center mt-16">
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg group"
          >
            Ver Todos los Productos
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Products;
