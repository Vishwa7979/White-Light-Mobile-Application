import { Product } from '../App';

export const MOCK_PRODUCTS: Product[] = [
  // ELECTRONICS
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
    price: 134999,
    originalPrice: 159999,
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.8,
    reviews: 2453,
    deliveryTime: '10 min',
    mood: 'Energetic',
    occasion: 'Birthday',
    dealType: 'Flash Sale',
    forWho: 'For Me',
    trending: 'Viral on Social Media',
    color: 'Black',
    creator: {
      name: 'Tech Unboxed',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      followers: '245K'
    },
    sellers: [
      {
        id: 's1',
        name: 'QuickTech Store',
        price: 134999,
        rating: 4.9,
        deliveryTime: '10 min',
        badges: ['Fast Delivery', 'Verified']
      },
      {
        id: 's2',
        name: 'Mega Electronics',
        price: 136999,
        rating: 4.7,
        deliveryTime: '30 min',
        badges: ['Best Price', 'Trusted']
      },
      {
        id: 's3',
        name: 'Apple Premium Store',
        price: 139999,
        rating: 5.0,
        deliveryTime: 'Same day',
        badges: ['Official', 'Warranty']
      }
    ],
    variants: [
      { type: 'Color', options: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'] },
      { type: 'Storage', options: ['256GB', '512GB', '1TB'] }
    ]
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800',
    price: 26990,
    originalPrice: 29990,
    category: 'Electronics',
    brand: 'Sony',
    rating: 4.9,
    reviews: 3241,
    deliveryTime: '3 hrs',
    creator: {
      name: 'Audio Geeks',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      followers: '312K'
    },
    sellers: [
      {
        id: 's6',
        name: 'Sony Store',
        price: 26990,
        rating: 5.0,
        deliveryTime: 'Same day',
        badges: ['Official', 'Warranty']
      },
      {
        id: 's7',
        name: 'Audio World',
        price: 25990,
        rating: 4.8,
        deliveryTime: '3 hrs',
        badges: ['Best Price', 'Fast Delivery']
      }
    ],
    variants: [
      { type: 'Color', options: ['Black', 'Silver', 'Midnight Blue'] }
    ]
  },
  {
    id: '3',
    name: 'Gaming Mouse RGB',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
    price: 2499,
    originalPrice: 3499,
    category: 'Electronics',
    brand: 'Logitech',
    rating: 4.6,
    reviews: 1234,
    deliveryTime: '3 hrs',
    creator: {
      name: 'GamerZone',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      followers: '178K'
    },
    sellers: [
      {
        id: 's12',
        name: 'Gaming Central',
        price: 2499,
        rating: 4.7,
        deliveryTime: '3 hrs',
        badges: ['Fast Delivery']
      },
      {
        id: 's13',
        name: 'Tech Store',
        price: 2299,
        rating: 4.5,
        deliveryTime: 'Same day',
        badges: ['Best Price']
      }
    ],
    variants: [
      { type: 'Color', options: ['Black', 'White'] }
    ]
  },
  {
    id: '4',
    name: 'Samsung 65" 4K Smart TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
    price: 64999,
    originalPrice: 79999,
    category: 'Electronics',
    brand: 'Samsung',
    rating: 4.7,
    reviews: 1856,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's14',
        name: 'Samsung Official',
        price: 64999,
        rating: 4.9,
        deliveryTime: 'Same day',
        badges: ['Official', 'Free Installation']
      },
      {
        id: 's15',
        name: 'Electronics Mega Store',
        price: 62999,
        rating: 4.6,
        deliveryTime: '3 days',
        badges: ['Best Price']
      }
    ]
  },
  {
    id: '5',
    name: 'MacBook Air M2',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    price: 99900,
    originalPrice: 114900,
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.9,
    reviews: 3421,
    deliveryTime: '3 hrs',
    creator: {
      name: 'Tech Reviews',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      followers: '521K'
    },
    sellers: [
      {
        id: 's16',
        name: 'Apple Authorized',
        price: 99900,
        rating: 5.0,
        deliveryTime: 'Same day',
        badges: ['Official', 'AppleCare']
      }
    ],
    variants: [
      { type: 'RAM', options: ['8GB', '16GB', '24GB'] },
      { type: 'Storage', options: ['256GB', '512GB', '1TB'] }
    ]
  },
  {
    id: '6',
    name: 'iPad Pro 12.9"',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
    price: 89900,
    originalPrice: 109900,
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.8,
    reviews: 2134,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's17',
        name: 'Apple Store',
        price: 89900,
        rating: 5.0,
        deliveryTime: '3 hrs',
        badges: ['Official']
      }
    ]
  },
  {
    id: '7',
    name: 'PlayStation 5 Console',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800',
    price: 49990,
    originalPrice: 54990,
    category: 'Electronics',
    brand: 'Sony',
    rating: 4.9,
    reviews: 5621,
    deliveryTime: 'Same day',
    creator: {
      name: 'Gaming World',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100',
      followers: '892K'
    },
    sellers: [
      {
        id: 's18',
        name: 'Sony Gaming',
        price: 49990,
        rating: 4.9,
        deliveryTime: 'Same day',
        badges: ['Official', 'Warranty']
      }
    ]
  },

  // FASHION
  {
    id: '8',
    name: 'Nike Air Max 270',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    price: 12995,
    originalPrice: 15995,
    category: 'Fashion',
    brand: 'Nike',
    rating: 4.6,
    reviews: 1823,
    deliveryTime: '30 min',
    creator: {
      name: 'Sneaker Culture',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      followers: '189K'
    },
    sellers: [
      {
        id: 's4',
        name: 'Nike Official',
        price: 12995,
        rating: 4.9,
        deliveryTime: '3 hrs',
        badges: ['Official', 'Free Returns']
      },
      {
        id: 's5',
        name: 'Sports Hub',
        price: 12495,
        rating: 4.5,
        deliveryTime: '30 min',
        badges: ['Fast Delivery', 'Best Price']
      }
    ],
    variants: [
      { type: 'Size', options: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'] },
      { type: 'Color', options: ['White/Black', 'Triple Black', 'Red/White'] }
    ]
  },
  {
    id: '9',
    name: 'Levi\'s 501 Original Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    price: 3999,
    originalPrice: 5499,
    category: 'Fashion',
    brand: 'Levi\'s',
    rating: 4.5,
    reviews: 2341,
    deliveryTime: '3 hrs',
    sellers: [
      {
        id: 's19',
        name: 'Levi\'s Store',
        price: 3999,
        rating: 4.8,
        deliveryTime: 'Same day',
        badges: ['Official']
      },
      {
        id: 's20',
        name: 'Fashion Hub',
        price: 3799,
        rating: 4.4,
        deliveryTime: '3 hrs',
        badges: ['Best Price']
      }
    ],
    variants: [
      { type: 'Size', options: ['28', '30', '32', '34', '36'] },
      { type: 'Fit', options: ['Slim', 'Regular', 'Relaxed'] }
    ]
  },
  {
    id: '10',
    name: 'Cotton T-Shirt Pack of 3',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    price: 899,
    originalPrice: 1499,
    category: 'Fashion',
    brand: 'Basics',
    rating: 4.3,
    reviews: 4521,
    deliveryTime: '10 min',
    sellers: [
      {
        id: 's21',
        name: 'QuickFashion',
        price: 899,
        rating: 4.5,
        deliveryTime: '10 min',
        badges: ['Fast Delivery']
      }
    ],
    variants: [
      { type: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] },
      { type: 'Color', options: ['White', 'Black', 'Navy', 'Grey'] }
    ]
  },
  {
    id: '11',
    name: 'Formal Shirt White',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
    price: 1299,
    originalPrice: 1999,
    category: 'Fashion',
    brand: 'Van Heusen',
    rating: 4.4,
    reviews: 1234,
    deliveryTime: '3 hrs',
    sellers: [
      {
        id: 's22',
        name: 'Van Heusen Store',
        price: 1299,
        rating: 4.6,
        deliveryTime: 'Same day',
        badges: ['Official']
      }
    ]
  },
  {
    id: '12',
    name: 'Leather Jacket Brown',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    price: 8999,
    originalPrice: 12999,
    category: 'Fashion',
    brand: 'Zara',
    rating: 4.7,
    reviews: 892,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's23',
        name: 'Zara Official',
        price: 8999,
        rating: 4.8,
        deliveryTime: 'Same day',
        badges: ['Official']
      }
    ]
  },
  {
    id: '13',
    name: 'Summer Dress Floral',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
    price: 2499,
    originalPrice: 3999,
    category: 'Fashion',
    brand: 'H&M',
    rating: 4.5,
    reviews: 1523,
    deliveryTime: '30 min',
    mood: 'Romantic',
    occasion: 'Anniversary',
    dealType: 'Bundle Deals',
    forWho: 'For Her',
    trending: 'Celebrity Favorites',
    color: 'Pink',
    creator: {
      name: 'Fashion Finds',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      followers: '234K'
    },
    sellers: [
      {
        id: 's24',
        name: 'H&M Store',
        price: 2499,
        rating: 4.6,
        deliveryTime: '3 hrs',
        badges: ['Official']
      }
    ]
  },
  {
    id: '14',
    name: 'Sports Shoes Running',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
    price: 4999,
    originalPrice: 6999,
    category: 'Fashion',
    brand: 'Adidas',
    rating: 4.6,
    reviews: 2134,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's25',
        name: 'Adidas Official',
        price: 4999,
        rating: 4.7,
        deliveryTime: 'Same day',
        badges: ['Official']
      }
    ]
  },

  // GROCERIES
  {
    id: '15',
    name: 'Organic Mixed Nuts 500g',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=800',
    price: 599,
    category: 'Groceries',
    brand: 'NutriLife',
    rating: 4.5,
    reviews: 892,
    deliveryTime: '10 min',
    sellers: [
      {
        id: 's8',
        name: 'FreshMart Express',
        price: 599,
        rating: 4.7,
        deliveryTime: '10 min',
        badges: ['Fast Delivery', 'Fresh']
      },
      {
        id: 's9',
        name: 'Organic Bazaar',
        price: 549,
        rating: 4.6,
        deliveryTime: '30 min',
        badges: ['Best Price', 'Organic']
      }
    ]
  },
  {
    id: '16',
    name: 'Fresh Milk 1L',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800',
    price: 65,
    category: 'Groceries',
    brand: 'Amul',
    rating: 4.7,
    reviews: 5621,
    deliveryTime: '10 min',
    sellers: [
      {
        id: 's26',
        name: 'Daily Fresh',
        price: 65,
        rating: 4.8,
        deliveryTime: '10 min',
        badges: ['Fast Delivery', 'Fresh']
      }
    ]
  },
  {
    id: '17',
    name: 'Brown Bread Whole Wheat',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    price: 45,
    category: 'Groceries',
    brand: 'Harvest Gold',
    rating: 4.4,
    reviews: 3214,
    deliveryTime: '10 min',
    sellers: [
      {
        id: 's27',
        name: 'Bakery Fresh',
        price: 45,
        rating: 4.5,
        deliveryTime: '10 min',
        badges: ['Fast Delivery']
      }
    ]
  },
  {
    id: '18',
    name: 'Organic Eggs 12 Pack',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800',
    price: 120,
    category: 'Groceries',
    brand: 'Farm Fresh',
    rating: 4.6,
    reviews: 2341,
    deliveryTime: '10 min',
    sellers: [
      {
        id: 's28',
        name: 'Fresh Basket',
        price: 120,
        rating: 4.7,
        deliveryTime: '10 min',
        badges: ['Organic', 'Fresh']
      }
    ]
  },
  {
    id: '19',
    name: 'Basmati Rice 5kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
    price: 450,
    category: 'Groceries',
    brand: 'India Gate',
    rating: 4.5,
    reviews: 1823,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's29',
        name: 'Grocery World',
        price: 450,
        rating: 4.6,
        deliveryTime: '30 min',
        badges: ['Best Price']
      }
    ]
  },
  {
    id: '20',
    name: 'Fresh Vegetables Pack',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=800',
    price: 299,
    category: 'Groceries',
    brand: 'Farm Direct',
    rating: 4.7,
    reviews: 4521,
    deliveryTime: '10 min',
    sellers: [
      {
        id: 's30',
        name: 'Veggie Express',
        price: 299,
        rating: 4.8,
        deliveryTime: '10 min',
        badges: ['Fresh', 'Organic']
      }
    ]
  },
  {
    id: '21',
    name: 'Premium Coffee Beans 250g',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
    price: 599,
    originalPrice: 799,
    category: 'Groceries',
    brand: 'Blue Tokai',
    rating: 4.8,
    reviews: 1234,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's31',
        name: 'Coffee House',
        price: 599,
        rating: 4.9,
        deliveryTime: '30 min',
        badges: ['Premium']
      }
    ]
  },

  // BEAUTY
  {
    id: '22',
    name: 'Minimalist Serum Set',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800',
    price: 1099,
    originalPrice: 1499,
    category: 'Beauty',
    brand: 'Minimalist',
    rating: 4.7,
    reviews: 4521,
    deliveryTime: '30 min',
    creator: {
      name: 'Skincare by Priya',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      followers: '456K'
    },
    sellers: [
      {
        id: 's10',
        name: 'BeautyHub',
        price: 1099,
        rating: 4.8,
        deliveryTime: '30 min',
        badges: ['Verified', 'Fast Delivery']
      },
      {
        id: 's11',
        name: 'Glow Store',
        price: 1049,
        rating: 4.6,
        deliveryTime: '3 hrs',
        badges: ['Best Price']
      }
    ]
  },
  {
    id: '23',
    name: 'Lakme Lipstick Matte',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800',
    price: 399,
    originalPrice: 550,
    category: 'Beauty',
    brand: 'Lakme',
    rating: 4.4,
    reviews: 3421,
    deliveryTime: '10 min',
    sellers: [
      {
        id: 's32',
        name: 'Beauty Corner',
        price: 399,
        rating: 4.5,
        deliveryTime: '10 min',
        badges: ['Fast Delivery']
      }
    ]
  },
  {
    id: '24',
    name: 'Face Wash Activated Charcoal',
    image: 'https://images.unsplash.com/photo-1556228852-80863c0c5e87?w=800',
    price: 299,
    originalPrice: 399,
    category: 'Beauty',
    brand: 'WOW',
    rating: 4.3,
    reviews: 2134,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's33',
        name: 'Skincare Plus',
        price: 299,
        rating: 4.4,
        deliveryTime: '30 min',
        badges: ['Natural']
      }
    ]
  },
  {
    id: '25',
    name: 'Hair Serum Anti-Frizz',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800',
    price: 549,
    originalPrice: 749,
    category: 'Beauty',
    brand: 'Streax',
    rating: 4.5,
    reviews: 1823,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's34',
        name: 'Hair Care Store',
        price: 549,
        rating: 4.6,
        deliveryTime: '30 min',
        badges: ['Best Price']
      }
    ]
  },
  {
    id: '26',
    name: 'Moisturizer SPF 30',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8f67c?w=800',
    price: 699,
    originalPrice: 999,
    category: 'Beauty',
    brand: 'Neutrogena',
    rating: 4.6,
    reviews: 2341,
    deliveryTime: '3 hrs',
    sellers: [
      {
        id: 's35',
        name: 'Skin Solutions',
        price: 699,
        rating: 4.7,
        deliveryTime: '3 hrs',
        badges: ['Dermatologist Approved']
      }
    ]
  },
  {
    id: '27',
    name: 'Perfume EDT 100ml',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    price: 2999,
    originalPrice: 4999,
    category: 'Beauty',
    brand: 'Engage',
    rating: 4.4,
    reviews: 1234,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's36',
        name: 'Fragrance World',
        price: 2999,
        rating: 4.5,
        deliveryTime: 'Same day',
        badges: ['Long Lasting']
      }
    ]
  },

  // HOME
  {
    id: '28',
    name: 'Bedsheet Set Cotton King Size',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    price: 1499,
    originalPrice: 2499,
    category: 'Home',
    brand: 'Bombay Dyeing',
    rating: 4.5,
    reviews: 2341,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's37',
        name: 'Home Essentials',
        price: 1499,
        rating: 4.6,
        deliveryTime: 'Same day',
        badges: ['Quality']
      }
    ]
  },
  {
    id: '29',
    name: 'Table Lamp Modern',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
    price: 899,
    originalPrice: 1299,
    category: 'Home',
    brand: 'Philips',
    rating: 4.4,
    reviews: 892,
    deliveryTime: '3 hrs',
    sellers: [
      {
        id: 's38',
        name: 'Lighting Store',
        price: 899,
        rating: 4.5,
        deliveryTime: '3 hrs',
        badges: ['Energy Efficient']
      }
    ]
  },
  {
    id: '30',
    name: 'Wall Clock Wooden',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800',
    price: 799,
    originalPrice: 1199,
    category: 'Home',
    brand: 'Ajanta',
    rating: 4.3,
    reviews: 1234,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's39',
        name: 'Home Decor Plus',
        price: 799,
        rating: 4.4,
        deliveryTime: 'Same day',
        badges: ['Handcrafted']
      }
    ]
  },
  {
    id: '31',
    name: 'Cushion Covers Set of 5',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800',
    price: 599,
    originalPrice: 999,
    category: 'Home',
    brand: 'Urban Ladder',
    rating: 4.4,
    reviews: 1823,
    deliveryTime: '3 hrs',
    sellers: [
      {
        id: 's40',
        name: 'Urban Ladder Store',
        price: 599,
        rating: 4.5,
        deliveryTime: '3 hrs',
        badges: ['Designer']
      }
    ]
  },
  {
    id: '32',
    name: 'Kitchen Organizer Set',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    price: 1299,
    originalPrice: 1999,
    category: 'Home',
    brand: 'Tupperware',
    rating: 4.6,
    reviews: 3421,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's41',
        name: 'Kitchen World',
        price: 1299,
        rating: 4.7,
        deliveryTime: '30 min',
        badges: ['Durable']
      }
    ]
  },
  {
    id: '33',
    name: 'Vacuum Cleaner Cordless',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800',
    price: 8999,
    originalPrice: 12999,
    category: 'Home',
    brand: 'Dyson',
    rating: 4.8,
    reviews: 1234,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's42',
        name: 'Home Appliances',
        price: 8999,
        rating: 4.9,
        deliveryTime: 'Same day',
        badges: ['Premium', 'Warranty']
      }
    ]
  },
  {
    id: '34',
    name: 'Indoor Plants Combo',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800',
    price: 799,
    category: 'Home',
    brand: 'Green Paradise',
    rating: 4.5,
    reviews: 2134,
    deliveryTime: '3 hrs',
    sellers: [
      {
        id: 's43',
        name: 'Plant Nursery',
        price: 799,
        rating: 4.6,
        deliveryTime: '3 hrs',
        badges: ['Fresh', 'Eco-Friendly']
      }
    ]
  },

  // SPORTS
  {
    id: '35',
    name: 'Yoga Mat Premium',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
    price: 1299,
    originalPrice: 1999,
    category: 'Sports',
    brand: 'Decathlon',
    rating: 4.6,
    reviews: 2341,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's44',
        name: 'Fitness Store',
        price: 1299,
        rating: 4.7,
        deliveryTime: '30 min',
        badges: ['Premium']
      }
    ]
  },
  {
    id: '36',
    name: 'Dumbbells Set 5kg Pair',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    price: 1499,
    originalPrice: 1999,
    category: 'Sports',
    brand: 'Strauss',
    rating: 4.5,
    reviews: 1823,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's45',
        name: 'Gym Equipment',
        price: 1499,
        rating: 4.6,
        deliveryTime: 'Same day',
        badges: ['Durable']
      }
    ]
  },
  {
    id: '37',
    name: 'Cricket Bat Kashmir Willow',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    price: 2499,
    originalPrice: 3499,
    category: 'Sports',
    brand: 'SS',
    rating: 4.6,
    reviews: 1234,
    deliveryTime: '3 hrs',
    sellers: [
      {
        id: 's46',
        name: 'Sports Arena',
        price: 2499,
        rating: 4.7,
        deliveryTime: '3 hrs',
        badges: ['Quality']
      }
    ]
  },
  {
    id: '38',
    name: 'Football Size 5',
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?w=800',
    price: 899,
    originalPrice: 1299,
    category: 'Sports',
    brand: 'Nivia',
    rating: 4.4,
    reviews: 892,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's47',
        name: 'Sports Hub',
        price: 899,
        rating: 4.5,
        deliveryTime: '30 min',
        badges: ['Best Price']
      }
    ]
  },
  {
    id: '39',
    name: 'Cycling Gloves',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
    price: 399,
    originalPrice: 599,
    category: 'Sports',
    brand: 'Decathlon',
    rating: 4.3,
    reviews: 567,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's48',
        name: 'Cycle World',
        price: 399,
        rating: 4.4,
        deliveryTime: '30 min',
        badges: ['Comfortable']
      }
    ]
  },
  {
    id: '40',
    name: 'Badminton Racket Pro',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800',
    price: 3499,
    originalPrice: 4999,
    category: 'Sports',
    brand: 'Yonex',
    rating: 4.7,
    reviews: 1234,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's49',
        name: 'Yonex Official',
        price: 3499,
        rating: 4.8,
        deliveryTime: 'Same day',
        badges: ['Official', 'Pro']
      }
    ]
  },

  // BOOKS
  {
    id: '41',
    name: 'Atomic Habits by James Clear',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
    price: 399,
    originalPrice: 599,
    category: 'Books',
    brand: 'Penguin',
    rating: 4.9,
    reviews: 8921,
    deliveryTime: '3 hrs',
    creator: {
      name: 'Book Reviews',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      followers: '345K'
    },
    sellers: [
      {
        id: 's50',
        name: 'Books Paradise',
        price: 399,
        rating: 4.8,
        deliveryTime: '3 hrs',
        badges: ['Bestseller']
      }
    ]
  },
  {
    id: '42',
    name: 'The Psychology of Money',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800',
    price: 299,
    originalPrice: 450,
    category: 'Books',
    brand: 'Jaico',
    rating: 4.8,
    reviews: 5621,
    deliveryTime: '3 hrs',
    sellers: [
      {
        id: 's51',
        name: 'Bookworm',
        price: 299,
        rating: 4.7,
        deliveryTime: '3 hrs',
        badges: ['Popular']
      }
    ]
  },
  {
    id: '43',
    name: 'Harry Potter Complete Set',
    image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800',
    price: 2999,
    originalPrice: 4999,
    category: 'Books',
    brand: 'Bloomsbury',
    rating: 5.0,
    reviews: 12341,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's52',
        name: 'Fantasy Books',
        price: 2999,
        rating: 4.9,
        deliveryTime: 'Same day',
        badges: ['Complete Set']
      }
    ]
  },
  {
    id: '44',
    name: 'Think Like a Monk',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800',
    price: 349,
    originalPrice: 499,
    category: 'Books',
    brand: 'Harper Collins',
    rating: 4.7,
    reviews: 3421,
    deliveryTime: '3 hrs',
    sellers: [
      {
        id: 's53',
        name: 'Wisdom Books',
        price: 349,
        rating: 4.6,
        deliveryTime: '3 hrs',
        badges: ['Inspiring']
      }
    ]
  },
  {
    id: '45',
    name: 'Rich Dad Poor Dad',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800',
    price: 299,
    originalPrice: 399,
    category: 'Books',
    brand: 'Penguin',
    rating: 4.8,
    reviews: 6721,
    deliveryTime: '3 hrs',
    sellers: [
      {
        id: 's54',
        name: 'Finance Reads',
        price: 299,
        rating: 4.7,
        deliveryTime: '3 hrs',
        badges: ['Classic']
      }
    ]
  },

  // TOYS
  {
    id: '46',
    name: 'LEGO City Police Station',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800',
    price: 4999,
    originalPrice: 6999,
    category: 'Toys',
    brand: 'LEGO',
    rating: 4.8,
    reviews: 2341,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's55',
        name: 'Toy Kingdom',
        price: 4999,
        rating: 4.9,
        deliveryTime: 'Same day',
        badges: ['Official']
      }
    ]
  },
  {
    id: '47',
    name: 'Barbie Dreamhouse',
    image: 'https://images.unsplash.com/photo-1572960227294-a017c36b7707?w=800',
    price: 8999,
    originalPrice: 11999,
    category: 'Toys',
    brand: 'Barbie',
    rating: 4.7,
    reviews: 1823,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's56',
        name: 'Kidz Store',
        price: 8999,
        rating: 4.8,
        deliveryTime: 'Same day',
        badges: ['Popular']
      }
    ]
  },
  {
    id: '48',
    name: 'Hot Wheels Track Set',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800',
    price: 1999,
    originalPrice: 2999,
    category: 'Toys',
    brand: 'Hot Wheels',
    rating: 4.6,
    reviews: 3421,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's57',
        name: 'Toys Express',
        price: 1999,
        rating: 4.7,
        deliveryTime: '30 min',
        badges: ['Fast Delivery']
      }
    ]
  },
  {
    id: '49',
    name: 'Soft Teddy Bear Large',
    image: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=800',
    price: 799,
    originalPrice: 1299,
    category: 'Toys',
    brand: 'Archies',
    rating: 4.5,
    reviews: 1234,
    deliveryTime: '30 min',
    sellers: [
      {
        id: 's58',
        name: 'Gift Shop',
        price: 799,
        rating: 4.6,
        deliveryTime: '30 min',
        badges: ['Cute']
      }
    ]
  },
  {
    id: '50',
    name: 'Remote Control Car',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    price: 2499,
    originalPrice: 3499,
    category: 'Toys',
    brand: 'Hamleys',
    rating: 4.6,
    reviews: 892,
    deliveryTime: 'Same day',
    sellers: [
      {
        id: 's59',
        name: 'Hamleys Store',
        price: 2499,
        rating: 4.7,
        deliveryTime: 'Same day',
        badges: ['Premium']
      }
    ]
  }
];

