
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a simple mock login
    // In a real application, this would call an authentication API
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        // Set some local storage value to indicate logged in state
        localStorage.setItem("adminLoggedIn", "true");
        
        toast({
          title: "Giriş başarılı!",
          description: "Admin paneline yönlendiriliyorsunuz.",
          variant: "default",
        });
        
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Giriş başarısız!",
          description: "Kullanıcı adı veya şifre hatalı.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gold rounded-full mb-4">
            <Camera className="h-8 w-8 text-navy" />
          </div>
          <h1 className="text-2xl font-bold text-navy">Admin Giriş</h1>
          <p className="text-navy/60 mt-2">
            Portfolyonuzu yönetmek için giriş yapın
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Kullanıcı Adı</Label>
            <Input
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border-gray-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-gray-300"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gold hover:bg-gold-light text-navy font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Giriş Yapılıyor...
              </span>
            ) : (
              <span className="flex items-center">
                <LogIn className="mr-2 h-5 w-5" />
                Giriş Yap
              </span>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-navy/60">
          <p>Demo için: kullanıcı adı "admin" ve şifre "password"</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
