// أنواع العقارات
export type PropertyType = 
  | 'apartment' 
  | 'building' 
  | 'villa' 
  | 'shop' 
  | 'office' 
  | 'hotel' 
  | 'wedding-hall' 
  | 'basement' 
  | 'land' 
  | 'vehicle';

// المديريات العشر في أمانة العاصمة
export const districts = [
  'آزال',
  'التحرير',
  'الثورة',
  'السبعين',
  'الصافية',
  'الوحدة',
  'بني الحارث',
  ' попу',
  'صنعاء القديمة',
  'معين',
  'أخرى'
] as const;

export type District = typeof districts[number];

// واجهة البيانات الأساسية للعقار
export interface BaseProperty {
  id: string;
  type: PropertyType;
  title: string;
  price: number;
  currency: 'YER' | 'USD' | 'SAR';
  priceNegotiable: boolean;
  district: District;
  neighborhood: string;
  street?: string;
  description: string;
  images: string[];
  contactName: string;
  contactPhone: string;
  contactType: 'owner' | 'agent' | 'broker';
  featured: boolean;
  createdAt: Date;
}

// الشقة السكنية
export interface Apartment extends BaseProperty {
  type: 'apartment';
  floor: number;
  totalFloors: number;
  hasElevator: boolean;
  rooms: { length: number; width: number }[];
  bathrooms: number;
  hasKitchen: boolean;
  kitchenSize?: { length: number; width: number };
  hasMajlis: boolean;
  majlisHasBathroom?: boolean;
  majlisHasPrivateEntrance?: boolean;
  waterSource: 'government' | 'well' | 'tank' | 'water-truck';
  waterShared: boolean;
  electricitySource: 'government' | 'private' | 'solar';
  electricityShared: boolean;
  direction: 'south' | 'north' | 'east' | 'west';
  isSunny: boolean;
  deposit?: number;
  insuranceAmount?: number;
  brokerage?: number;
  requiresGuarantor: boolean;
  commercialUse: boolean;
  furnished: boolean;
}

// العمارة
export interface Building extends BaseProperty {
  type: 'building';
  condition: 'finished' | 'shell';
  age: 'new' | 'old';
  purpose: 'residential' | 'school' | 'office' | 'medical' | 'mixed' | 'other';
  floors: number;
  apartments: number;
  hasWell: boolean;
  hasGenerator: boolean;
  monthlyIncome?: number;
  registered: boolean;
  hasDisputes: boolean;
}

// الفيلا
export interface Villa extends BaseProperty {
  type: 'villa';
  condition: 'finished' | 'shell';
  age: 'new' | 'old';
  furnished: boolean;
  floors: number;
  rooms: number;
  bathrooms: number;
  hasYard: boolean;
  yardSize?: number;
  hasRoofAnnex: boolean;
  hasGuardRoom: boolean;
  hasPool: boolean;
}

// المحل التجاري
export interface Shop extends BaseProperty {
  type: 'shop';
  streetType: 'main' | 'side';
  openings: number;
  hasBathroom: boolean;
  hasStorage: boolean;
  storageType?: 'internal' | 'external';
  area: { length: number; width: number; height?: number };
  storageArea?: { length: number; width: number };
  condition: 'new' | 'previously-rented' | 'key-money';
  keyMoney?: {
    amount: number;
    includes: ('location' | 'decoration' | 'inventory' | 'goodwill')[];
    ownerApproved: boolean;
  };
  electricityMeterType: 'separate' | 'shared';
}

// المكتب
export interface Office extends BaseProperty {
  type: 'office';
  rooms: number;
  bathrooms: number;
  condition: 'new' | 'used';
  hasFurniture: boolean;
  furnitureDescription?: string;
  electricitySource: 'government' | 'private' | 'solar';
  waterSource: 'government' | 'well' | 'tank';
}

// الفندق
export interface Hotel extends BaseProperty {
  type: 'hotel';
  unitType: 'room' | 'apartment';
  category: 'couples' | 'singles' | 'families';
  beds: number;
  hasArabicMajlis: boolean;
  rooms?: number;
  bathrooms: number;
  bathroomType: 'private' | 'shared';
  furnished: boolean;
  hasInternet: boolean;
  internetIncluded?: boolean;
  hasHotWater: boolean;
}

