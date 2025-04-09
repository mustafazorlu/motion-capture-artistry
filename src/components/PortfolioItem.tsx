
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useState } from 'react';

interface PortfolioItemProps {
  image: string;
  title: string;
  category: string;
  index: number;
}

const PortfolioItem = ({ image, title, category, index }: PortfolioItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg aspect-square"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      <div 
        className={`absolute inset-0 bg-navy/60 flex flex-col justify-center items-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-gold text-sm uppercase tracking-wider mb-2">
          {category}
        </span>
        <h3 className="text-xl font-bold text-white text-center px-4 mb-4">
          {title}
        </h3>
        <div className="p-2 bg-gold rounded-full">
          <Eye className="h-6 w-6 text-navy" />
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioItem;
