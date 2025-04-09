
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/90 backdrop-blur-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          <Camera className="h-8 w-8 text-gold" />
          <span className="animate-fade-in">PixelPro</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" label="Anasayfa" />
          <NavLink to="/portfolio" label="Portfolyo" />
          <NavLink to="/services" label="Hizmetler" />
          <NavLink to="/about" label="Hakkımda" />
          <NavLink to="/contact" label="İletişim" />
          <Button asChild variant="outline" 
            className="ml-4 border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-300">
            <Link to="/admin">Admin Giriş</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-navy flex flex-col justify-center items-center z-40 animate-fade-in">
          <div className="flex flex-col space-y-6 items-center">
            <MobileNavLink to="/" label="Anasayfa" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/portfolio" label="Portfolyo" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/services" label="Hizmetler" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/about" label="Hakkımda" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/contact" label="İletişim" onClick={() => setIsOpen(false)} />
            <Button asChild variant="outline" 
              className="mt-4 border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-300">
              <Link to="/admin" onClick={() => setIsOpen(false)}>Admin Giriş</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => (
  <Link 
    to={to} 
    className="text-white/80 hover:text-gold transition-colors duration-300 text-sm font-medium tracking-wide"
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => (
  <Link 
    to={to} 
    className="text-white/80 hover:text-gold transition-colors duration-300 text-2xl font-medium tracking-wide"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;
