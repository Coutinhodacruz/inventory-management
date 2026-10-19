import type { LucideIcon } from 'lucide-react'
import {
  Archive,
  BarChart2,
  Box,
  Boxes,
  ClipboardList,
  Crown,
  Folder,
  Home,
  Layers,
  LayoutDashboard,
  Package,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  Warehouse,
  Wine,
} from 'lucide-react'

export interface ZohoNavCategory {
  title: string
  icon: LucideIcon
  href?: string
  subItems?: {
    title: string
    href: string
    aliases?: string[]
    quickAdd?: boolean
  }[]
}

export const ZOHO_NAV_STRUCTURE: ZohoNavCategory[] = [
  {
    title: 'Home',
    icon: Home,
    href: '/',
  },
  {
    title: 'Items',
    icon: Box,
    subItems: [
      { title: 'Items', href: '/items', aliases: ['/products'], quickAdd: true },
      { title: 'Composite Items', href: '/composite-items' },
      { title: 'Item Groups', href: '/item-groups' },
      { title: 'Price Lists', href: '/price-lists' },
    ],
  },
  {
    title: 'Inventory',
    icon: Layers,
    subItems: [
      {
        title: 'Inventory Adjustments',
        href: '/inventory-adjustments',
        aliases: ['/stock-adjustments'],
        quickAdd: true,
      },
      { title: 'Warehouses', href: '/warehouses' },
      { title: 'Packages', href: '/packages' },
      { title: 'Shipments', href: '/shipments' },
    ],
  },
  {
    title: 'Sales',
    icon: ShoppingCart,
    subItems: [
      { title: 'Customers', href: '/customers', quickAdd: true },
      { title: 'Sales Orders', href: '/sales-orders', quickAdd: true },
      { title: 'Invoices', href: '/invoices' },
      { title: 'Payments Received', href: '/payments-received' },
      { title: 'Sales Returns', href: '/sales-returns' },
      { title: 'Credit Notes', href: '/credit-notes' },
    ],
  },
  {
    title: 'Purchases',
    icon: ShoppingBag,
    subItems: [
      { title: 'Vendors', href: '/vendors', aliases: ['/suppliers'], quickAdd: true },
      { title: 'Expenses', href: '/expenses' },
      { title: 'Purchase Orders', href: '/purchase-orders', quickAdd: true },
      { title: 'Purchase Receives', href: '/purchase-receives' },
      { title: 'Bills', href: '/bills' },
      { title: 'Payments Made', href: '/payments-made' },
      { title: 'Vendor Credits', href: '/vendor-credits' },
    ],
  },
  {
    title: 'Reports',
    icon: BarChart2,
    href: '/reports',
  },
  {
    title: 'Documents',
    icon: Folder,
    href: '/documents',
  },
]

export interface NavItem {
  label: string
  icon: LucideIcon
  href: string
  badge?: number | string
}

export interface NavSection {
  section: string
  items: NavItem[]
}

export const NAV_SECTIONS: NavSection[] = [
  {
    section: 'Overview',
    items: [{ label: 'Home', icon: Home, href: '/' }],
  },
  {
    section: 'Items',
    items: [
      { label: 'Items', icon: Box, href: '/items', badge: 14 },
    ],
  },
  {
    section: 'Inventory',
    items: [
      { label: 'Inventory Adjustments', icon: Archive, href: '/inventory-adjustments' },
      { label: 'Warehouses', icon: Warehouse, href: '/warehouses' },
      { label: 'Shipments', icon: Truck, href: '/shipments' },
    ],
  },
  {
    section: 'Sales',
    items: [
      { label: 'Customers', icon: Users, href: '/customers' },
      { label: 'Sales Orders', icon: ShoppingCart, href: '/sales-orders', badge: 5 },
    ],
  },
  {
    section: 'Purchases',
    items: [
      { label: 'Vendors', icon: ShoppingBag, href: '/vendors' },
      { label: 'Purchase Orders', icon: ClipboardList, href: '/purchase-orders' },
    ],
  },
]

