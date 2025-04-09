
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
  Palette,
  Edit,
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Types
interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  type: string;
  description?: string;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgImage: string;
}

// Mock data for portfolio items
const initialPortfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Modern Villa Çekimi",
    category: "Gayrimenkul",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    type: "image",
    description: "Lüks villa çekimi özel tekniklerle yapılmıştır."
  },
  {
    id: "2",
    title: "Ürün Katalog Çekimi",
    category: "Ürün",
    image: "https://images.unsplash.com/photo-1554941829-202a0b2403b8",
    type: "image",
    description: "Katalog için yapılmış özel aydınlatmalı ürün çekimi."
  },
  {
    id: "3",
    title: "Sahil Drone Çekimi",
    category: "Drone",
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2",
    type: "image",
    description: "Kuş bakışı muhteşem sahil çekimi."
  },
  {
    id: "4",
    title: "Sosyal Medya İçerik Üretimi",
    category: "Sosyal Medya",
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6",
    type: "image",
    description: "Instagram için hazırlanmış sosyal medya içeriği."
  },
  {
    id: "5",
    title: "Lüks Konut Tanıtım Videosu",
    category: "Gayrimenkul",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    type: "video",
    description: "Konut tanıtımı için çekilmiş video içeriği."
  },
];

// Initial service items
const initialServiceItems: ServiceItem[] = [
  {
    id: "1",
    title: "Gayrimenkul Çekimleri",
    description: "Profesyonel gayrimenkul fotoğrafçılığı ve video çekimleri ile mülklerinizi en iyi şekilde sergileyin.",
    icon: "Building2",
    bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: "2",
    title: "Ürün Çekimi",
    description: "Ürünlerinizin detaylarını ön plana çıkaran profesyonel stüdyo çekimleri ile satışlarınızı artırın.",
    icon: "Package",
    bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  },
  {
    id: "3",
    title: "Drone Çekimi",
    description: "Yükseklerden nefes kesen manzaralar ve etkileyici havadan görüntüler ile farklı bir perspektif sunun.",
    icon: "PlaneTakeoff",
    bgImage: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44",
  },
  {
    id: "4",
    title: "Sosyal Medya Yönetimi",
    description: "Profesyonel içerik üretimi ve yönetimi ile sosyal medya varlığınızı güçlendirin.",
    icon: "Instagram",
    bgImage: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
  },
  {
    id: "5",
    title: "Grafik Tasarım",
    description: "Marka kimliğinizi yansıtan, etkili görsel içerikler ile hedef kitlenize ulaşın.",
    icon: "Palette",
    bgImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
  }
];

const categories = [
  { id: "gayrimenkul", name: "Gayrimenkul", icon: <Building2 className="h-5 w-5" /> },
  { id: "urun", name: "Ürün", icon: <Package className="h-5 w-5" /> },
  { id: "drone", name: "Drone", icon: <PlaneTakeoff className="h-5 w-5" /> },
  { id: "sosyal-medya", name: "Sosyal Medya", icon: <Instagram className="h-5 w-5" /> },
  { id: "grafik-tasarim", name: "Grafik Tasarım", icon: <Palette className="h-5 w-5" /> },
];

const iconOptions = [
  { value: "Building2", label: "Bina", icon: <Building2 className="h-5 w-5" /> },
  { value: "Package", label: "Ürün", icon: <Package className="h-5 w-5" /> },
  { value: "PlaneTakeoff", label: "Drone", icon: <PlaneTakeoff className="h-5 w-5" /> },
  { value: "Instagram", label: "Sosyal Medya", icon: <Instagram className="h-5 w-5" /> },
  { value: "Palette", label: "Tasarım", icon: <Palette className="h-5 w-5" /> },
];

