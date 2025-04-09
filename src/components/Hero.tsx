
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-navy">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover h-full w-full opacity-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-32807-large.mp4" type="video/mp4" />
          Your browser does not support video tags.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/60 to-navy"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className={`text-5xl md:text-7xl font-bold text-white mb-4 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <span className="block">Profesyonel Fotoğraf</span>
          <span className="block mt-2 text-gold">& Video Hizmetleri</span>
        </h1>
        
        <p className={`text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          Gayrimenkul çekimleri, ürün çekimi, drone ile hava çekimleri ve daha fazlası. 
          Profesyonel görsel içerikler ile markanızı öne çıkarın.
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <Button asChild className="bg-gold hover:bg-gold-light text-navy font-semibold px-6 py-6 text-lg">
            <Link to="/portfolio">Portfolyo İncele <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-6 py-6 text-lg">
            <Link to="/contact">İletişime Geç</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer animate-bounce"
        onClick={scrollToContent}
      >
        <ChevronDown className="h-8 w-8 text-gold" />
      </div>
    </div>
  );
};

export default Hero;