export interface ProductItem {
  id: string
  name: string
  sku: string
  category: 'Signature Loafers' | 'Dress Shoes & Boots' | 'Travel Sport Suits' | 'Leather Travel Gear' | 'Private Reserve Wine'
  stockOnHand: number
  committedStock: number
  availableStock: number
  reorderPoint: number
  costPrice: number
  sellingPrice: number
  status: 'In stock' | 'Low stock' | 'Out of stock'
  warehouse: string
  image?: string
  instagramTag?: string
  description?: string
}

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Sovereign Velvet & Calfskin Tassel Loafer',
    sku: 'ELF-LOF-001',
    category: 'Signature Loafers',
    stockOnHand: 22,
    committedStock: 4,
    availableStock: 18,
    reorderPoint: 10,
    costPrice: 140.0,
    sellingPrice: 380.0,
    status: 'In stock',
    warehouse: "D'GTC Flagship Boutique (Nairobi)",
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya1975',
    description: 'Hand-burnished midnight calfskin with deep wine velvet vamp and braided leather tassels.',
  },
  {
    id: 'prod-2',
    name: 'Emperor Crocodile-Embossed Horsebit Loafer',
    sku: 'ELF-LOF-002',
    category: 'Signature Loafers',
    stockOnHand: 10,
    committedStock: 2,
    availableStock: 8,
    reorderPoint: 12,
    costPrice: 180.0,
    sellingPrice: 495.0,
    status: 'Low stock',
    warehouse: 'Villa Rosa Kempinski Boutique (Nairobi)',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya_ng',
    description: 'Genuine Italian leather with exotic crocodile texture and custom 24k gold-plated Elufidiya crest horsebit.',
  },
  {
    id: 'prod-3',
    name: 'Charles Two-Tone Patent Leather Slip-On',
    sku: 'ELF-LOF-003',
    category: 'Signature Loafers',
    stockOnHand: 28,
    committedStock: 4,
    availableStock: 24,
    reorderPoint: 15,
    costPrice: 125.0,
    sellingPrice: 340.0,
    status: 'In stock',
    warehouse: 'Lagos Atelier & Distribution Hub',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya1975',
    description: 'Classic high-shine black patent leather with contrast wine-red piping and memory arch support.',
  },
  {
    id: 'prod-4',
    name: 'Nairobi Woven Leather Safari Loafer',
    sku: 'ELF-LOF-004',
    category: 'Signature Loafers',
    stockOnHand: 0,
    committedStock: 0,
    availableStock: 0,
    reorderPoint: 15,
    costPrice: 155.0,
    sellingPrice: 420.0,
    status: 'Out of stock',
    warehouse: "D'GTC Flagship Boutique (Nairobi)",
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya1975',
    description: 'Hand-braided tan calf leather with ultra-flexible Goodyear-welted construction.',
  },
  {
    id: 'prod-5',
    name: 'Kempinski Executive Oxford Wholecut',
    sku: 'ELF-SHO-101',
    category: 'Dress Shoes & Boots',
    stockOnHand: 16,
    committedStock: 2,
    availableStock: 14,
    reorderPoint: 8,
    costPrice: 210.0,
    sellingPrice: 560.0,
    status: 'In stock',
    warehouse: 'Villa Rosa Kempinski Boutique (Nairobi)',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya1975',
    description: 'Single seamless cut of premium full-grain museum calfskin with artisan hand-dyed patina.',
  },
  {
    id: 'prod-6',
    name: 'Monarch Double-Buckle Leather Monkstrap',
    sku: 'ELF-SHO-102',
    category: 'Dress Shoes & Boots',
    stockOnHand: 8,
    committedStock: 2,
    availableStock: 6,
    reorderPoint: 10,
    costPrice: 190.0,
    sellingPrice: 485.0,
    status: 'Low stock',
    warehouse: 'Lagos Atelier & Distribution Hub',
    image: 'https://images.unsplash.com/photo-1582895568114-16e78942b033?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya_ng',
    description: 'Burnished cognac crust leather with solid brass hand-polished double buckles.',
  },
  {
    id: 'prod-7',
    name: 'Sahara Pull-Up Leather Chelsea Boot',
    sku: 'ELF-BOT-201',
    category: 'Dress Shoes & Boots',
    stockOnHand: 19,
    committedStock: 3,
    availableStock: 16,
    reorderPoint: 10,
    costPrice: 240.0,
    sellingPrice: 650.0,
    status: 'In stock',
    warehouse: "D'GTC Flagship Boutique (Nairobi)",
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya1975',
    description: 'Rugged luxury oil-tanned pull-up leather with stretch elastic gussets and Vibram commando lug soles.',
  },
  {
    id: 'prod-8',
    name: 'Artisan Zip-Up Calfskin Ankle Boot',
    sku: 'ELF-BOT-202',
    category: 'Dress Shoes & Boots',
    stockOnHand: 0,
    committedStock: 0,
    availableStock: 0,
    reorderPoint: 8,
    costPrice: 260.0,
    sellingPrice: 695.0,
    status: 'Out of stock',
    warehouse: 'Villa Rosa Kempinski Boutique (Nairobi)',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya1975',
    description: 'Matte black French calf leather with antiqued side brass zipper and beveled leather waist.',
  },
  {
    id: 'prod-9',
    name: 'Presidential Travel Sport Suit (2-Piece)',
    sku: 'ELF-SUT-301',
    category: 'Travel Sport Suits',
    stockOnHand: 15,
    committedStock: 3,
    availableStock: 12,
    reorderPoint: 10,
    costPrice: 320.0,
    sellingPrice: 890.0,
    status: 'In stock',
    warehouse: "D'GTC Flagship Boutique (Nairobi)",
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya1975',
    description: 'Wrinkle-resistant high-twist lightweight Italian wool blend with tailored drawstring trousers and unlined blazer.',
  },
  {
    id: 'prod-10',
    name: 'Kilimanjaro Tailored Safari Bomber',
    sku: 'ELF-APP-302',
    category: 'Travel Sport Suits',
    stockOnHand: 7,
    committedStock: 2,
    availableStock: 5,
    reorderPoint: 8,
    costPrice: 280.0,
    sellingPrice: 780.0,
    status: 'Low stock',
    warehouse: 'Villa Rosa Kempinski Boutique (Nairobi)',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya_ng',
    description: 'Fine suede nubuck leather trim on breathable micro-canvas with gold hardware and silk lining.',
  },
  {
    id: 'prod-11',
    name: 'Signature Wrinkle-Free Leisure Trousers',
    sku: 'ELF-APP-303',
    category: 'Travel Sport Suits',
    stockOnHand: 42,
    committedStock: 7,
    availableStock: 35,
    reorderPoint: 20,
    costPrice: 95.0,
    sellingPrice: 265.0,
    status: 'In stock',
    warehouse: 'Lagos Atelier & Distribution Hub',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya1975',
    description: 'High-stretch tropical-weight wool in charcoal and deep olive with tailored tapered hem.',
  },
  {
    id: 'prod-12',
    name: 'The Diplomat Leather Weekender Duffel',
    sku: 'ELF-ACC-401',
    category: 'Leather Travel Gear',
    stockOnHand: 11,
    committedStock: 2,
    availableStock: 9,
    reorderPoint: 10,
    costPrice: 340.0,
    sellingPrice: 950.0,
    status: 'Low stock',
    warehouse: "D'GTC Flagship Boutique (Nairobi)",
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya1975',
    description: 'Heavyweight vegetable-tanned leather, dedicated ventilated shoe compartment, and solid brass locks.',
  },
  {
    id: 'prod-13',
    name: 'Heritage Reversible Leather Belt (Gold Crest)',
    sku: 'ELF-ACC-402',
    category: 'Leather Travel Gear',
    stockOnHand: 55,
    committedStock: 7,
    availableStock: 48,
    reorderPoint: 25,
    costPrice: 65.0,
    sellingPrice: 185.0,
    status: 'In stock',
    warehouse: 'Lagos Atelier & Distribution Hub',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya_ng',
    description: 'Dual-sided black and tan full-grain bridle leather with interchangeable 24k gold-plated Elufidiya buckle.',
  },
  {
    id: 'prod-14',
    name: 'Elufidiya Grand Reserve 1975 Private Vintage',
    sku: 'ELF-WIN-501',
    category: 'Private Reserve Wine',
    stockOnHand: 32,
    committedStock: 4,
    availableStock: 28,
    reorderPoint: 15,
    costPrice: 110.0,
    sellingPrice: 310.0,
    status: 'In stock',
    warehouse: "D'GTC Flagship Boutique (Nairobi)",
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80',
    instagramTag: '@elufidiya1975',
    description: 'Limited cellar release Bordeaux-style blend packaged in custom hand-stitched leather gift tube.',
  },
]

