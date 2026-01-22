import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Building2, Heart, PlusCircle, Menu, X } from 'lucide-react';
import { PropertyCard } from '@/app/components/PropertyCard';
import { SearchFilters } from '@/app/components/SearchFilters';
import { PropertyDetails } from '@/app/components/PropertyDetails';
import { mockProperties, filterProperties, propertyTypeLabels, type Property, type PropertyType, type District } from '@/data/properties';

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [activeTab, setActiveTab] = useState<'all' | PropertyType>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setDetailsOpen(true);
  };

  const handleSearch = (filters: {
    searchTerm?: string;
    type?: PropertyType;
    district?: District;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const filtered = filterProperties(mockProperties, filters);
    setFilteredProperties(filtered);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'all' | PropertyType);
    if (value === 'all') {
      setFilteredProperties(mockProperties);
    } else {
      setFilteredProperties(mockProperties.filter(p => p.type === value));
    }
  };

  const featuredProperties = mockProperties.filter(p => p.featured);
  const displayProperties = activeTab === 'all' 
    ? filteredProperties 
    : filteredProperties.filter(p => p.type === activeTab);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Building2 className="h-8 w-8 text-[#8F6E5E]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#4A90A4] rounded-full"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#8F6E5E]">المَقام</h1>
                <p className="text-xs text-muted-foreground">حيث يطيبُ المُستقر</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Button variant="ghost" className="gap-2">
                <Heart className="h-4 w-4" />
                المفضلة
              </Button>
              <Button className="gap-2 bg-[#4A90A4] hover:bg-[#3A7A8A]">
                <PlusCircle className="h-4 w-4" />
                إضافة إعلان
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start gap-2">
                  <Heart className="h-4 w-4" />
                  المفضلة
                </Button>
                <Button className="justify-start gap-2 bg-[#4A90A4] hover:bg-[#3A7A8A]">
                  <PlusCircle className="h-4 w-4" />
                  إضافة إعلان
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F5F5F0] to-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#8F6E5E] to-[#4A90A4] bg-clip-text text-transparent">
              ابحث عن مستقرك في صنعاء
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              منصة عقارية شاملة لأمانة العاصمة تقدم لك تفاصيل دقيقة عن المياه، الكهرباء، والخدمات
            </p>
          </div>

          <SearchFilters onSearch={handleSearch} />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-[#8F6E5E] mb-1">
                {mockProperties.length}
              </div>
              <div className="text-sm text-muted-foreground">عقار متاح</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-[#4A90A4] mb-1">10</div>
              <div className="text-sm text-muted-foreground">مديرية</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-[#8F6E5E] mb-1">
                {featuredProperties.length}
              </div>
              <div className="text-sm text-muted-foreground">عقار مميز</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-[#4A90A4] mb-1">100%</div>
              <div className="text-sm text-muted-foreground">معلومات موثوقة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Featured Properties */}
        {featuredProperties.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-[#8F6E5E] rounded"></div>
              <h2 className="text-2xl font-bold">عقارات مميزة</h2>
              <Badge className="bg-[#4A90A4]">جديد</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.slice(0, 3).map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Properties with Tabs */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-1 w-12 bg-[#4A90A4] rounded"></div>
            <h2 className="text-2xl font-bold">جميع العقارات</h2>
            <span className="text-muted-foreground">({displayProperties.length})</span>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#8F6E5E] data-[state=active]:text-white">
                الكل
              </TabsTrigger>
              <TabsTrigger value="apartment" className="data-[state=active]:bg-[#8F6E5E] data-[state=active]:text-white">
                شقق
              </TabsTrigger>
              <TabsTrigger value="villa" className="data-[state=active]:bg-[#8F6E5E] data-[state=active]:text-white">
                فلل
              </TabsTrigger>
              <TabsTrigger value="shop" className="data-[state=active]:bg-[#8F6E5E] data-[state=active]:text-white">
                محلات
              </TabsTrigger>
              <TabsTrigger value="building" className="data-[state=active]:bg-[#8F6E5E] data-[state=active]:text-white">
                عمائر
              </TabsTrigger>
              <TabsTrigger value="office" className="data-[state=active]:bg-[#8F6E5E] data-[state=active]:text-white">
                مكاتب
              </TabsTrigger>
              <TabsTrigger value="wedding-hall" className="data-[state=active]:bg-[#8F6E5E] data-[state=active]:text-white">
                صالات أعراس
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {displayProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayProperties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">لا توجد عقارات</h3>
                  <p className="text-muted-foreground">جرب تغيير معايير البحث</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2C2620] text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6 text-[#B8866E]" />
                <h3 className="text-lg font-bold">المَقام</h3>
              </div>
              <p className="text-sm text-gray-400">
                منصة عقارية متخصصة في أمانة العاصمة صنعاء، نوفر لك معلومات دقيقة وشاملة عن جميع أنواع العقارات.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">الصفحة الرئيسية</a></li>
                <li><a href="#" className="hover:text-white">عن المقام</a></li>
                <li><a href="#" className="hover:text-white">شروط الاستخدام</a></li>
                <li><a href="#" className="hover:text-white">سياسة الخصوصية</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">أنواع العقارات</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {Object.entries(propertyTypeLabels).slice(0, 5).map(([key, label]) => (
                  <li key={key}>
                    <a href="#" className="hover:text-white">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📞 هاتف: 777123456</li>
                <li>✉️ البريد: info@almaqam.ye</li>
                <li>📍 صنعاء، اليمن</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 المقام - جميع الحقوق محفوظة</p>
            <p className="mt-2 text-xs">حيث يطيبُ المُستقر</p>
          </div>
        </div>
      </footer>

      {/* Property Details Dialog */}
      <PropertyDetails
        property={selectedProperty}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </div>
  );
}
