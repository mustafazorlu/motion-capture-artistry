
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.div
            className="text-[10rem] md:text-[15rem] font-bold text-gold opacity-10"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            404
          </motion.div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              404
            </h1>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-white mt-4 mb-8">
          Aradığınız sayfa bulunamadı
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-gold hover:bg-gold-light text-navy">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" /> Anasayfaya Dön
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="javascript:history.back()">
              <ArrowLeft className="mr-2 h-5 w-5" /> Geri Git
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