export interface MetricItem {
  label: string
  value: string
  change: string
  icon: LucideIcon
  tone: string
}

export const DASHBOARD_METRICS: MetricItem[] = [
  {
    label: 'Maison Valuation',
    value: '$134,840',
    change: '16.4%',
    icon: Boxes,
    tone: 'bg-[#edf8c9] text-[#627b1b]',
  },
  {
    label: 'Curated Items',
    value: '265 units',
    change: '8.2%',
    icon: Package,
    tone: 'bg-[#e8f1ed] text-[#47715d]',
  },
  {
    label: 'Low Stock Flagships',
    value: '5 SKUs',
    change: 'Restock needed',
    icon: Archive,
    tone: 'bg-[#fff0e6] text-[#c47748]',
  },
  {
    label: 'VIP Orders in Queue',
    value: '18 orders',
    change: '14.8%',
    icon: ShoppingCart,
    tone: 'bg-[#e9edfb] text-[#6172af]',
  },
]

export interface MonthlyRevenue {
  month: string
  height: number
  isHighlighted?: boolean
}

export const REVENUE_MONTHS: MonthlyRevenue[] = [
  { month: 'J', height: 45 },
  { month: 'F', height: 58 },
  { month: 'M', height: 52 },
  { month: 'A', height: 72 },
  { month: 'M', height: 68 },
  { month: 'J', height: 84 },
  { month: 'J', height: 79 },
  { month: 'A', height: 91 },
  { month: 'S', height: 86 },
  { month: 'O', height: 98, isHighlighted: true },
  { month: 'N', height: 89 },
  { month: 'D', height: 95 },
]

export interface ActivityItem {
  id: string
  title: string
  subtitle: string
  timestamp: string
  icon: LucideIcon
}

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    title: 'Sovereign Loafers custom order dispatched',
    subtitle: 'JW Marriott Suite Concierge · Nairobi D’GTC',
    timestamp: '15 min ago',
    icon: ShoppingCart,
  },
  {
    id: '2',
    title: 'Italian Crust Calfskin shipment arrived',
    subtitle: 'Lagos Atelier · Master Craftsmen batch #48',
    timestamp: '50 min ago',
    icon: Boxes,
  },
  {
    id: '3',
    title: 'VIP order delivered to Villa Rosa Kempinski',
    subtitle: 'Senator B. Alabi · SH-3021 DHL Express',
    timestamp: '2 hrs ago',
    icon: Truck,
  },
]

export interface StockAdjustmentItem {
  id: string
  referenceNo: string
  date: string
  reason: 'Inventory Count / Reconcile' | 'Damaged Goods' | 'Stock Write-off' | 'Stock Found'
  warehouse: string
  type: 'Quantity Adjustment' | 'Value Adjustment'
  adjustedUnits: number
  valueChange: string
  adjustedBy: string
  status: 'Adjusted' | 'Pending Approval' | 'Draft'
}

