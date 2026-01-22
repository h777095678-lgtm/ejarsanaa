import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { 
  MapPin, Phone, User, Bed, Bath, Maximize, Droplet, Zap, 
  Sun, Building2, CheckCircle2, XCircle, DollarSign, Calendar,
  Home, Compass, TrendingUp, Users, Clock
} from 'lucide-react';
import type { Property, Apartment, Shop, WeddingHall, Building, Villa } from '@/data/properties';
import { propertyTypeLabels } from '@/data/properties';

interface PropertyDetailsProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}

export function PropertyDetails({ property, open, onClose }: PropertyDetailsProps) {
  if (!property) return null;

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'YER') {
      return `${price.toLocaleString()} ريال يمني`;
    } else if (currency === 'USD') {
      return `$${price.toLocaleString()} دولار`;
    } else {
      return `${price.toLocaleString()} ${currency}`;
    }
  };

  const renderApartmentDetails = (apt: Apartment) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <DetailItem icon={Building2} label="الدور" value={`الدور ${apt.floor} من ${apt.totalFloors}`} />
        <DetailItem icon={CheckCircle2} label="مصعد" value={apt.hasElevator ? 'يوجد' : 'لا يوجد'} />
        <DetailItem icon={Bed} label="عدد الغرف" value={`${apt.rooms.length} غرفة`} />
        <DetailItem icon={Bath} label="عدد الحمامات" value={`${apt.bathrooms}`} />
        <DetailItem icon={Home} label="مطبخ" value={apt.hasKitchen ? 'يوجد' : 'لا يوجد'} />
        <DetailItem icon={Users} label="مجلس خارجي" value={apt.hasMajlis ? 'يوجد' : 'لا يوجد'} />
      </div>

      {apt.hasMajlis && (
        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="font-semibold mb-2">تفاصيل المجلس:</h4>
          <div className="space-y-1 text-sm">
            <p>• مدخل مستقل: {apt.majlisHasPrivateEntrance ? 'نعم' : 'لا'}</p>
            <p>• حمام مستقل: {apt.majlisHasBathroom ? 'نعم' : 'لا'}</p>
          </div>
        </div>
      )}

      <Separator />

      <div>
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Maximize className="h-5 w-5 text-[#8F6E5E]" />
          مساحات الغرف
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {apt.rooms.map((room, index) => (
            <div key={index} className="bg-muted/50 p-2 rounded text-sm">
              غرفة {index + 1}: {room.length}م × {room.width}م
            </div>
          ))}
          {apt.hasKitchen && apt.kitchenSize && (
            <div className="bg-muted/50 p-2 rounded text-sm">
              المطبخ: {apt.kitchenSize.length}م × {apt.kitchenSize.width}م
            </div>
          )}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <DetailItem 
          icon={Droplet} 
          label="المياه" 
          value={getWaterSourceLabel(apt.waterSource)}
          badge={apt.waterShared ? 'مشترك' : 'مستقل'}
          badgeColor={apt.waterShared ? 'destructive' : 'default'}
        />
        <DetailItem 
          icon={Zap} 
          label="الكهرباء" 
          value={getElectricitySourceLabel(apt.electricitySource)}
          badge={apt.electricityShared ? 'مشترك' : 'مستقل'}
          badgeColor={apt.electricityShared ? 'destructive' : 'default'}
        />
        <DetailItem 
          icon={Compass} 
          label="اتجاه الواجهة" 
          value={getDirectionLabel(apt.direction)}
        />
        <DetailItem 
          icon={Sun} 
          label="دخول الشمس" 
          value={apt.isSunny ? 'مشمسة ☀️' : 'غير مشمسة'}
        />
      </div>

      {(apt.deposit || apt.insuranceAmount || apt.brokerage) && (
        <>
          <Separator />
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#8F6E5E]" />
              المتطلبات المالية
            </h4>
            <div className="space-y-2 text-sm">
              {apt.deposit && <p>• العربون: {apt.deposit.toLocaleString()} ريال</p>}
              {apt.insuranceAmount && <p>• التأمين: {apt.insuranceAmount.toLocaleString()} ريال</p>}
              {apt.brokerage && <p>• السعاية: {apt.brokerage.toLocaleString()} ريال</p>}
              <p>• ضامن: {apt.requiresGuarantor ? 'مطلوب' : 'غير مطلوب'}</p>
            </div>
          </div>
        </>
      )}
    </>
  );

  const renderShopDetails = (shop: Shop) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <DetailItem icon={Building2} label="نوع الشارع" value={shop.streetType === 'main' ? 'رئيسي' : 'فرعي'} />
        <DetailItem icon={Home} label="عدد الفتحات" value={`${shop.openings} فتحة`} />
        <DetailItem icon={CheckCircle2} label="حمام" value={shop.hasBathroom ? 'يوجد' : 'لا يوجد'} />
        <DetailItem icon={CheckCircle2} label="مخزن" value={shop.hasStorage ? `يوجد (${shop.storageType === 'internal' ? 'داخلي' : 'خارجي'})` : 'لا يوجد'} />
      </div>

      <Separator />

      <div>
        <h4 className="font-semibold mb-3">المساحات</h4>
        <div className="space-y-2 text-sm">
          <p>• مساحة المحل: {shop.area.length}م × {shop.area.width}م {shop.area.height && `× ${shop.area.height}م ارتفاع`}</p>
          {shop.hasStorage && shop.storageArea && (
            <p>• مساحة المخزن: {shop.storageArea.length}م × {shop.storageArea.width}م</p>
          )}
        </div>
      </div>

      {shop.condition === 'key-money' && shop.keyMoney && (
        <>
          <Separator />
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-yellow-900">نقل القدم (خلو الرجل)</h4>
            <div className="space-y-2 text-sm text-yellow-900">
              <p className="font-bold text-lg">المبلغ: {shop.keyMoney.amount.toLocaleString()} ريال</p>
              <p>يشمل:</p>
              <ul className="list-disc list-inside mr-4">
                {shop.keyMoney.includes.includes('location') && <li>الموقع</li>}
                {shop.keyMoney.includes.includes('decoration') && <li>الديكور والتجهيزات</li>}
                {shop.keyMoney.includes.includes('inventory') && <li>البضاعة</li>}
                {shop.keyMoney.includes.includes('goodwill') && <li>الاسم التجاري</li>}
              </ul>
              <p className="mt-2">
                موافقة المالك: {shop.keyMoney.ownerApproved ? '✅ موافق' : '❌ غير موافق'}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );

  const renderWeddingHallDetails = (hall: WeddingHall) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <DetailItem icon={Building2} label="اسم القاعة" value={hall.hallName} />
        <DetailItem icon={Clock} label="التوقيت" value={getTimingLabel(hall.timing)} />
        <DetailItem icon={Users} label="النوع" value={getGenderLabel(hall.gender)} />
        <DetailItem icon={Users} label="السعة" value={`${hall.capacity} شخص`} />
        <DetailItem icon={Home} label="النمط" value={getStyleLabel(hall.style)} />
        <DetailItem icon={Maximize} label="المساحة" value={`${hall.area} متر مربع`} />
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <DetailItem icon={CheckCircle2} label="كوشة" value={hall.hasStage ? 'يوجد' : 'لا يوجد'} />
        <DetailItem icon={CheckCircle2} label="صالة طعام" value={hall.hasDiningHall ? 'يوجد' : 'لا يوجد'} />
        <DetailItem icon={Bath} label="عدد الحمامات" value={`${hall.bathrooms}`} />
        <DetailItem icon={CheckCircle2} label="مصلى" value={hall.hasPrayerRoom ? 'يوجد' : 'لا يوجد'} />
      </div>

      {hall.hasStage && hall.stageImage && (
        <>
          <Separator />
          <div>
            <h4 className="font-semibold mb-3">صورة الكوشة</h4>
            <img src={hall.stageImage} alt="الكوشة" className="w-full h-48 object-cover rounded-lg" />
          </div>
        </>
      )}

      <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
        <p className="text-sm text-green-900">
          ✅ القاعة {hall.pestFree ? 'خالية من الحشرات' : 'قد تحتوي على حشرات'}
        </p>
      </div>
    </>
  );

  const renderBuildingDetails = (building: Building) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <DetailItem icon={Building2} label="الحالة" value={building.condition === 'finished' ? 'جاهزة' : 'عظم'} />
        <DetailItem icon={Calendar} label="العمر" value={building.age === 'new' ? 'جديدة' : 'قديمة'} />
        <DetailItem icon={Home} label="الغرض" value={getPurposeLabel(building.purpose)} />
        <DetailItem icon={Building2} label="عدد الأدوار" value={`${building.floors} طابق`} />
        <DetailItem icon={Home} label="عدد الشقق" value={`${building.apartments} شقة`} />
        <DetailItem icon={CheckCircle2} label="بئر ارتوازي" value={building.hasWell ? 'يوجد' : 'لا يوجد'} />
        <DetailItem icon={CheckCircle2} label="مولد كهرباء" value={building.hasGenerator ? 'يوجد' : 'لا يوجد'} />
        <DetailItem icon={CheckCircle2} label="مسجلة" value={building.registered ? 'نعم' : 'لا'} />
      </div>

      {building.monthlyIncome && (
        <>
          <Separator />
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-900">الدخل الشهري</h4>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {building.monthlyIncome.toLocaleString()} ريال
            </p>
          </div>
        </>
      )}

      {building.hasDisputes && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
          <p className="text-sm text-red-900">⚠️ يوجد نزاعات على العقار</p>
        </div>
      )}
    </>
  );

  const renderVillaDetails = (villa: Villa) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <DetailItem icon={Building2} label="الحالة" value={villa.condition === 'finished' ? 'مشطبة' : 'عظم'} />
        <DetailItem icon={Calendar} label="العمر" value={villa.age === 'new' ? 'جديدة' : 'قديمة'} />
        <DetailItem icon={CheckCircle2} label="مفروشة" value={villa.furnished ? 'نعم' : 'لا'} />
        <DetailItem icon={Building2} label="عدد الطوابق" value={`${villa.floors} طابق`} />
        <DetailItem icon={Bed} label="عدد الغرف" value={`${villa.rooms} غرفة`} />
        <DetailItem icon={Bath} label="عدد الحمامات" value={`${villa.bathrooms}`} />
      </div>

      {villa.hasYard && (
        <>
          <Separator />
          <div className="bg-muted/50 p-3 rounded-lg">
            <h4 className="font-semibold mb-2">الحوش (الساحة الخارجية):</h4>
            <p className="text-sm">المساحة: {villa.yardSize} متر مربع</p>
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <DetailItem icon={CheckCircle2} label="ملحق السطح" value={villa.hasRoofAnnex ? 'يوجد' : 'لا يوجد'} />
        <DetailItem icon={CheckCircle2} label="غرفة حراسة" value={villa.hasGuardRoom ? 'يوجد' : 'لا يوجد'} />
        <DetailItem icon={CheckCircle2} label="مسبح" value={villa.hasPool ? 'يوجد' : 'لا يوجد'} />
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="h-[90vh]">
          <div className="p-6">
            <DialogHeader className="mb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <DialogTitle className="text-2xl mb-2">{property.title}</DialogTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-[#8F6E5E]">
                      {propertyTypeLabels[property.type]}
                    </Badge>
                    {property.featured && (
                      <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                        ⭐ مميز
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{property.district} • {property.neighborhood}</span>
                    {property.street && <span>• {property.street}</span>}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-[#8F6E5E] mb-1">
                    {formatPrice(property.price, property.currency)}
                  </div>
                  {property.priceNegotiable && (
                    <Badge variant="secondary" className="text-xs">قابل للتفاوض</Badge>
                  )}
                </div>
              </div>
            </DialogHeader>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <img
                src={property.images[0]}
                alt="صورة رئيسية"
                className="col-span-2 w-full h-64 object-cover rounded-lg"
              />
              {property.images.slice(1, 3).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`صورة ${index + 2}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">الوصف</h3>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            <Separator className="my-6" />

            {/* Type-specific details */}
            <div className="space-y-6">
              {property.type === 'apartment' && renderApartmentDetails(property as Apartment)}
              {property.type === 'shop' && renderShopDetails(property as Shop)}
              {property.type === 'wedding-hall' && renderWeddingHallDetails(property as WeddingHall)}
              {property.type === 'building' && renderBuildingDetails(property as Building)}
              {property.type === 'villa' && renderVillaDetails(property as Villa)}
            </div>

            <Separator className="my-6" />

            {/* Contact Info */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">معلومات التواصل</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{property.contactName}</span>
                  <Badge variant="outline">
                    {property.contactType === 'owner' ? 'مالك' : property.contactType === 'agent' ? 'وكيل' : 'دلال'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span dir="ltr">{property.contactPhone}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button 
                  className="flex-1 bg-[#4A90A4] hover:bg-[#3A7A8A]"
                  onClick={() => window.open(`tel:${property.contactPhone}`)}
                >
                  <Phone className="ml-2 h-4 w-4" />
                  اتصال
                </Button>
                <Button 
                  className="flex-1 bg-[#25D366] hover:bg-[#20BA5A]"
                  onClick={() => window.open(`https://wa.me/967${property.contactPhone.replace(/^0/, '')}`)}
                >
                  واتساب
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// Helper components
function DetailItem({ 
  icon: Icon, 
  label, 
  value, 
  badge,
  badgeColor = 'default'
}: { 
  icon: any; 
  label: string; 
  value: string; 
  badge?: string;
  badgeColor?: 'default' | 'destructive';
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-5 w-5 text-[#8F6E5E] flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium flex items-center gap-2">
          {value}
          {badge && (
            <Badge variant={badgeColor === 'destructive' ? 'destructive' : 'secondary'} className="text-xs">
              {badge}
            </Badge>
          )}
        </p>
      </div>
    </div>
  );
}

// Helper functions
function getWaterSourceLabel(source: string): string {
  const labels: Record<string, string> = {
    'government': 'حكومي',
    'well': 'بئر',
    'tank': 'خزان',
    'water-truck': 'وايتات'
  };
  return labels[source] || source;
}

function getElectricitySourceLabel(source: string): string {
  const labels: Record<string, string> = {
    'government': 'حكومي',
    'private': 'أهلي',
    'solar': 'طاقة شمسية'
  };
  return labels[source] || source;
}

function getDirectionLabel(direction: string): string {
  const labels: Record<string, string> = {
    'south': 'عدني / جنوبي',
    'north': 'قبلي / شمالي',
    'east': 'شرقي',
    'west': 'غربي'
  };
  return labels[direction] || direction;
}

function getTimingLabel(timing: string): string {
  const labels: Record<string, string> = {
    'morning': 'صباحية',
    'evening': 'مسائية',
    'both': 'صباحية ومسائية'
  };
  return labels[timing] || timing;
}

function getGenderLabel(gender: string): string {
  const labels: Record<string, string> = {
    'men': 'رجال',
    'women': 'نساء',
    'both': 'مختلطة'
  };
  return labels[gender] || gender;
}

function getStyleLabel(style: string): string {
  const labels: Record<string, string> = {
    'arabic-majlis': 'مجلس عربي',
    'western-tables': 'طاولات غربية',
    'mixed': 'مختلط'
  };
  return labels[style] || style;
}

function getPurposeLabel(purpose: string): string {
  const labels: Record<string, string> = {
    'residential': 'سكني',
    'school': 'مدرسة',
    'office': 'مكاتب',
    'medical': 'مركز صحي',
    'mixed': 'مختلط',
    'other': 'أخرى'
  };
  return labels[purpose] || purpose;
}
