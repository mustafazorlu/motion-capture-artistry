
import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-light text-white/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <Camera className="h-8 w-8 text-gold" />
              <span>PixelPro</span>
            </Link>
            <p className="mb-6">
              Profesyonel fotoğraf, video ve tasarım hizmetleri ile markanızı öne çıkarın.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Instagram className="h-5 w-5" />} href="https://instagram.com" />
              <SocialLink icon={<Facebook className="h-5 w-5" />} href="https://facebook.com" />
              <SocialLink icon={<Youtube className="h-5 w-5" />} href="https://youtube.com" />
              <SocialLink icon={<Twitter className="h-5 w-5" />} href="https://twitter.com" />
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Hizmetler</h3>
            <ul className="space-y-2">
              <FooterLink text="Gayrimenkul Çekimleri" href="/services#real-estate" />
              <FooterLink text="Ürün Çekimi" href="/services#product" />
              <FooterLink text="Drone Çekimi" href="/services#drone" />
              <FooterLink text="Sosyal Medya Yönetimi" href="/services#social-media" />
              <FooterLink text="Grafik Tasarım" href="/services#graphic-design" />
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <FooterLink text="Anasayfa" href="/" />
              <FooterLink text="Portfolyo" href="/portfolio" />
              <FooterLink text="Hakkımda" href="/about" />
              <FooterLink text="İletişim" href="/contact" />
              <FooterLink text="Admin Giriş" href="/admin" />
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold mr-3 mt-1 flex-shrink-0" />
                <span>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                <span>+90 555 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                <span>info@pixelpro.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm">
          <p>&copy; {currentYear} PixelPro. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text, href }: { text: string; href: string }) => (
  <li>
    <Link 
      to={href} 
      className="hover:text-gold transition-colors duration-300"
    >
      {text}
    </Link>
  </li>
);

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white/10 hover:bg-gold hover:text-navy p-2 rounded-full transition-colors duration-300"
  >
    {icon}
  </a>
);

export default Footer;