export const STOCK_ADJUSTMENTS: StockAdjustmentItem[] = [
  {
    id: 'adj-1',
    referenceNo: 'ADJ-ELF-001',
    date: 'Oct 17, 2024',
    reason: 'Inventory Count / Reconcile',
    warehouse: "D'GTC Flagship Boutique (Nairobi)",
    type: 'Quantity Adjustment',
    adjustedUnits: -2,
    valueChange: '-$760.00',
    adjustedBy: 'Elufidiya',
    status: 'Adjusted',
  },
  {
    id: 'adj-2',
    referenceNo: 'ADJ-ELF-002',
    date: 'Oct 15, 2024',
    reason: 'Damaged Goods',
    warehouse: 'Villa Rosa Kempinski Boutique (Nairobi)',
    type: 'Quantity Adjustment',
    adjustedUnits: -1,
    valueChange: '-$495.00',
    adjustedBy: 'Amina Ndungu',
    status: 'Adjusted',
  },
  {
    id: 'adj-3',
    referenceNo: 'ADJ-ELF-003',
    date: 'Oct 12, 2024',
    reason: 'Stock Found',
    warehouse: 'Lagos Atelier & Distribution Hub',
    type: 'Quantity Adjustment',
    adjustedUnits: +4,
    valueChange: '+$1,520.00',
    adjustedBy: 'Chuka Obi',
    status: 'Adjusted',
  },
  {
    id: 'adj-4',
    referenceNo: 'ADJ-ELF-004',
    date: 'Oct 10, 2024',
    reason: 'Stock Write-off',
    warehouse: 'Global Air Cargo Hub (Nairobi)',
    type: 'Value Adjustment',
    adjustedUnits: 0,
    valueChange: '-$620.00',
    adjustedBy: 'Elufidiya',
    status: 'Pending Approval',
  },
]

export interface WarehouseItem {
  id: string
  code: string
  name: string
  type: 'Flagship Boutique' | 'Luxury Hotel Boutique' | 'Atelier & Workshop' | 'International Hub'
  location: string
  manager: string
  contact: string
  capacityPercent: number
  totalSkus: number
  totalUnits: number
  status: 'Active' | 'Near Capacity' | 'Maintenance'
}

export const WAREHOUSES_DATA: WarehouseItem[] = [
  {
    id: 'wh-1',
    code: 'ELF-DGTC',
    name: "D'GTC Flagship Boutique (Nairobi)",
    type: 'Flagship Boutique',
    location: "D'GTC Boutique Mall, Below JW Marriott, Westlands, Nairobi",
    manager: 'Grace Mutua',
    contact: 'gtc.boutique@elufidiya.com',
    capacityPercent: 82,
    totalSkus: 14,
    totalUnits: 148,
    status: 'Active',
  },
  {
    id: 'wh-2',
    code: 'ELF-KEMP',
    name: 'Villa Rosa Kempinski Boutique (Nairobi)',
    type: 'Luxury Hotel Boutique',
    location: 'Ground Floor, Villa Rosa Kempinski, Chiromo Rd, Nairobi',
    manager: 'Kevin Mwangi',
    contact: 'kempinski@elufidiya.com',
    capacityPercent: 91,
    totalSkus: 12,
    totalUnits: 88,
    status: 'Near Capacity',
  },
  {
    id: 'wh-3',
    code: 'ELF-LAGOS',
    name: 'Lagos Master Atelier & Hub',
    type: 'Atelier & Workshop',
    location: 'Victoria Island / Lekki Phase 1, Lagos, Nigeria',
    manager: 'Elufidiya',
    contact: 'lagos.atelier@elufidiya.com',
    capacityPercent: 68,
    totalSkus: 14,
    totalUnits: 320,
    status: 'Active',
  },
  {
    id: 'wh-4',
    code: 'ELF-GLOBAL',
    name: 'Global Air Cargo Hub',
    type: 'International Hub',
    location: 'JKIA Cargo Center, Nairobi (Worldwide Express to UK/US/UAE)',
    manager: 'David Otieno',
    contact: 'logistics@elufidiya.com',
    capacityPercent: 44,
    totalSkus: 10,
    totalUnits: 110,
    status: 'Active',
  },
]

export interface SalesOrderItem {
  id: string
  orderNumber: string
  customerName: string
  date: string
  expectedShipment: string
  itemsCount: number
  totalAmount: number
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid'
  fulfillmentStatus: 'Delivered' | 'Shipped' | 'Packed' | 'Confirmed' | 'Draft'
  channel: 'Boutique POS' | 'Instagram Direct (@elufidiya1975)' | 'VIP Concierge'
}

export const SALES_ORDERS: SalesOrderItem[] = [
  {
    id: 'so-1',
    orderNumber: 'ELF-SO-108',
    customerName: 'Dr. Amina Odhiambo',
    date: 'Oct 17, 2024',
    expectedShipment: 'Oct 18, 2024',
    itemsCount: 3,
    totalAmount: 1840.0,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Confirmed',
    channel: 'Instagram Direct (@elufidiya1975)',
  },
  {
    id: 'so-2',
    orderNumber: 'ELF-SO-107',
    customerName: 'Senator Babatunde Alabi',
    date: 'Oct 16, 2024',
    expectedShipment: 'Oct 17, 2024',
    itemsCount: 2,
    totalAmount: 1375.0,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Packed',
    channel: 'VIP Concierge',
  },
  {
    id: 'so-3',
    orderNumber: 'ELF-SO-106',
    customerName: 'Marcus Sterling',
    date: 'Oct 15, 2024',
    expectedShipment: 'Oct 16, 2024',
    itemsCount: 4,
    totalAmount: 2680.0,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Shipped',
    channel: 'Boutique POS',
  },
  {
    id: 'so-4',
    orderNumber: 'ELF-SO-105',
    customerName: 'Lady Folake Adeleke',
    date: 'Oct 14, 2024',
    expectedShipment: 'Oct 15, 2024',
    itemsCount: 1,
    totalAmount: 890.0,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Delivered',
    channel: 'Instagram Direct (@elufidiya1975)',
  },
  {
    id: 'so-5',
    orderNumber: 'ELF-SO-104',
    customerName: 'Kenyan Diplomatic Mission',
    date: 'Oct 12, 2024',
    expectedShipment: 'Oct 15, 2024',
    itemsCount: 6,
    totalAmount: 4350.0,
    paymentStatus: 'Partial',
    fulfillmentStatus: 'Packed',
    channel: 'VIP Concierge',
  },
]

