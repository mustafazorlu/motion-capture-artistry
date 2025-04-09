
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgImage: string;
  delay?: number;
}

const ServiceCard = ({ title, description, icon, bgImage, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-lg h-[400px] cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
      
      <div className="relative h-full flex flex-col justify-end p-6 z-10">
        <div className="mb-4 text-gold">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="text-white/80 group-hover:text-white transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
