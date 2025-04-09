
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import PortfolioItem from '@/components/PortfolioItem';
import FooterCTA from '@/components/FooterCTA';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Camera, Building2, Package, Drone, Instagram, Palette, ArrowRight } from 'lucide-react';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample services data
  const services = [
    {
      title: 'Gayrimenkul Çekimleri',
      description: 'Profesyonel gayrimenkul fotoğrafçılığı ve video çekimleri ile mülklerinizi en iyi şekilde sergileyin.',
      icon: <Building2 className="h-10 w-10" />,
      bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    },
    {
      title: 'Ürün Çekimi',
      description: 'Ürünlerinizin detaylarını ön plana çıkaran profesyonel stüdyo çekimleri ile satışlarınızı artırın.',
      icon: <Package className="h-10 w-10" />,
      bgImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    },
    {
      title: 'Drone Çekimi',
      description: 'Yükseklerden nefes kesen manzaralar ve etkileyici havadan görüntüler ile farklı bir perspektif sunun.',
      icon: <Drone className="h-10 w-10" />,
      bgImage: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44',
    },
    {
      title: 'Sosyal Medya Yönetimi',
      description: 'Profesyonel içerik üretimi ve yönetimi ile sosyal medya varlığınızı güçlendirin.',
      icon: <Instagram className="h-10 w-10" />,
      bgImage: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
    },
    {
      title: 'Grafik Tasarım',
      description: 'Marka kimliğinizi yansıtan, etkili görsel içerikler ile hedef kitlenize ulaşın.',
      icon: <Palette className="h-10 w-10" />,
      bgImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d',
    }
  ];

  // Sample portfolio data
  const featuredPortfolio = [
    {
      title: 'Modern Villa Çekimi',
      category: 'Gayrimenkul',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    },
    {
      title: 'Ürün Katalog Çekimi',
      category: 'Ürün',
      image: 'https://images.unsplash.com/photo-1554941829-202a0b2403b8',
    },
    {
      title: 'Sahil Drone Çekimi',
      category: 'Drone',
      image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2',
    },
    {
      title: 'Sosyal Medya İçerik Üretimi',
      category: 'Sosyal Medya',
      image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-navy to-navy-light">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Profesyonel <span className="text-gold">Hizmetlerimiz</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Fotoğraf ve video prodüksiyonundan sosyal medya yönetimine, drone çekimlerinden grafik tasarıma kadar geniş hizmet yelpazemiz ile yanınızdayız.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                bgImage={service.bgImage}
                delay={index}
              />
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button asChild className="bg-gold hover:bg-gold-light text-navy font-medium">
              <Link to="/services">
                Tüm Hizmetleri İncele <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              Öne Çıkan <span className="text-gold">Çalışmalarımız</span>
            </h2>
            <p className="text-navy/70 max-w-2xl mx-auto">
              Farklı kategorilerdeki portföy çalışmalarımızı inceleyin, size sunabileceğimiz kaliteyi keşfedin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPortfolio.map((item, index) => (
              <PortfolioItem 
                key={index}
                title={item.title}
                category={item.category}
                image={item.image}
                index={index}
              />
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button asChild className="bg-navy hover:bg-navy-light text-white">
              <Link to="/portfolio">
                Tüm Çalışmaları İncele <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem number="250+" label="Tamamlanan Proje" delay={0} />
            <StatItem number="50+" label="Mutlu Müşteri" delay={1} />
            <StatItem number="5+" label="Yıllık Deneyim" delay={2} />
            <StatItem number="1000+" label="Fotoğraf Çekimi" delay={3} />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              Müşterilerimizin <span className="text-gold">Yorumları</span>
            </h2>
            <p className="text-navy/70 max-w-2xl mx-auto">
              Profesyonel hizmetlerimiz hakkında müşterilerimizin görüşleri.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Emlak portföyümüz için yapılan çekimler sayesinde satışlarımız %30 arttı. Profesyonel yaklaşımları için teşekkürler."
              name="Ahmet Yılmaz"
              title="ABC Gayrimenkul Yöneticisi"
              delay={0}
            />
            <TestimonialCard 
              quote="Ürünlerimizin bu kadar güzel görünebileceğini düşünmemiştim. Online satışlarımız çekimlerden sonra ciddi oranda yükseldi."
              name="Ayşe Kaya"
              title="XYZ Butik Kurucusu"
              delay={1}
            />
            <TestimonialCard 
              quote="Drone çekimleri ile otelimizin tanıtım videosu beklentilerimizin çok üzerinde oldu. Kesinlikle tavsiye ediyorum."
              name="Mehmet Demir"
              title="Seaside Resort Genel Müdürü"
              delay={2}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <FooterCTA />
    </div>
  );
};

// Stat Item Component
const StatItem = ({ number, label, delay }: { number: string; label: string; delay: number }) => (
  <motion.div 
    className="text-center p-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="font-bold text-4xl md:text-5xl text-gold mb-2">{number}</div>
    <div className="text-white/80 text-lg">{label}</div>
  </motion.div>
);

// Testimonial Card Component
const TestimonialCard = ({ quote, name, title, delay }: { quote: string; name: string; title: string; delay: number }) => (
  <motion.div 
    className="bg-gray-50 p-8 rounded-lg shadow-md"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="text-navy-light mb-6">
      <svg className="h-8 w-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>
    <p className="text-navy mb-6">{quote}</p>
    <div>
      <p className="font-semibold text-navy">{name}</p>
      <p className="text-navy/60 text-sm">{title}</p>
    </div>
  </motion.div>
);

export default Index;