export interface PurchaseOrderItem {
  id: string
  poNumber: string
  supplierName: string
  orderDate: string
  expectedDate: string
  itemTypesCount: number
  totalUnits: number
  totalCost: number
  status: 'Issued' | 'Partially Received' | 'Received' | 'Draft'
  paymentStatus: 'Billed' | 'Pending Invoice' | 'Paid'
}

export const PURCHASE_ORDERS: PurchaseOrderItem[] = [
  {
    id: 'po-1',
    poNumber: 'ELF-PO-301',
    supplierName: 'Tuscan Tannery Consortium (Florence, Italy)',
    orderDate: 'Oct 12, 2024',
    expectedDate: 'Oct 24, 2024',
    itemTypesCount: 3,
    totalUnits: 80,
    totalCost: 11200.0,
    status: 'Partially Received',
    paymentStatus: 'Pending Invoice',
  },
  {
    id: 'po-2',
    poNumber: 'ELF-PO-302',
    supplierName: 'Milano Textile & Wool Mills (Biella, Italy)',
    orderDate: 'Oct 08, 2024',
    expectedDate: 'Oct 20, 2024',
    itemTypesCount: 2,
    totalUnits: 45,
    totalCost: 7650.0,
    status: 'Issued',
    paymentStatus: 'Pending Invoice',
  },
  {
    id: 'po-3',
    poNumber: 'ELF-PO-303',
    supplierName: 'Stellenbosch Private Cellars (South Africa)',
    orderDate: 'Sep 29, 2024',
    expectedDate: 'Oct 10, 2024',
    itemTypesCount: 1,
    totalUnits: 60,
    totalCost: 4800.0,
    status: 'Received',
    paymentStatus: 'Paid',
  },
]

export interface ShipmentItem {
  id: string
  shipmentNumber: string
  orderNumber: string
  customerName: string
  carrier: 'DHL Express' | 'FedEx International' | 'VIP Chauffeur Concierge'
  trackingCode: string
  origin: string
  destination: string
  shippedDate: string
  estimatedDelivery: string
  status: 'Delivered' | 'Out for Delivery' | 'In Transit' | 'Dispatched'
}

export const SHIPMENTS_DATA: ShipmentItem[] = [
  {
    id: 'sh-1',
    shipmentNumber: 'ELF-SH-3021',
    orderNumber: 'ELF-SO-106',
    customerName: 'Marcus Sterling',
    carrier: 'DHL Express',
    trackingCode: 'DHL-992014829',
    origin: "Nairobi (D'GTC Mall)",
    destination: 'London, Mayfair (UK)',
    shippedDate: 'Oct 16, 2024',
    estimatedDelivery: 'Oct 19, 2024',
    status: 'In Transit',
  },
  {
    id: 'sh-2',
    shipmentNumber: 'ELF-SH-3020',
    orderNumber: 'ELF-SO-105',
    customerName: 'Lady Folake Adeleke',
    carrier: 'VIP Chauffeur Concierge',
    trackingCode: 'CONCIERGE-0042',
    origin: 'Lagos Atelier',
    destination: 'Ikoyi, Lagos (Nigeria)',
    shippedDate: 'Oct 14, 2024',
    estimatedDelivery: 'Oct 14, 2024',
    status: 'Delivered',
  },
  {
    id: 'sh-3',
    shipmentNumber: 'ELF-SH-3019',
    orderNumber: 'ELF-SO-107',
    customerName: 'Senator Babatunde Alabi',
    carrier: 'VIP Chauffeur Concierge',
    trackingCode: 'CONCIERGE-0041',
    origin: 'Villa Rosa Kempinski',
    destination: 'Karen, Nairobi (Kenya)',
    shippedDate: 'Oct 17, 2024',
    estimatedDelivery: 'Oct 18, 2024',
    status: 'Dispatched',
  },
]

export interface CustomerItem {
  id: string
  name: string
  company: string
  email: string
  phone: string
  city: string
  totalOrders: number
  totalSpend: number
  receivables: number
  status: 'Active' | 'VIP Client'
}