export const CATEGORIES = [
  { name: 'Electronics', icon: '📱', color: 'bg-blue-100' },
  { name: 'Fashion', icon: '👕', color: 'bg-pink-100' },
  { name: 'Groceries', icon: '🛒', color: 'bg-green-100' },
  { name: 'Beauty', icon: '💄', color: 'bg-purple-100' },
  { name: 'Home', icon: '🏠', color: 'bg-yellow-100' },
  { name: 'Sports', icon: '⚽', color: 'bg-orange-100' },
  { name: 'Books', icon: '📚', color: 'bg-indigo-100' },
  { name: 'Toys', icon: '🧸', color: 'bg-red-100' }
];

export const DELIVERY_SPEEDS = [
  { label: '10 min', value: '10min', icon: '⚡' },
  { label: '30 min', value: '30min', icon: '🚀' },
  { label: '3 hrs', value: '3hrs', icon: '🏃' },
  { label: 'Same day', value: 'sameday', icon: '📦' },
  { label: '3 days', value: '3days', icon: '🚚' }
];

export const BRANDS = [
  { name: 'Apple', logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200' },
  { name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
  { name: 'Sony', logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
  { name: 'Samsung', logo: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200' },
  { name: 'Adidas', logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200' },
  { name: 'Levi\'s', logo: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200' }
];