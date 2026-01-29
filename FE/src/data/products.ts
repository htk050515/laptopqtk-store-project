export interface Product {
  id: string;
  name: string;
  category: 'student-office' | 'gaming' | 'business' | 'design-engineering' | 'accessory';
  subcategory?: string;
  price: number;
  originalPrice?: number;
  brand: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  specs?: {
    processor?: string;
    ram?: string;
    storage?: string;
    display?: string;
    graphics?: string;
    battery?: string;
    weight?: string;
    os?: string;
  };
  description: string;
  features?: string[];
}

export const laptops: Product[] = [
  // Student & Office Laptops
  {
    id: 'laptop-1',
    name: 'Dell Inspiron 15 3000',
    category: 'student-office',
    price: 549.99,
    originalPrice: 649.99,
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop',
    rating: 4.3,
    reviewCount: 128,
    inStock: true,
    featured: true,
    specs: {
      processor: 'Intel Core i5-1135G7',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      display: '15.6" FHD',
      battery: 'Up to 7 hours',
      weight: '1.85 kg',
      os: 'Windows 11 Home'
    },
    description: 'Perfect for students and everyday tasks with reliable performance.',
    features: ['Anti-glare display', 'Numeric keypad', 'HD webcam', 'Fast charging']
  },
  {
    id: 'laptop-2',
    name: 'HP Pavilion 14',
    category: 'student-office',
    price: 629.99,
    brand: 'HP',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
    rating: 4.5,
    reviewCount: 256,
    inStock: true,
    featured: true,
    specs: {
      processor: 'AMD Ryzen 5 5500U',
      ram: '8GB DDR4',
      storage: '512GB SSD',
      display: '14" FHD IPS',
      battery: 'Up to 8 hours',
      weight: '1.41 kg',
      os: 'Windows 11 Home'
    },
    description: 'Compact and portable laptop ideal for students and professionals.',
    features: ['Backlit keyboard', 'Fast WiFi 6', 'Bang & Olufsen audio', 'Fingerprint reader']
  },
  {
    id: 'laptop-3',
    name: 'Lenovo IdeaPad 3',
    category: 'student-office',
    price: 479.99,
    brand: 'Lenovo',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop',
    rating: 4.1,
    reviewCount: 184,
    inStock: true,
    specs: {
      processor: 'Intel Core i3-1115G4',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      display: '15.6" HD',
      battery: 'Up to 6 hours',
      weight: '1.7 kg',
      os: 'Windows 11 Home'
    },
    description: 'Budget-friendly laptop for basic computing needs.',
    features: ['Privacy shutter', 'Dolby Audio', 'Rapid Charge']
  },
  
  // Gaming Laptops
  {
    id: 'laptop-4',
    name: 'ASUS ROG Strix G15',
    category: 'gaming',
    price: 1299.99,
    originalPrice: 1499.99,
    brand: 'ASUS',
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&h=500&fit=crop',
    rating: 4.8,
    reviewCount: 342,
    inStock: true,
    featured: true,
    specs: {
      processor: 'AMD Ryzen 7 5800H',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      display: '15.6" FHD 144Hz',
      graphics: 'NVIDIA RTX 3060 6GB',
      battery: 'Up to 5 hours',
      weight: '2.3 kg',
      os: 'Windows 11 Home'
    },
    description: 'High-performance gaming laptop with RGB lighting and advanced cooling.',
    features: ['RGB keyboard', 'Dolby Atmos', 'WiFi 6', 'Intelligent cooling']
  },
  {
    id: 'laptop-5',
    name: 'MSI Katana GF66',
    category: 'gaming',
    price: 1099.99,
    brand: 'MSI',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&h=500&fit=crop',
    rating: 4.6,
    reviewCount: 218,
    inStock: true,
    specs: {
      processor: 'Intel Core i7-11800H',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      display: '15.6" FHD 144Hz',
      graphics: 'NVIDIA RTX 3050 Ti 4GB',
      battery: 'Up to 4 hours',
      weight: '2.25 kg',
      os: 'Windows 11 Home'
    },
    description: 'Affordable gaming laptop with solid performance.',
    features: ['Cooler Boost 5', 'Nahimic 3 Audio', 'Red backlit keyboard']
  },
  {
    id: 'laptop-6',
    name: 'Acer Predator Helios 300',
    category: 'gaming',
    price: 1399.99,
    brand: 'Acer',
    image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=500&h=500&fit=crop',
    rating: 4.7,
    reviewCount: 289,
    inStock: true,
    featured: true,
    specs: {
      processor: 'Intel Core i7-11800H',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      display: '15.6" FHD 165Hz',
      graphics: 'NVIDIA RTX 3060 6GB',
      battery: 'Up to 6 hours',
      weight: '2.2 kg',
      os: 'Windows 11 Home'
    },
    description: 'Premium gaming laptop with excellent cooling and display.',
    features: ['4-zone RGB keyboard', 'DTS:X Ultra Audio', '5th Gen AeroBlade 3D Fan']
  },

  // Business Laptops
  {
    id: 'laptop-7',
    name: 'ThinkPad X1 Carbon Gen 9',
    category: 'business',
    price: 1599.99,
    brand: 'Lenovo',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=500&fit=crop',
    rating: 4.9,
    reviewCount: 412,
    inStock: true,
    featured: true,
    specs: {
      processor: 'Intel Core i7-1165G7',
      ram: '16GB LPDDR4x',
      storage: '512GB SSD',
      display: '14" FHD IPS',
      battery: 'Up to 16 hours',
      weight: '1.13 kg',
      os: 'Windows 11 Pro'
    },
    description: 'Ultra-light business laptop with military-grade durability.',
    features: ['Carbon fiber chassis', 'IR camera', 'Fingerprint reader', 'Thunderbolt 4']
  },
  {
    id: 'laptop-8',
    name: 'Dell Latitude 5420',
    category: 'business',
    price: 1199.99,
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    rating: 4.6,
    reviewCount: 187,
    inStock: true,
    specs: {
      processor: 'Intel Core i5-1145G7',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      display: '14" FHD',
      battery: 'Up to 12 hours',
      weight: '1.4 kg',
      os: 'Windows 11 Pro'
    },
    description: 'Reliable business laptop with enterprise-grade security.',
    features: ['TPM 2.0', 'Smart card reader', 'ExpressCharge', 'Dell Optimizer']
  },

  // Design & Engineering Laptops
  {
    id: 'laptop-9',
    name: 'MacBook Pro 16" M1 Pro',
    category: 'design-engineering',
    price: 2499.99,
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    rating: 5.0,
    reviewCount: 628,
    inStock: true,
    featured: true,
    specs: {
      processor: 'Apple M1 Pro 10-core',
      ram: '16GB Unified Memory',
      storage: '512GB SSD',
      display: '16.2" Liquid Retina XDR',
      graphics: '16-core GPU',
      battery: 'Up to 21 hours',
      weight: '2.1 kg',
      os: 'macOS'
    },
    description: 'Professional laptop for creative professionals and developers.',
    features: ['ProMotion 120Hz', 'Studio-quality mics', '1080p camera', 'MagSafe 3']
  },
  {
    id: 'laptop-10',
    name: 'HP ZBook Studio G8',
    category: 'design-engineering',
    price: 2299.99,
    brand: 'HP',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=500&fit=crop',
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    specs: {
      processor: 'Intel Core i7-11800H',
      ram: '32GB DDR4',
      storage: '1TB SSD',
      display: '15.6" 4K UHD DreamColor',
      graphics: 'NVIDIA RTX A3000 6GB',
      battery: 'Up to 10 hours',
      weight: '1.79 kg',
      os: 'Windows 11 Pro'
    },
    description: 'Powerful workstation for CAD, 3D rendering, and video editing.',
    features: ['ISV certified', 'Z Turbo Drive', 'DreamColor display', 'Bang & Olufsen']
  },
  {
    id: 'laptop-11',
    name: 'Dell XPS 15',
    category: 'design-engineering',
    price: 1899.99,
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
    rating: 4.8,
    reviewCount: 394,
    inStock: true,
    featured: true,
    specs: {
      processor: 'Intel Core i7-11800H',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      display: '15.6" FHD+ InfinityEdge',
      graphics: 'NVIDIA RTX 3050 Ti 4GB',
      battery: 'Up to 13 hours',
      weight: '1.83 kg',
      os: 'Windows 11 Home'
    },
    description: 'Premium laptop with stunning display for creators.',
    features: ['InfinityEdge display', 'Carbon fiber palm rest', 'Waves MaxxAudio Pro']
  }
];