export const CUSTOMERS_DATA: CustomerItem[] = [
  {
    id: 'cust-1',
    name: 'Dr. Amina Odhiambo',
    company: 'Nairobi Health Partners',
    email: 'amina.o@nairobihealth.org',
    phone: '+254 712 345 678',
    city: 'Nairobi, Kenya',
    totalOrders: 6,
    totalSpend: 7850.0,
    receivables: 0.0,
    status: 'VIP Client',
  },
  {
    id: 'cust-2',
    name: 'Senator Babatunde Alabi',
    company: 'Federal Republic of Nigeria',
    email: 'senator.alabi@vip.gov.ng',
    phone: '+234 803 123 4567',
    city: 'Abuja & Lagos, Nigeria',
    totalOrders: 11,
    totalSpend: 15420.0,
    receivables: 0.0,
    status: 'VIP Client',
  },
  {
    id: 'cust-3',
    name: 'Marcus Sterling',
    company: 'Sterling Capital Mayfair',
    email: 'msterling@sterlingcap.co.uk',
    phone: '+44 20 7946 0912',
    city: 'London, UK',
    totalOrders: 4,
    totalSpend: 5920.0,
    receivables: 0.0,
    status: 'Active',
  },
  {
    id: 'cust-4',
    name: 'Lady Folake Adeleke',
    company: 'Adeleke Heritage Foundation',
    email: 'folake@adelekefdn.org',
    phone: '+234 802 987 6543',
    city: 'Victoria Island, Lagos',
    totalOrders: 8,
    totalSpend: 11200.0,
    receivables: 0.0,
    status: 'VIP Client',
  },
]

export interface SupplierItem {
  id: string
  name: string
  code: string
  contactPerson: string
  email: string
  phone: string
  category: string
  leadTimeDays: number
  openOrdersCount: number
  payables: number
  rating: number
}

export const SUPPLIERS_DATA: SupplierItem[] = [
  {
    id: 'sup-1',
    name: 'Tuscan Tannery Consortium (Florence)',
    code: 'SUP-TUSC',
    contactPerson: 'Giovanni Rossi',
    email: 'rossi@tuscantannery.it',
    phone: '+39 055 234 5678',
    category: 'Handmade Italian Calfskin & Patina Crust',
    leadTimeDays: 12,
    openOrdersCount: 1,
    payables: 11200.0,
    rating: 5.0,
  },
  {
    id: 'sup-2',
    name: 'Milano Textile & Wool Mills (Biella)',
    code: 'SUP-BIELLA',
    contactPerson: 'Paolo Bertolini',
    email: 'pbertolini@biellawaste.it',
    phone: '+39 015 892 1100',
    category: 'Wrinkle-Free High-Twist Travel Suit Fabrics',
    leadTimeDays: 14,
    openOrdersCount: 1,
    payables: 7650.0,
    rating: 4.9,
  },
  {
    id: 'sup-3',
    name: 'Stellenbosch Private Cellars (South Africa)',
    code: 'SUP-WINE',
    contactPerson: 'Stefan van der Merwe',
    email: 'stefan@stellenboschcellars.co.za',
    phone: '+27 21 888 1234',
    category: 'Private Reserve Signature Wine Collection',
    leadTimeDays: 10,
    openOrdersCount: 0,
    payables: 0.0,
    rating: 5.0,
  },
]

export interface PackageItem {
  id: string
  packageNumber: string
  salesOrderNumber: string
  customerName: string
  itemsCount: number
  packagingType: string
  weightKg: number
  status: 'Not Shipped' | 'Shipped' | 'Delivered'
  date: string
}

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'pkg-1',
    packageNumber: 'PKG-00104',
    salesOrderNumber: 'ELF-SO-105',
    customerName: 'Lady Folake Adeleke',
    itemsCount: 2,
    packagingType: 'Elufidiya Gold-Embossed Presentation Box',
    weightKg: 2.4,
    status: 'Delivered',
    date: 'Oct 14, 2024',
  },
  {
    id: 'pkg-2',
    packageNumber: 'PKG-00105',
    salesOrderNumber: 'ELF-SO-106',
    customerName: 'Marcus Sterling',
    itemsCount: 1,
    packagingType: 'Heavyweight Canvas Suit Travel Carrier',
    weightKg: 4.1,
    status: 'Shipped',
    date: 'Oct 16, 2024',
  },
  {
    id: 'pkg-3',
    packageNumber: 'PKG-00106',
    salesOrderNumber: 'ELF-SO-107',
    customerName: 'Senator Babatunde Alabi',
    itemsCount: 3,
    packagingType: 'Twin Leather Footwear Case + Wine Tube',
    weightKg: 5.8,
    status: 'Not Shipped',
    date: 'Oct 17, 2024',
  },
]

export interface InvoiceItem {
  id: string
  invoiceNumber: string
  orderNumber: string
  customerName: string
  date: string
  dueDate: string
  amount: number
  balanceDue: number
  status: 'Paid' | 'Sent' | 'Overdue' | 'Draft'
}

export const INVOICES_DATA: InvoiceItem[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2024-089',
    orderNumber: 'ELF-SO-105',
    customerName: 'Lady Folake Adeleke',
    date: 'Oct 14, 2024',
    dueDate: 'Oct 28, 2024',
    amount: 1145.0,
    balanceDue: 0.0,
    status: 'Paid',
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2024-090',
    orderNumber: 'ELF-SO-106',
    customerName: 'Marcus Sterling',
    date: 'Oct 16, 2024',
    dueDate: 'Oct 30, 2024',
    amount: 950.0,
    balanceDue: 950.0,
    status: 'Sent',
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2024-091',
    orderNumber: 'ELF-SO-107',
    customerName: 'Senator Babatunde Alabi',
    date: 'Oct 17, 2024',
    dueDate: 'Nov 01, 2024',
    amount: 1980.0,
    balanceDue: 0.0,
    status: 'Paid',
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-2024-082',
    orderNumber: 'ELF-SO-101',
    customerName: 'His Highness Prince Tariq',
    date: 'Oct 02, 2024',
    dueDate: 'Oct 16, 2024',
    amount: 3420.0,
    balanceDue: 0.0,
    status: 'Paid',
  },
]