// صالة الأعراس
export interface WeddingHall extends BaseProperty {
  type: 'wedding-hall';
  hallName: string;
  timing: 'morning' | 'evening' | 'both';
  gender: 'men' | 'women' | 'both';
  capacity: number;
  style: 'arabic-majlis' | 'western-tables' | 'mixed';
  hasDiningHall: boolean;
  area: number;
  hasStage: boolean;
  stageImage?: string;
  bathrooms: number;
  hasPrayerRoom: boolean;
  pestFree: boolean;
  availableSlots: { date: string; from: string; to: string }[];
}

// البدروم
export interface Basement extends BaseProperty {
  type: 'basement';
  area: { length: number; width: number; height: number };
  hasBathroom: boolean;
  hasVentilation: boolean;
  floodProtection: 'none' | 'moderate' | 'high';
}

// قطعة الأرض
export interface Land extends BaseProperty {
  type: 'land';
  area: number;
  hasWall: boolean;
  hasWater: boolean;
  hasElectricity: boolean;
  residential: boolean;
  commercial: boolean;
}

export type Property = 
  | Apartment 
  | Building 
  | Villa 
  | Shop 
  | Office 
  | Hotel 
  | WeddingHall 
  | Basement 
  | Land;

// بيانات وهمية للعقارات
export const mockProperties: Property[] = [
  // شقق سكنية
  {
    id: '1',
    type: 'apartment',
    title: 'شقة فاخرة في حدة - 4 غرف مع إطلالة مميزة',
    price: 400000,
    currency: 'YER',
    priceNegotiable: true,
    district: 'السبعين',
    neighborhood: 'حدة',
    street: 'شارع حدة الرئيسي',
    description: 'شقة واسعة ومشمسة في أرقى أحياء صنعاء، تتميز بالإطلالة الجنوبية المشمسة والتشطيبات الفاخرة. قريبة من جميع الخدمات والأسواق.',
    images: ['https://images.unsplash.com/photo-1515263487990-61b07816b324', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'],
    contactName: 'أحمد محمد',
    contactPhone: '777123456',
    contactType: 'owner',
    featured: true,
    createdAt: new Date('2024-01-15'),
    floor: 3,
    totalFloors: 5,
    hasElevator: true,
    rooms: [
      { length: 4, width: 3.5 },
      { length: 4, width: 3.5 },
      { length: 3.5, width: 3 },
      { length: 3, width: 3 }
    ],
    bathrooms: 2,
    hasKitchen: true,
    kitchenSize: { length: 4, width: 2.5 },
    hasMajlis: true,
    majlisHasBathroom: true,
    majlisHasPrivateEntrance: true,
    waterSource: 'tank',
    waterShared: false,
    electricitySource: 'solar',
    electricityShared: false,
    direction: 'south',
    isSunny: true,
    deposit: 50000,
    insuranceAmount: 100000,
    requiresGuarantor: false,
    commercialUse: false,
    furnished: false
  },
  {
    id: '2',
    type: 'apartment',
    title: 'شقة اقتصادية في شعوب - 3 غرف',
    price: 150000,
    currency: 'YER',
    priceNegotiable: true,
    district: ' попу',
    neighborhood: ' попу',
    description: 'شقة مناسبة للعائلات الصغيرة، في منطقة حيوية قريبة من المدارس والأسواق. ماء وكهرباء مستقلة.',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', 'https://images.unsplash.com/photo-1484154218962-a197022b5858'],
    contactName: 'خالد علي',
    contactPhone: '773456789',
    contactType: 'broker',
    featured: false,
    createdAt: new Date('2024-01-20'),
    floor: 2,
    totalFloors: 4,
    hasElevator: false,
    rooms: [
      { length: 3.5, width: 3 },
      { length: 3.5, width: 3 },
      { length: 3, width: 2.5 }
    ],
    bathrooms: 1,
    hasKitchen: true,
    kitchenSize: { length: 3, width: 2 },
    hasMajlis: false,
    waterSource: 'government',
    waterShared: true,
    electricitySource: 'government',
    electricityShared: true,
    direction: 'east',
    isSunny: false,
    requiresGuarantor: true,
    commercialUse: false,
    furnished: false
  },
  
  // فيلا
  {
    id: '3',
    type: 'villa',
    title: 'فيلا راقية في الحي السياسي - مفروشة بالكامل',
    price: 5000,
    currency: 'USD',
    priceNegotiable: false,
    district: 'السبعين',
    neighborhood: 'الحي السياسي',
    description: 'فيلا فاخرة جديدة مفروشة بأحدث الأثاث، مناسبة للدبلوماسيين والمغتربين. تحتوي على 6 غرف نوم رئيسية وحوش واسع.',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'],
    contactName: 'محمد عبدالله',
    contactPhone: '777999888',
    contactType: 'agent',
    featured: true,
    createdAt: new Date('2024-01-10'),
    condition: 'finished',
    age: 'new',
    furnished: true,
    floors: 3,
    rooms: 6,
    bathrooms: 4,
    hasYard: true,
    yardSize: 200,
    hasRoofAnnex: true,
    hasGuardRoom: true,
    hasPool: false
  },

  // محل تجاري
  {
    id: '4',
    type: 'shop',
    title: 'محل تجاري في شارع الستين - موقع استراتيجي',
    price: 800000,
    currency: 'YER',
    priceNegotiable: true,
    district: 'معين',
    neighborhood: 'شارع الستين',
    street: 'شارع الستين',
    description: 'محل بفتحتين على الشارع الرئيسي، مناسب لجميع الأنشطة التجارية. يوجد مخزن داخلي وحمام.',
    images: ['https://images.unsplash.com/photo-1441984904996-e0b6ba687e04', 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d'],
    contactName: 'ياسر حسن',
    contactPhone: '771234567',
    contactType: 'owner',
    featured: true,
    createdAt: new Date('2024-01-18'),
    streetType: 'main',
    openings: 2,
    hasBathroom: true,
    hasStorage: true,
    storageType: 'internal',
    area: { length: 6, width: 4, height: 3.5 },
    storageArea: { length: 3, width: 2 },
    condition: 'new',
    electricityMeterType: 'separate'
  },

  // محل بنظام نقل القدم
  {
    id: '5',
    type: 'shop',
    title: 'بقالة للإيجار - نقل قدم 5 مليون',
    price: 300000,
    currency: 'YER',
    priceNegotiable: true,
    district: 'الوحدة',
    neighborhood: 'مذبح',
    description: 'بقالة مجهزة بالكامل في موقع ممتاز، زبائن ثابتين، جاهزة للعمل مباشرة.',
    images: ['https://images.unsplash.com/photo-1604719312566-8912e9227c6a', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d'],
    contactName: 'علي سعيد',
    contactPhone: '774567890',
    contactType: 'owner',
    featured: false,
    createdAt: new Date('2024-01-22'),
    streetType: 'side',
    openings: 1,
    hasBathroom: false,
    hasStorage: true,
    storageType: 'internal',
    area: { length: 5, width: 3.5 },
    storageArea: { length: 2, width: 2 },
    condition: 'key-money',
    keyMoney: {
      amount: 5000000,
      includes: ['location', 'decoration', 'inventory'],
      ownerApproved: true
    },
    electricityMeterType: 'separate'
  },

  // صالة أعراس
  {
    id: '6',
    type: 'wedding-hall',
    title: 'قاعة الياسمين للمناسبات - للنساء',
    price: 500000,
    currency: 'YER',
    priceNegotiable: false,
    district: 'السبعين',
    neighborhood: 'حدة',
    description: 'قاعة فخمة مجهزة بأحدث التقنيات، سعة 400 شخص، كوشة مميزة، مواقف واسعة.',
    images: ['https://images.unsplash.com/photo-1519167758481-83f29da8c2b6', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3'],
    contactName: 'فاطمة أحمد',
    contactPhone: '777888999',
    contactType: 'owner',
    featured: true,
    createdAt: new Date('2024-01-12'),
    hallName: 'قاعة الياسمين',
    timing: 'evening',
    gender: 'women',
    capacity: 400,
    style: 'western-tables',
    hasDiningHall: true,
    area: 500,
    hasStage: true,
    stageImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
    bathrooms: 6,
    hasPrayerRoom: true,
    pestFree: true,
    availableSlots: [
      { date: '2024-02-15', from: '16:00', to: '23:00' },
      { date: '2024-02-20', from: '16:00', to: '23:00' }
    ]
  },

  // عمارة استثمارية
  {
    id: '7',
    type: 'building',
    title: 'عمارة استثمارية في الأصبحي - 8 شقق',
    price: 15000,
    currency: 'USD',
    priceNegotiable: true,
    district: 'السبعين',
    neighborhood: 'الأصبحي',
    description: 'عمارة حديثة مؤجرة بالكامل، دخل شهري ثابت، موقع ممتاز في منطقة راقية.',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
    contactName: 'عبدالرحمن ناصر',
    contactPhone: '773123456',
    contactType: 'owner',
    featured: true,
    createdAt: new Date('2024-01-08'),
    condition: 'finished',
    age: 'new',
    purpose: 'residential',
    floors: 4,
    apartments: 8,
    hasWell: true,
    hasGenerator: true,
    monthlyIncome: 2400000,
    registered: true,
    hasDisputes: false
  },

  // مكتب
  {
    id: '8',
    type: 'office',
    title: 'مكتب إداري في شارع الزبيري - مفروش',
    price: 350000,
    currency: 'YER',
    priceNegotiable: true,
    district: 'الوحدة',
    neighborhood: 'شارع الزبيري',
    description: 'مكتب راقي مفروش بالكامل، 4 غرف واسعة، مناسب للشركات والمؤسسات.',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2'],
    contactName: 'سامي عبده',
    contactPhone: '775234567',
    contactType: 'agent',
    featured: false,
    createdAt: new Date('2024-01-25'),
    rooms: 4,
    bathrooms: 2,
    condition: 'used',
    hasFurniture: true,
    furnitureDescription: 'مكاتب خشبية فاخرة، كراسي جلد، أجهزة تكييف في كل غرفة',
    electricitySource: 'solar',
    waterSource: 'tank'
  },

  // شقة أخرى
  {
    id: '9',
    type: 'apartment',
    title: 'شقة مطلة في صنعاء القديمة - طابع تراثي',
    price: 200000,
    currency: 'YER',
    priceNegotiable: true,
    district: 'صنعاء القديمة',
    neighborhood: 'باب اليمن',
    description: 'شقة فريدة في منزل برجي تقليدي، قمريات ملونة، إطلالة رائعة على المدينة القديمة.',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb'],
    contactName: 'محمد الحداد',
    contactPhone: '772345678',
    contactType: 'owner',
    featured: false,
    createdAt: new Date('2024-01-28'),
    floor: 3,
    totalFloors: 5,
    hasElevator: false,
    rooms: [
      { length: 5, width: 4 },
      { length: 4, width: 3 },
      { length: 3, width: 3 }
    ],
    bathrooms: 1,
    hasKitchen: true,
    hasMajlis: true,
    majlisHasBathroom: false,
    waterSource: 'water-truck',
    waterShared: true,
    electricitySource: 'government',
    electricityShared: true,
    direction: 'south',
    isSunny: true,
    requiresGuarantor: false,
    commercialUse: false,
    furnished: false
  },

  // فيلا أخرى
  {
    id: '10',
    type: 'villa',
    title: 'فيلا عظم في بني الحارث',
    price: 8000000,
    currency: 'YER',
    priceNegotiable: true,
    district: 'بني الحارث',
    neighborhood: 'بني الحارث',
    description: 'فيلا قيد الإنشاء، عظم جاهز للتشطيب، أرض واسعة 400 متر.',
    images: ['https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6', 'https://images.unsplash.com/photo-1613977257363-707ba9348227'],
    contactName: 'أحمد القاسم',
    contactPhone: '776543210',
    contactType: 'owner',
    featured: false,
    createdAt: new Date('2024-01-30'),
    condition: 'shell',
    age: 'new',
    furnished: false,
    floors: 2,
    rooms: 5,
    bathrooms: 3,
    hasYard: true,
    yardSize: 400,
    hasRoofAnnex: false,
    hasGuardRoom: false,
    hasPool: false
  }
];

// دالة للبحث والفلترة
export function filterProperties(
  properties: Property[],
  filters: {
    type?: PropertyType;
    district?: District;
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
  }
): Property[] {
  return properties.filter(property => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.district && property.district !== filters.district) return false;
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      return (
        property.title.toLowerCase().includes(term) ||
        property.description.toLowerCase().includes(term) ||
        property.neighborhood.toLowerCase().includes(term)
      );
    }
    return true;
  });
}

// تسميات أنواع العقارات بالعربية
export const propertyTypeLabels: Record<PropertyType, string> = {
  'apartment': 'شقة سكنية',
  'building': 'عمارة',
  'villa': 'فيلا',
  'shop': 'محل تجاري',
  'office': 'مكتب',
  'hotel': 'فندق',
  'wedding-hall': 'صالة أعراس',
  'basement': 'بدروم',
  'land': 'أرض',
  'vehicle': 'مركبة'
};