export const accessories: Product[] = [
  // Mouse & Keyboard
  {
    id: 'acc-1',
    name: 'Logitech MX Master 3S',
    category: 'accessory',
    subcategory: 'Mouse & Keyboard',
    price: 99.99,
    brand: 'Logitech',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    rating: 4.8,
    reviewCount: 1245,
    inStock: true,
    featured: true,
    description: 'Advanced wireless mouse with quiet clicks and precise tracking.',
    features: ['8K DPI sensor', 'Quiet clicks', 'USB-C charging', 'Multi-device support']
  },
  {
    id: 'acc-2',
    name: 'Keychron K2 Mechanical Keyboard',
    category: 'accessory',
    subcategory: 'Mouse & Keyboard',
    price: 89.99,
    brand: 'Keychron',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    rating: 4.7,
    reviewCount: 892,
    inStock: true,
    description: 'Compact wireless mechanical keyboard with RGB backlight.',
    features: ['Gateron switches', 'Mac & Windows', 'Hot-swappable', 'RGB backlight']
  },
  {
    id: 'acc-3',
    name: 'Razer DeathAdder V3',
    category: 'accessory',
    subcategory: 'Mouse & Keyboard',
    price: 69.99,
    brand: 'Razer',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=500&fit=crop',
    rating: 4.6,
    reviewCount: 567,
    inStock: true,
    description: 'Ergonomic gaming mouse with Focus Pro 30K sensor.',
    features: ['30K DPI', 'Optical switches', 'Lightweight 59g', 'Chroma RGB']
  },

  // Headsets & Speakers
  {
    id: 'acc-4',
    name: 'Sony WH-1000XM5',
    category: 'accessory',
    subcategory: 'Headsets & Speakers',
    price: 399.99,
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
    rating: 4.9,
    reviewCount: 2134,
    inStock: true,
    featured: true,
    description: 'Premium noise-canceling wireless headphones.',
    features: ['Industry-leading ANC', '30-hour battery', 'LDAC support', 'Multipoint connection']
  },
  {
    id: 'acc-5',
    name: 'HyperX Cloud II',
    category: 'accessory',
    subcategory: 'Headsets & Speakers',
    price: 99.99,
    brand: 'HyperX',
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=500&fit=crop',
    rating: 4.7,
    reviewCount: 1456,
    inStock: true,
    description: 'Gaming headset with 7.1 surround sound.',
    features: ['7.1 virtual surround', 'Memory foam', 'Detachable mic', 'USB sound card']
  },
  {
    id: 'acc-6',
    name: 'Creative Pebble V3',
    category: 'accessory',
    subcategory: 'Headsets & Speakers',
    price: 34.99,
    brand: 'Creative',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop',
    rating: 4.4,
    reviewCount: 678,
    inStock: true,
    description: 'Compact USB-C powered desktop speakers.',
    features: ['USB-C powered', 'Bluetooth 5.0', 'RGB lighting', '8W RMS']
  },

  // Laptop Bags
  {
    id: 'acc-7',
    name: 'Targus CitySmart EVA Pro',
    category: 'accessory',
    subcategory: 'Laptop Bags & Backpacks',
    price: 59.99,
    brand: 'Targus',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    rating: 4.5,
    reviewCount: 423,
    inStock: true,
    description: 'Professional laptop backpack fits up to 15.6" laptops.',
    features: ['Water-resistant', 'Multiple compartments', 'Padded laptop section', 'RFID pocket']
  },
  {
    id: 'acc-8',
    name: 'Everki Atlas Checkpoint',
    category: 'accessory',
    subcategory: 'Laptop Bags & Backpacks',
    price: 129.99,
    brand: 'Everki',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&h=500&fit=crop',
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    description: 'Premium checkpoint-friendly laptop backpack up to 17.3".',
    features: ['Checkpoint friendly', 'Felt-lined pockets', 'Trolley handle pass-through', 'Lifetime warranty']
  },

  // Cooling & Stands
  {
    id: 'acc-9',
    name: 'Cooler Master NotePal X3',
    category: 'accessory',
    subcategory: 'Cooling Pads & Stands',
    price: 39.99,
    brand: 'Cooler Master',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    rating: 4.6,
    reviewCount: 834,
    inStock: true,
    description: 'Laptop cooling pad with 200mm fan for up to 17" laptops.',
    features: ['200mm fan', 'Adjustable speed', 'Ergonomic design', 'USB powered']
  },
  {
    id: 'acc-10',
    name: 'Rain Design mStand',
    category: 'accessory',
    subcategory: 'Cooling Pads & Stands',
    price: 54.99,
    brand: 'Rain Design',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    rating: 4.7,
    reviewCount: 567,
    inStock: true,
    description: 'Aluminum laptop stand for better ergonomics.',
    features: ['Aluminum construction', 'Cable management', 'Stable design', 'Matches MacBook']
  },

  // Chargers & Power
  {
    id: 'acc-11',
    name: 'Anker 747 GaNPrime 150W',
    category: 'accessory',
    subcategory: 'Chargers & Power Adapters',
    price: 109.99,
    brand: 'Anker',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop',
    rating: 4.8,
    reviewCount: 923,
    inStock: true,
    featured: true,
    description: '4-port GaN charger for laptops and devices.',
    features: ['150W total output', 'GaN technology', '4 ports', 'Compact design']
  },
  {
    id: 'acc-12',
    name: 'RAVPower 20000mAh Power Bank',
    category: 'accessory',
    subcategory: 'Chargers & Power Adapters',
    price: 49.99,
    brand: 'RAVPower',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    rating: 4.5,
    reviewCount: 1234,
    inStock: true,
    description: 'High-capacity USB-C power bank for laptops.',
    features: ['60W PD output', '20000mAh capacity', 'Fast charging', 'Multiple ports']
  },

  // Storage
  {
    id: 'acc-13',
    name: 'Samsung 980 PRO 1TB SSD',
    category: 'accessory',
    subcategory: 'Storage (SSD, HDD)',
    price: 129.99,
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    rating: 4.9,
    reviewCount: 1567,
    inStock: true,
    description: 'PCIe 4.0 NVMe M.2 SSD with blazing speeds.',
    features: ['7000 MB/s read', 'PCIe 4.0', 'Heat spreader', '5-year warranty']
  },
  {
    id: 'acc-14',
    name: 'WD Black 2TB HDD',
    category: 'accessory',
    subcategory: 'Storage (SSD, HDD)',
    price: 89.99,
    brand: 'Western Digital',
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&h=500&fit=crop',
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    description: 'High-performance 2.5" internal hard drive.',
    features: ['7200 RPM', '128MB cache', 'Shock resistant', '5-year warranty']
  },
  {
    id: 'acc-15',
    name: 'SanDisk Extreme Portable SSD 1TB',
    category: 'accessory',
    subcategory: 'Storage (SSD, HDD)',
    price: 149.99,
    brand: 'SanDisk',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop',
    rating: 4.7,
    reviewCount: 1123,
    inStock: true,
    featured: true,
    description: 'Rugged portable SSD with fast transfer speeds.',
    features: ['1050 MB/s', 'IP55 rated', 'USB-C', 'Compact & durable']
  },

  // Memory
  {
    id: 'acc-16',
    name: 'Corsair Vengeance 32GB (2x16GB) DDR4',
    category: 'accessory',
    subcategory: 'Memory (RAM)',
    price: 119.99,
    brand: 'Corsair',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&h=500&fit=crop',
    rating: 4.8,
    reviewCount: 678,
    inStock: true,
    description: 'High-performance laptop memory kit.',
    features: ['3200MHz', 'Low latency', 'Intel XMP 2.0', 'Lifetime warranty']
  },
  {
    id: 'acc-17',
    name: 'Crucial 16GB DDR4 Laptop RAM',
    category: 'accessory',
    subcategory: 'Memory (RAM)',
    price: 54.99,
    brand: 'Crucial',
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500&h=500&fit=crop',
    rating: 4.6,
    reviewCount: 945,
    inStock: true,
    description: 'Reliable laptop memory upgrade.',
    features: ['2666MHz', 'Plug and play', 'Low voltage', 'Limited lifetime warranty']
  }
];

export const allProducts = [...laptops, ...accessories];

export const categories = [
  { id: 'student-office', name: 'Student & Office Laptops', count: laptops.filter(p => p.category === 'student-office').length },
  { id: 'gaming', name: 'Gaming Laptops', count: laptops.filter(p => p.category === 'gaming').length },
  { id: 'business', name: 'Business Laptops', count: laptops.filter(p => p.category === 'business').length },
  { id: 'design-engineering', name: 'Design & Engineering', count: laptops.filter(p => p.category === 'design-engineering').length },
  { id: 'accessories', name: 'Accessories', count: accessories.length }
];

export const brands = ['Dell', 'HP', 'Lenovo', 'ASUS', 'MSI', 'Acer', 'Apple', 'Logitech', 'Razer', 'Sony', 'HyperX', 'Anker', 'Samsung', 'Corsair'];