export interface PaymentReceivedItem {
  id: string
  paymentNumber: string
  invoiceNumber: string
  customerName: string
  paymentDate: string
  mode: 'Bank Wire (USD)' | 'POS Terminal (KSh)' | 'Paystack / NGN' | 'AMEX Concierge'
  amount: number
  reference: string
}

export const PAYMENTS_RECEIVED_DATA: PaymentReceivedItem[] = [
  {
    id: 'pay-1',
    paymentNumber: 'PAY-0081',
    invoiceNumber: 'INV-2024-089',
    customerName: 'Lady Folake Adeleke',
    paymentDate: 'Oct 14, 2024',
    mode: 'Bank Wire (USD)',
    amount: 1145.0,
    reference: 'WIRE-VI-9921',
  },
  {
    id: 'pay-2',
    paymentNumber: 'PAY-0082',
    invoiceNumber: 'INV-2024-091',
    customerName: 'Senator Babatunde Alabi',
    paymentDate: 'Oct 17, 2024',
    mode: 'Paystack / NGN',
    amount: 1980.0,
    reference: 'PSTK-ABJ-3019',
  },
  {
    id: 'pay-3',
    paymentNumber: 'PAY-0080',
    invoiceNumber: 'INV-2024-082',
    customerName: 'His Highness Prince Tariq',
    paymentDate: 'Oct 03, 2024',
    mode: 'AMEX Concierge',
    amount: 3420.0,
    reference: 'AMEX-VIP-002',
  },
]

export interface SalesReturnItem {
  id: string
  returnNumber: string
  salesOrderNumber: string
  customerName: string
  returnDate: string
  reason: string
  units: number
  status: 'Approved & Exchanged' | 'Pending Inspection'
}

export const SALES_RETURNS_DATA: SalesReturnItem[] = [
  {
    id: 'sr-1',
    returnNumber: 'SR-0012',
    salesOrderNumber: 'ELF-SO-099',
    customerName: 'Marcus Sterling',
    returnDate: 'Oct 05, 2024',
    reason: 'Size Exchange (Requested EU 44 for Loafers)',
    units: 1,
    status: 'Approved & Exchanged',
  },
]

export interface CreditNoteItem {
  id: string
  creditNoteNumber: string
  customerName: string
  invoiceNumber: string
  date: string
  amount: number
  balance: number
  status: 'Open' | 'Closed'
}

export const CREDIT_NOTES_DATA: CreditNoteItem[] = [
  {
    id: 'cn-1',
    creditNoteNumber: 'CN-004',
    customerName: 'Dr. Amina Odhiambo',
    invoiceNumber: 'INV-2024-075',
    date: 'Sep 28, 2024',
    amount: 150.0,
    balance: 0.0,
    status: 'Closed',
  },
]

export interface ExpenseItem {
  id: string
  expenseNumber: string
  date: string
  category: string
  vendor: string
  paidThrough: string
  amount: number
  status: 'Non-Billable' | 'Billed'
}

export const EXPENSES_DATA: ExpenseItem[] = [
  {
    id: 'exp-1',
    expenseNumber: 'EXP-0042',
    date: 'Oct 15, 2024',
    category: 'Air Freight & Customs Clearance',
    vendor: 'DHL Global Forwarding Kenya',
    paidThrough: 'Stanbic Bank Corporate (USD)',
    amount: 1850.0,
    status: 'Non-Billable',
  },
  {
    id: 'exp-2',
    expenseNumber: 'EXP-0043',
    date: 'Oct 12, 2024',
    category: "Boutique Showcase & Display (D'GTC Mall)",
    vendor: 'Nairobi Luxury Fit-outs Ltd',
    paidThrough: 'Petty Cash Nairobi',
    amount: 620.0,
    status: 'Non-Billable',
  },
  {
    id: 'exp-3',
    expenseNumber: 'EXP-0044',
    date: 'Oct 08, 2024',
    category: 'Leather Care & Polish Compounds',
    vendor: 'Saphir Médaille d’Or (France)',
    paidThrough: 'Corporate Amex',
    amount: 430.0,
    status: 'Non-Billable',
  },
]

export interface BillItem {
  id: string
  billNumber: string
  vendorName: string
  poNumber: string
  billDate: string
  dueDate: string
  amount: number
  balanceDue: number
  status: 'Paid' | 'Open' | 'Overdue'
}

export const BILLS_DATA: BillItem[] = [
  {
    id: 'bill-1',
    billNumber: 'BILL-0091',
    vendorName: 'Tuscan Tannery Consortium (Florence)',
    poNumber: 'ELF-PO-301',
    billDate: 'Oct 14, 2024',
    dueDate: 'Nov 14, 2024',
    amount: 11200.0,
    balanceDue: 11200.0,
    status: 'Open',
  },
  {
    id: 'bill-2',
    billNumber: 'BILL-0092',
    vendorName: 'Milano Textile & Wool Mills (Biella)',
    poNumber: 'ELF-PO-302',
    billDate: 'Oct 09, 2024',
    dueDate: 'Nov 09, 2024',
    amount: 7650.0,
    balanceDue: 7650.0,
    status: 'Open',
  },
  {
    id: 'bill-3',
    billNumber: 'BILL-0088',
    vendorName: 'Stellenbosch Private Cellars (South Africa)',
    poNumber: 'ELF-PO-303',
    billDate: 'Sep 30, 2024',
    dueDate: 'Oct 15, 2024',
    amount: 4800.0,
    balanceDue: 0.0,
    status: 'Paid',
  },
]

