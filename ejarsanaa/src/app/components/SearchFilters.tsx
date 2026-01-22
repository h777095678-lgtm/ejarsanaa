import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { Search, SlidersHorizontal } from 'lucide-react';
import { districts, propertyTypeLabels, type PropertyType, type District } from '@/data/properties';

interface SearchFiltersProps {
  onSearch: (filters: {
    searchTerm?: string;
    type?: PropertyType;
    district?: District;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState<PropertyType | undefined>();
  const [district, setDistrict] = useState<District | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const handleSearch = () => {
    onSearch({
      searchTerm: searchTerm || undefined,
      type,
      district,
      minPrice,
      maxPrice
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setType(undefined);
    setDistrict(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    onSearch({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="ابحث عن عقار، حي، أو منطقة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pr-10"
          />
        </div>
        <Button 
          onClick={handleSearch}
          className="bg-[#4A90A4] hover:bg-[#3A7A8A]"
        >
          بحث
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Select value={type} onValueChange={(value) => setType(value as PropertyType)}>
          <SelectTrigger>
            <SelectValue placeholder="نوع العقار" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأنواع</SelectItem>
            {Object.entries(propertyTypeLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={district} onValueChange={(value) => setDistrict(value as District)}>
          <SelectTrigger>
            <SelectValue placeholder="المديرية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المديريات</SelectItem>
            {districts.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="السعر الأدنى"
          value={minPrice || ''}
          onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
        />

        <Input
          type="number"
          placeholder="السعر الأعلى"
          value={maxPrice || ''}
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>

      <div className="mt-3 flex gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              فلاتر متقدمة
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>فلاتر البحث المتقدمة</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm mb-2 block">مصدر المياه</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مصدر المياه" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="government">حكومي</SelectItem>
                    <SelectItem value="well">بئر</SelectItem>
                    <SelectItem value="tank">خزان</SelectItem>
                    <SelectItem value="water-truck">وايتات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm mb-2 block">مصدر الكهرباء</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مصدر الكهرباء" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="government">حكومي</SelectItem>
                    <SelectItem value="private">أهلي</SelectItem>
                    <SelectItem value="solar">طاقة شمسية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm mb-2 block">اتجاه الواجهة</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الاتجاه" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="south">عدني / جنوبي (مشمس)</SelectItem>
                    <SelectItem value="north">قبلي / شمالي</SelectItem>
                    <SelectItem value="east">شرقي</SelectItem>
                    <SelectItem value="west">غربي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full bg-[#4A90A4] hover:bg-[#3A7A8A]">
                  تطبيق الفلاتر
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleReset}
        >
          إعادة تعيين
        </Button>
      </div>
    </div>
  );
}