const AdminDashboard = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialPortfolioItems);
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>(initialServiceItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isEditingPortfolio, setIsEditingPortfolio] = useState<string | null>(null);
  const [isEditingService, setIsEditingService] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const [activeSection, setActiveSection] = useState("portfolio");
  const [isLoading, setIsLoading] = useState(false);
  const [newItem, setNewItem] = useState<PortfolioItem>({
    id: "",
    title: "",
    category: "",
    image: "",
    type: "image",
    description: ""
  });
  const [newService, setNewService] = useState<ServiceItem>({
    id: "",
    title: "",
    description: "",
    icon: "",
    bgImage: ""
  });
  
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

  // Portfolio item operations
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
        id: "",
        title: "",
        category: "",
        image: "",
        type: "image",
        description: ""
      });

      setIsAddDialogOpen(false);
      setIsLoading(false);

      toast({
        title: "Portfolyo öğesi eklendi",
        description: "Yeni öğe başarıyla portfolyonuza eklendi.",
      });
    }, 1000);
  };

  const handleEditItem = (id: string) => {
    const itemToEdit = portfolioItems.find(item => item.id === id);
    if (itemToEdit) {
      setNewItem({ ...itemToEdit });
      setIsEditingPortfolio(id);
      setIsAddDialogOpen(true);
    }
  };

  const handleUpdateItem = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const updatedItems = portfolioItems.map(item => 
        item.id === isEditingPortfolio ? newItem : item
      );

      setPortfolioItems(updatedItems);
      setIsAddDialogOpen(false);
      setIsEditingPortfolio(null);
      setIsLoading(false);
      
      setNewItem({
        id: "",
        title: "",
        category: "",
        image: "",
        type: "image",
        description: ""
      });

      toast({
        title: "Portfolyo öğesi güncellendi",
        description: "Öğe başarıyla güncellendi.",
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

  // Service item operations
  const handleAddService = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newServiceWithId = {
        ...newService,
        id: (serviceItems.length + 1).toString(),
      };

      setServiceItems([newServiceWithId, ...serviceItems]);
      
      setNewService({
        id: "",
        title: "",
        description: "",
        icon: "",
        bgImage: ""
      });

      setIsServiceDialogOpen(false);
      setIsLoading(false);

      toast({
        title: "Hizmet eklendi",
        description: "Yeni hizmet başarıyla eklendi.",
      });
    }, 1000);
  };

  const handleEditService = (id: string) => {
    const serviceToEdit = serviceItems.find(service => service.id === id);
    if (serviceToEdit) {
      setNewService({ ...serviceToEdit });
      setIsEditingService(id);
      setIsServiceDialogOpen(true);
    }
  };

  const handleUpdateService = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const updatedServices = serviceItems.map(service => 
        service.id === isEditingService ? newService : service
      );

      setServiceItems(updatedServices);
      setIsServiceDialogOpen(false);
      setIsEditingService(null);
      setIsLoading(false);
      
      setNewService({
        id: "",
        title: "",
        description: "",
        icon: "",
        bgImage: ""
      });

      toast({
        title: "Hizmet güncellendi",
        description: "Hizmet başarıyla güncellendi.",
      });
    }, 1000);
  };

  const handleDeleteService = (id: string) => {
    setServiceItems(serviceItems.filter(service => service.id !== id));
    toast({
      title: "Hizmet silindi",
      description: "Hizmet başarıyla kaldırıldı.",
    });
  };

  const filteredItems = selectedTab === "all" 
    ? portfolioItems 
    : selectedTab === "images" 
      ? portfolioItems.filter(item => item.type === "image")
      : portfolioItems.filter(item => item.type === "video");

  // Reset form when dialogs close
  useEffect(() => {
    if (!isAddDialogOpen) {
      if (isEditingPortfolio) {
        setIsEditingPortfolio(null);
        setNewItem({
          id: "",
          title: "",
          category: "",
          image: "",
          type: "image",
          description: ""
        });
      }
    }
  }, [isAddDialogOpen]);

  useEffect(() => {
    if (!isServiceDialogOpen) {
      if (isEditingService) {
        setIsEditingService(null);
        setNewService({
          id: "",
          title: "",
          description: "",
          icon: "",
          bgImage: ""
        });
      }
    }
  }, [isServiceDialogOpen]);

  // Get icon component by name
  const getIconByName = (iconName: string) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className="h-5 w-5" />;
      case "Package":
        return <Package className="h-5 w-5" />;
      case "PlaneTakeoff":
        return <PlaneTakeoff className="h-5 w-5" />;
      case "Instagram":
        return <Instagram className="h-5 w-5" />;
      case "Palette":
        return <Palette className="h-5 w-5" />;
      default:
        return <Image className="h-5 w-5" />;
    }
  };

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
                className={`w-full justify-start ${activeSection === "home" ? "text-gold" : "text-white"} hover:bg-navy-light`}
                onClick={() => setActiveSection("home")}
              >
                <Home className="h-5 w-5 mr-2" />
                Anasayfa
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeSection === "portfolio" ? "text-gold" : "text-white"} hover:bg-navy-light`}
                onClick={() => setActiveSection("portfolio")}
              >
                <FolderOpen className="h-5 w-5 mr-2" />
                Portfolyo Yönetimi
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeSection === "services" ? "text-gold" : "text-white"} hover:bg-navy-light`}
                onClick={() => setActiveSection("services")}
              >
                <Settings className="h-5 w-5 mr-2" />
                Hizmetler Yönetimi
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
        {activeSection === "portfolio" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-navy">Portfolyo Yönetimi</h1>
                <p className="text-gray-600">Çalışmalarınızı düzenleyin ve yeni öğeler ekleyin</p>
              </div>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gold hover:bg-gold-light text-navy">
                    <Plus className="h-5 w-5 mr-2" />
                    Yeni Portfolyo Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      {isEditingPortfolio ? "Portfolyo Öğesini Düzenle" : "Yeni Portfolyo Öğesi Ekle"}
                    </DialogTitle>
                    <DialogDescription>
                      {isEditingPortfolio 
                        ? "Portfolyonuzdaki öğeyi düzenleyin." 
                        : "Portfolyonuza eklemek istediğiniz öğenin detaylarını girin."}
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
                        value={newItem.category}
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
                        value={newItem.type}
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

                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="description" className="text-right pt-2">
                        Açıklama
                      </Label>
                      <Textarea
                        id="description"
                        value={newItem.description || ""}
                        onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                        className="col-span-3 min-h-[100px]"
                        placeholder="Portfolyo öğesi hakkında detaylı açıklama..."
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
                      onClick={isEditingPortfolio ? handleUpdateItem : handleAddItem}
                      disabled={!newItem.title || !newItem.category || !newItem.image || isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {isEditingPortfolio ? "Güncelleniyor..." : "Ekleniyor..."}
                        </span>
                      ) : (
                        <>
                          {isEditingPortfolio ? <Save className="h-4 w-4 mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                          {isEditingPortfolio ? "Güncelle" : "Ekle"}
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
                              variant="outline" 
                              size="sm"
                              className="bg-white/20 hover:bg-white/40 border-transparent text-white"
                              onClick={() => handleEditItem(item.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-sm text-white/80 mt-2 line-clamp-2">{item.description}</p>
                        )}
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
          </>
        )}

        {activeSection === "services" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-navy">Hizmetler Yönetimi</h1>
                <p className="text-gray-600">Sunduğunuz hizmetleri düzenleyin ve yeni hizmetler ekleyin</p>
              </div>
              
              <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gold hover:bg-gold-light text-navy">
                    <Plus className="h-5 w-5 mr-2" />
                    Yeni Hizmet Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      {isEditingService ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
                    </DialogTitle>
                    <DialogDescription>
                      {isEditingService 
                        ? "Mevcut hizmeti düzenleyin." 
                        : "Sunduğunuz yeni hizmetin detaylarını girin."}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="serviceTitle" className="text-right">
                        Başlık
                      </Label>
                      <Input
                        id="serviceTitle"
                        value={newService.title}
                        onChange={(e) => setNewService({...newService, title: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="serviceDescription" className="text-right pt-2">
                        Açıklama
                      </Label>
                      <Textarea
                        id="serviceDescription"
                        value={newService.description}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                        className="col-span-3 min-h-[100px]"
                        placeholder="Hizmet hakkında detaylı açıklama..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="serviceIcon" className="text-right">
                        İkon
                      </Label>
                      <Select 
                        onValueChange={(value) => setNewService({...newService, icon: value})} 
                        value={newService.icon}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="İkon seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((icon) => (
                            <SelectItem key={icon.value} value={icon.value}>
                              <div className="flex items-center">
                                {icon.icon}
                                <span className="ml-2">{icon.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="serviceBgImage" className="text-right">
                        Arkaplan URL
                      </Label>
                      <Input
                        id="serviceBgImage"
                        value={newService.bgImage}
                        onChange={(e) => setNewService({...newService, bgImage: e.target.value})}
                        className="col-span-3"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsServiceDialogOpen(false)}
                    >
                      İptal
                    </Button>
                    <Button 
                      className="bg-gold hover:bg-gold-light text-navy"
                      onClick={isEditingService ? handleUpdateService : handleAddService}
                      disabled={!newService.title || !newService.description || !newService.icon || !newService.bgImage || isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {isEditingService ? "Güncelleniyor..." : "Ekleniyor..."}
                        </span>
                      ) : (
                        <>
                          {isEditingService ? <Save className="h-4 w-4 mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                          {isEditingService ? "Güncelle" : "Ekle"}
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>İkon</TableHead>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Açıklama</TableHead>
                    <TableHead>Arkaplan</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceItems.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">
                        <div className="bg-navy/10 p-2 rounded-md inline-flex">
                          {getIconByName(service.icon)}
                        </div>
                      </TableCell>
                      <TableCell>{service.title}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate">{service.description}</p>
                      </TableCell>
                      <TableCell>
                        <div 
                          className="h-10 w-16 bg-cover bg-center rounded-md"
                          style={{ backgroundImage: `url(${service.bgImage})` }}
                        />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditService(service.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {activeSection === "home" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-navy mb-4">Hoş Geldiniz</h1>
            <p className="text-gray-600 mb-4">Admin panelinizden portfolyo ve hizmet yönetimi yapabilirsiniz.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-navy/10 p-6 rounded-lg flex flex-col items-center text-center cursor-pointer"
                onClick={() => setActiveSection("portfolio")}
              >
                <FolderOpen className="h-12 w-12 text-navy mb-4" />
                <h2 className="text-lg font-semibold text-navy mb-2">Portfolyo Yönetimi</h2>
                <p className="text-gray-600">Çalışmalarınızı düzenleyin ve yeni öğeler ekleyin.</p>
                <Button 
                  className="mt-4 bg-navy hover:bg-navy-light text-white"
                  onClick={() => setActiveSection("portfolio")}
                >
                  Portfolyo'ya Git
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gold/10 p-6 rounded-lg flex flex-col items-center text-center cursor-pointer"
                onClick={() => setActiveSection("services")}
              >
                <Settings className="h-12 w-12 text-gold mb-4" />
                <h2 className="text-lg font-semibold text-navy mb-2">Hizmet Yönetimi</h2>
                <p className="text-gray-600">Sunduğunuz hizmetleri düzenleyin ve yeni hizmetler ekleyin.</p>
                <Button 
                  className="mt-4 bg-gold hover:bg-gold-light text-navy"
                  onClick={() => setActiveSection("services")}
                >
                  Hizmetlere Git
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
