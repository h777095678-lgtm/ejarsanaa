import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { MapPin, Phone, Bed, Bath, Maximize, TrendingUp, Eye } from 'lucide-react';
import type { Property } from '@/data/properties';
import { propertyTypeLabels } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'YER') {
      return `${(price / 1000).toFixed(0)} ألف ريال`;
    } else if (currency === 'USD') {
      return `$${price.toLocaleString()}`;
    } else {
      return `${price.toLocaleString()} ${currency}`;
    }
  };

  const getRoomCount = () => {
    if (property.type === 'apartment') {
      return property.rooms.length;
    } else if (property.type === 'villa' || property.type === 'office') {
      return property.rooms;
    }
    return null;
  };

  const getBathroomCount = () => {
    if (property.type === 'apartment' || property.type === 'villa' || property.type === 'office' || property.type === 'hotel') {
      return property.bathrooms;
    }
    return null;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {property.featured && (
          <Badge className="absolute top-3 right-3 bg-[#8F6E5E] text-white">
            مميز
          </Badge>
        )}
        <Badge className="absolute top-3 left-3 bg-white/90 text-[#8F6E5E]">
          {propertyTypeLabels[property.type]}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2 min-h-[3rem]">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{property.district} • {property.neighborhood}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {getRoomCount() && (
            <div className="flex items-center gap-1 text-sm bg-muted px-2 py-1 rounded-md">
              <Bed className="h-4 w-4" />
              <span>{getRoomCount()} غرف</span>
            </div>
          )}
          {getBathroomCount() && (
            <div className="flex items-center gap-1 text-sm bg-muted px-2 py-1 rounded-md">
              <Bath className="h-4 w-4" />
              <span>{getBathroomCount()} حمام</span>
            </div>
          )}
          {property.type === 'apartment' && property.isSunny && (
            <div className="flex items-center gap-1 text-sm bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md">
              <span>☀️ مشمسة</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-2xl font-bold text-[#8F6E5E]">
              {formatPrice(property.price, property.currency)}
            </div>
            {property.priceNegotiable && (
              <span className="text-xs text-muted-foreground">قابل للتفاوض</span>
            )}
          </div>
          {property.type === 'building' && property.monthlyIncome && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">دخل شهري</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => onViewDetails(property)}
            className="flex-1 bg-[#4A90A4] hover:bg-[#3A7A8A]"
          >
            <Eye className="ml-2 h-4 w-4" />
            التفاصيل
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="border-[#4A90A4] text-[#4A90A4] hover:bg-[#4A90A4] hover:text-white"
            onClick={() => window.open(`tel:${property.contactPhone}`)}
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