export interface PurchaseReceiveItem {
  id: string
  receiveNumber: string
  poNumber: string
  vendorName: string
  receivedDate: string
  unitsReceived: number
  warehouse: string
  status: 'Verified into Stock' | 'Inspection Pending'
}

export const PURCHASE_RECEIVES_DATA: PurchaseReceiveItem[] = [
  {
    id: 'pr-1',
    receiveNumber: 'PR-0041',
    poNumber: 'ELF-PO-303',
    vendorName: 'Stellenbosch Private Cellars',
    receivedDate: 'Oct 10, 2024',
    unitsReceived: 60,
    warehouse: "D'GTC Flagship Boutique (Nairobi)",
    status: 'Verified into Stock',
  },
  {
    id: 'pr-2',
    receiveNumber: 'PR-0042',
    poNumber: 'ELF-PO-301',
    vendorName: 'Tuscan Tannery Consortium',
    receivedDate: 'Oct 16, 2024',
    unitsReceived: 35,
    warehouse: 'Lagos Atelier & Distribution Hub',
    status: 'Verified into Stock',
  },
]

export interface PaymentMadeItem {
  id: string
  paymentNumber: string
  billNumber: string
  vendorName: string
  date: string
  amount: number
  mode: string
}

export const PAYMENTS_MADE_DATA: PaymentMadeItem[] = [
  {
    id: 'pm-1',
    paymentNumber: 'PM-0050',
    billNumber: 'BILL-0088',
    vendorName: 'Stellenbosch Private Cellars (South Africa)',
    date: 'Oct 14, 2024',
    amount: 4800.0,
    mode: 'International SWIFT Wire (ZAR/USD)',
  },
]

export interface VendorCreditItem {
  id: string
  creditNumber: string
  vendorName: string
  date: string
  amount: number
  status: 'Open' | 'Applied'
}

export const VENDOR_CREDITS_DATA: VendorCreditItem[] = [
  {
    id: 'vc-1',
    creditNumber: 'VC-002',
    vendorName: 'Tuscan Tannery Consortium',
    date: 'Oct 01, 2024',
    amount: 320.0,
    status: 'Open',
  },
]

export interface PriceListItem {
  id: string
  name: string
  pricingScheme: string
  currency: string
  markupPercentage: number
  applicableTo: string
  status: 'Active'
}

export const PRICE_LISTS_DATA: PriceListItem[] = [
  {
    id: 'pl-1',
    name: 'Maison VIP Private Client Tariff (USD)',
    pricingScheme: 'Volume & Status Tier',
    currency: 'USD ($)',
    markupPercentage: 0,
    applicableTo: 'All VIP Ambassadors & Diplomats',
    status: 'Active',
  },
  {
    id: 'pl-2',
    name: 'Nairobi Flagship Retail (KES)',
    pricingScheme: 'Storefront Rate',
    currency: 'KES (KSh)',
    markupPercentage: 5,
    applicableTo: "D'GTC Mall & Kempinski Walk-in",
    status: 'Active',
  },
  {
    id: 'pl-3',
    name: 'Lagos Atelier Wholesale (NGN)',
    pricingScheme: 'Atelier Wholesale Tier',
    currency: 'NGN (₦)',
    markupPercentage: -10,
    applicableTo: 'Boutique Stockists & Consignees',
    status: 'Active',
  },
]

export interface CompositeItem {
  id: string
  name: string
  sku: string
  components: string
  stockAvailable: number
  sellingPrice: number
  costPrice: number
  image?: string
}

export const COMPOSITE_ITEMS_DATA: CompositeItem[] = [
  {
    id: 'comp-1',
    name: 'The Elufidiya Gentleman’s Travel Ensemble',
    sku: 'ELF-BUN-01',
    components: 'Travel Sport Suit + Sovereign Loafer + Diplomat Duffel',
    stockAvailable: 8,
    sellingPrice: 1980.0,
    costPrice: 800.0,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'comp-2',
    name: 'Grand Reserve Celebration Gift Box',
    sku: 'ELF-BUN-02',
    components: '1975 Vintage Wine + Heritage Reversible Belt',
    stockAvailable: 24,
    sellingPrice: 460.0,
    costPrice: 175.0,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80',
  },
]

export interface ItemGroupItem {
  id: string
  groupName: string
  variantsCount: number
  attributeTypes: string
  totalStock: number
  primaryCategory: string
  image?: string
}

export const ITEM_GROUPS_DATA: ItemGroupItem[] = [
  {
    id: 'grp-1',
    groupName: 'Sovereign Velvet & Calfskin Tassel Loafer',
    variantsCount: 7,
    attributeTypes: 'Size: EU 40, 41, 42, 43, 44, 45, 46 | Colors: Wine/Black, Tan/Navy',
    totalStock: 32,
    primaryCategory: 'Signature Loafers',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'grp-2',
    groupName: 'Presidential Travel Sport Suit (2-Piece)',
    variantsCount: 5,
    attributeTypes: 'Size: 38R, 40R, 42R, 44R, 46R | Shades: Midnight Navy, Olive Forest, Charcoal',
    totalStock: 15,
    primaryCategory: 'Travel Sport Suits',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
  },
]

