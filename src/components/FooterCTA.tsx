
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const FooterCTA = () => {
  return (
    <section className="relative bg-navy py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d')] bg-cover bg-center opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Projeniz İçin <span className="text-gold">Profesyonel Çözümler</span> Sunalım
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Ürün fotoğrafçılığından profesyonel drone çekimlerine, sosyal medya yönetiminden gayrimenkul çekimlerine kadar tüm görsel ihtiyaçlarınız için iletişime geçin.
          </p>
          <Button asChild className="bg-gold hover:bg-gold-light text-navy font-semibold px-8 py-6 text-lg">
            <Link to="/contact">
              Hemen İletişime Geçin <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
