
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Plus, 
  Image, 
  Film, 
  Home, 
  FolderOpen, 
  LogOut, 
  Upload,
  Trash2,
  Settings,
  Building2,
  Package,
  PlaneTakeoff,
  Instagram,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock data for portfolio items
const initialPortfolioItems = [
  {
    id: "1",
    title: "Modern Villa Çekimi",
    category: "Gayrimenkul",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    type: "image"
  },
  {
    id: "2",
    title: "Ürün Katalog Çekimi",
    category: "Ürün",
    image: "https://images.unsplash.com/photo-1554941829-202a0b2403b8",
    type: "image"
  },
  {
    id: "3",
    title: "Sahil Drone Çekimi",
    category: "Drone",
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2",
    type: "image"
  },
  {
    id: "4",
    title: "Sosyal Medya İçerik Üretimi",
    category: "Sosyal Medya",
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6",
    type: "image"
  },
  {
    id: "5",
    title: "Lüks Konut Tanıtım Videosu",
    category: "Gayrimenkul",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    type: "video"
  },
];

const categories = [
  { id: "gayrimenkul", name: "Gayrimenkul", icon: <Building2 className="h-5 w-5" /> },
  { id: "urun", name: "Ürün", icon: <Package className="h-5 w-5" /> },
  { id: "drone", name: "Drone", icon: <PlaneTakeoff className="h-5 w-5" /> },
  { id: "sosyal-medya", name: "Sosyal Medya", icon: <Instagram className="h-5 w-5" /> },
  { id: "grafik-tasarim", name: "Grafik Tasarım", icon: <Palette className="h-5 w-5" /> },
];

const AdminDashboard = () => {
  const [portfolioItems, setPortfolioItems] = useState(initialPortfolioItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    category: "",
    image: "",
    type: "image"
  });
  const [selectedTab, setSelectedTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast({
      title: "Çıkış yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
    navigate("/admin");
  };

  const handleAddItem = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newItemWithId = {
        ...newItem,
        id: (portfolioItems.length + 1).toString(),
      };

      setPortfolioItems([newItemWithId, ...portfolioItems]);
      
      setNewItem({
        title: "",
        category: "",
        image: "",
        type: "image"
      });

      setIsAddDialogOpen(false);
      setIsLoading(false);

      toast({
        title: "Portfolyo öğesi eklendi",
        description: "Yeni öğe başarıyla portfolyonuza eklendi.",
      });
    }, 1000);
  };

  const handleDeleteItem = (id: string) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    toast({
      title: "Portfolyo öğesi silindi",
      description: "Öğe başarıyla portfolyonuzdan kaldırıldı.",
    });
  };

  const filteredItems = selectedTab === "all" 
    ? portfolioItems 
    : selectedTab === "images" 
      ? portfolioItems.filter(item => item.type === "image")
      : portfolioItems.filter(item => item.type === "video");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-navy p-5 flex flex-col text-white">
        <div className="mb-8 flex items-center">
          <Image className="h-8 w-8 text-gold mr-2" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-navy-light"
              >
                <Home className="h-5 w-5 mr-2" />
                Anasayfa
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gold hover:bg-navy-light"
              >
                <FolderOpen className="h-5 w-5 mr-2" />
                Portfolyo Yönetimi
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-navy-light"
              >
                <Settings className="h-5 w-5 mr-2" />
                Ayarlar
              </Button>
            </li>
          </ul>
        </nav>

        <Button 
          variant="outline" 
          className="mt-auto border-white/20 text-white hover:bg-navy-light"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Çıkış Yap
        </Button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-navy">Portfolyo Yönetimi</h1>
            <p className="text-gray-600">Çalışmalarınızı düzenleyin ve yeni öğeler ekleyin</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gold hover:bg-gold-light text-navy">
                <Plus className="h-5 w-5 mr-2" />
                Yeni Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Yeni Portfolyo Öğesi Ekle</DialogTitle>
                <DialogDescription>
                  Portfolyonuza eklemek istediğiniz öğenin detaylarını girin.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Başlık
                  </Label>
                  <Input
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Kategori
                  </Label>
                  <Select 
                    onValueChange={(value) => setNewItem({...newItem, category: value})} 
                    defaultValue={newItem.category}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          <div className="flex items-center">
                            {category.icon}
                            <span className="ml-2">{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tür
                  </Label>
                  <Select 
                    onValueChange={(value) => setNewItem({...newItem, type: value})} 
                    defaultValue={newItem.type}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Tür seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">
                        <div className="flex items-center">
                          <Image className="h-4 w-4 mr-2" />
                          Fotoğraf
                        </div>
                      </SelectItem>
                      <SelectItem value="video">
                        <div className="flex items-center">
                          <Film className="h-4 w-4 mr-2" />
                          Video
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Görsel URL
                  </Label>
                  <Input
                    id="image"
                    value={newItem.image}
                    onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                    className="col-span-3"
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button 
                  className="bg-gold hover:bg-gold-light text-navy"
                  onClick={handleAddItem}
                  disabled={!newItem.title || !newItem.category || !newItem.image || isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Ekleniyor...
                    </span>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Ekle
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Tabs */}
          <Tabs defaultValue="all" onValueChange={setSelectedTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="images">Fotoğraflar</TabsTrigger>
              <TabsTrigger value="videos">Videolar</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative rounded-lg overflow-hidden shadow-md"
              >
                <div 
                  className="aspect-square bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-white/80">{item.category}</span>
                      <div className="flex space-x-2">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  {item.type === "image" ? (
                    <div className="bg-white p-1 rounded-md shadow-md">
                      <Image className="h-4 w-4 text-navy" />
                    </div>
                  ) : (
                    <div className="bg-white p-1 rounded-md shadow-md">
                      <Film className="h-4 w-4 text-navy" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
