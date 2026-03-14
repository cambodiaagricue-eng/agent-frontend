import type {
  User,
  SoilReport,
  Loan,
  LoanProvider,
  Product,
  MarketPrice,
  Order,
  WeatherData,
  CropAlert,
  DashboardStats,
  ChatConversation,
  CommunityPost,
} from "./types";

// ─── Mock User ───────────────────────────────────────────────
export const mockUser: User = {
  id: "u1",
  name: "Sokheng Chea",
  email: "sokheng@example.com",
  phone: "+855 12 345 678",
  role: "farmer",
  avatar: "",
  farmSize: 12.5,
  location: "Battambang, Cambodia",
  crops: ["Rice", "Cassava", "Mango"],
  joinedAt: "2024-06-15",
};

// ─── Dashboard Stats ──────────────────────────────────────────
export const mockDashboardStats: DashboardStats = {
  totalFarmArea: 12.5,
  activeCrops: 4,
  soilHealth: 78,
  pendingLoans: 1,
  marketListings: 6,
  weatherAlerts: 2,
};

// ─── Weather ──────────────────────────────────────────────────
export const mockWeather: WeatherData = {
  locationLabel: "Battambang",
  temperature: 32,
  humidity: 78,
  description: "Partly Cloudy",
  icon: "cloud-sun",
  forecast: [
    { day: "Mon", high: 33, low: 24, condition: "sunny" },
    { day: "Tue", high: 31, low: 23, condition: "cloudy" },
    { day: "Wed", high: 29, low: 22, condition: "rain" },
    { day: "Thu", high: 30, low: 23, condition: "rain" },
    { day: "Fri", high: 32, low: 24, condition: "sunny" },
  ],
};

// ─── Crop Alerts ──────────────────────────────────────────────
export const mockAlerts: CropAlert[] = [
  {
    id: "a1",
    type: "disease",
    severity: "high",
    title: "Rice Blast Detected",
    description: "Fungal infection risk high in your paddy field. Apply fungicide immediately.",
    crop: "Rice",
    date: "2026-03-07",
  },
  {
    id: "a2",
    type: "weather",
    severity: "medium",
    title: "Heavy Rain Expected",
    description: "Rainfall of 80mm expected in the next 48 hours. Secure harvested crops.",
    crop: "All",
    date: "2026-03-08",
  },
  {
    id: "a3",
    type: "market",
    severity: "low",
    title: "Cassava Price Rising",
    description: "Cassava prices up 12% in Phnom Penh market. Consider selling.",
    crop: "Cassava",
    date: "2026-03-06",
  },
];

// ─── Soil Reports ─────────────────────────────────────────────
export const mockSoilReports: SoilReport[] = [
  {
    id: "s1",
    farmerId: "u1",
    date: "2026-03-01",
    location: "Plot A - North Field",
    healthScore: 78,
    nitrogen: 65,
    phosphorus: 42,
    potassium: 71,
    ph: 6.5,
    organicMatter: 3.2,
    moisture: 45,
    recommendations: [
      "Apply nitrogen-rich fertilizer (46-0-0)",
      "Add organic compost to improve phosphorus levels",
      "Soil pH is optimal for rice cultivation",
    ],
    status: "analyzed",
  },
  {
    id: "s2",
    farmerId: "u1",
    date: "2026-02-15",
    location: "Plot B - River Side",
    healthScore: 62,
    nitrogen: 45,
    phosphorus: 55,
    potassium: 38,
    ph: 5.8,
    organicMatter: 2.1,
    moisture: 52,
    recommendations: [
      "Increase potassium with potash fertilizer",
      "Apply lime to raise pH to 6.0-6.5 range",
      "Add green manure to boost organic matter",
    ],
    status: "analyzed",
  },
  {
    id: "s3",
    farmerId: "u1",
    date: "2026-01-20",
    location: "Plot C - Hillside",
    healthScore: 85,
    nitrogen: 72,
    phosphorus: 68,
    potassium: 80,
    ph: 6.8,
    organicMatter: 4.5,
    moisture: 38,
    recommendations: [
      "Maintain current fertilization schedule",
      "Consider crop rotation with legumes",
    ],
    status: "reviewed",
  },
];

// ─── Loans ────────────────────────────────────────────────────
export const mockLoans: Loan[] = [
  {
    id: "l1",
    farmerId: "u1",
    provider: "ACLEDA Bank",
    amount: 5000,
    interestRate: 8.5,
    tenure: 24,
    status: "disbursed",
    emiAmount: 228,
    appliedAt: "2025-11-10",
    purpose: "Purchase farming equipment",
  },
  {
    id: "l2",
    farmerId: "u1",
    provider: "AMK Microfinance",
    amount: 2000,
    interestRate: 12,
    tenure: 12,
    status: "repaying",
    emiAmount: 183,
    appliedAt: "2026-01-05",
    purpose: "Buy seeds and fertilizers",
  },
];

export const mockLoanProviders: LoanProvider[] = [
  {
    id: "lp1",
    name: "ACLEDA Bank",
    logo: "/logos/acleda.png",
    interestRange: "7.5% - 12%",
    maxAmount: 50000,
    features: ["No collateral up to $5000", "Flexible repayment", "Crop insurance included"],
    rating: 4.5,
  },
  {
    id: "lp2",
    name: "AMK Microfinance",
    logo: "/logos/amk.png",
    interestRange: "10% - 15%",
    maxAmount: 20000,
    features: ["Quick approval", "Mobile banking", "Group lending"],
    rating: 4.2,
  },
  {
    id: "lp3",
    name: "Hattha Bank",
    logo: "/logos/hattha.png",
    interestRange: "8% - 14%",
    maxAmount: 30000,
    features: ["Agricultural specialist advisors", "Seasonal payment plans", "Low documentation"],
    rating: 4.3,
  },
  {
    id: "lp4",
    name: "PRASAC MFI",
    logo: "/logos/prasac.png",
    interestRange: "9% - 13%",
    maxAmount: 25000,
    features: ["Rural branch network", "Farm visit assessment", "Grace period available"],
    rating: 4.1,
  },
];

// ─── Products ─────────────────────────────────────────────────
export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Jasmine Rice Seeds (IR504)",
    description: "Premium jasmine rice seeds with high yield potential. Disease resistant variety.",
    price: 45,
    unit: "kg",
    category: "seeds",
    image: "/products/rice-seeds.jpg",
    seller: { id: "s1", name: "Green Farm Supplies", rating: 4.7, location: "Battambang" },
    stock: 500,
    rating: 4.6,
    reviews: 128,
  },
  {
    id: "p2",
    name: "NPK Fertilizer 15-15-15",
    description: "Balanced NPK compound fertilizer for all crop types. 50kg bag.",
    price: 32,
    unit: "bag",
    category: "fertilizers",
    image: "/products/npk-fertilizer.jpg",
    seller: { id: "s2", name: "AgriChem Cambodia", rating: 4.5, location: "Phnom Penh" },
    stock: 1200,
    rating: 4.4,
    reviews: 256,
  },
  {
    id: "p3",
    name: "Hand Tractor (12HP)",
    description: "Diesel-powered hand tractor suitable for small to medium farms. Includes plow attachment.",
    price: 1200,
    unit: "unit",
    category: "equipment",
    image: "/products/hand-tractor.jpg",
    seller: { id: "s3", name: "Farm Machinery Co.", rating: 4.8, location: "Siem Reap" },
    stock: 15,
    rating: 4.7,
    reviews: 42,
  },
  {
    id: "p4",
    name: "Organic Pesticide Spray",
    description: "Neem-based organic pesticide. Safe for crops and environment. 5L container.",
    price: 18,
    unit: "bottle",
    category: "pesticides",
    image: "/products/pesticide.jpg",
    seller: { id: "s4", name: "EcoFarm Products", rating: 4.3, location: "Kampong Cham" },
    stock: 800,
    rating: 4.2,
    reviews: 89,
  },
  {
    id: "p5",
    name: "Cassava Stems (KU50)",
    description: "High-starch cassava variety stems for planting. Bundle of 100 stems.",
    price: 25,
    unit: "bundle",
    category: "seeds",
    image: "/products/cassava-stems.jpg",
    seller: { id: "s1", name: "Green Farm Supplies", rating: 4.7, location: "Battambang" },
    stock: 300,
    rating: 4.5,
    reviews: 67,
  },
  {
    id: "p6",
    name: "Drip Irrigation Kit",
    description: "Complete drip irrigation system for 1-acre farm. Includes timer and filters.",
    price: 350,
    unit: "set",
    category: "equipment",
    image: "/products/irrigation-kit.jpg",
    seller: { id: "s3", name: "Farm Machinery Co.", rating: 4.8, location: "Siem Reap" },
    stock: 25,
    rating: 4.8,
    reviews: 34,
  },
];

// ─── Market Prices ────────────────────────────────────────────
export const mockMarketPrices: MarketPrice[] = [
  { id: "mp1", crop: "Rice (Jasmine)", variety: "Phka Rumduol", market: "Battambang", minPrice: 320, maxPrice: 380, modalPrice: 350, date: "2026-03-08", trend: "up", changePercent: 5.2 },
  { id: "mp2", crop: "Cassava", variety: "KU50", market: "Phnom Penh", minPrice: 85, maxPrice: 110, modalPrice: 95, date: "2026-03-08", trend: "up", changePercent: 12.1 },
  { id: "mp3", crop: "Mango", variety: "Keo Romeat", market: "Siem Reap", minPrice: 1200, maxPrice: 1500, modalPrice: 1350, date: "2026-03-08", trend: "stable", changePercent: 0.5 },
  { id: "mp4", crop: "Corn", variety: "Hybrid DK9919", market: "Kampong Cham", minPrice: 180, maxPrice: 220, modalPrice: 200, date: "2026-03-08", trend: "down", changePercent: -3.8 },
  { id: "mp5", crop: "Black Pepper", variety: "Kampot Pepper", market: "Kampot", minPrice: 8500, maxPrice: 12000, modalPrice: 10000, date: "2026-03-08", trend: "up", changePercent: 8.3 },
];

// ─── Orders ───────────────────────────────────────────────────
export const mockOrders: Order[] = [
  { id: "o1", productId: "p2", productName: "NPK Fertilizer 15-15-15", quantity: 10, totalAmount: 320, status: "shipped", placedAt: "2026-03-05", deliveryDate: "2026-03-10" },
  { id: "o2", productId: "p1", productName: "Jasmine Rice Seeds (IR504)", quantity: 20, totalAmount: 900, status: "delivered", placedAt: "2026-02-28", deliveryDate: "2026-03-04" },
  { id: "o3", productId: "p4", productName: "Organic Pesticide Spray", quantity: 5, totalAmount: 90, status: "confirmed", placedAt: "2026-03-07" },
];

// ─── Chat Conversations ──────────────────────────────────────
export const mockConversations: ChatConversation[] = [
  {
    id: "c1",
    title: "Rice blast treatment",
    createdAt: "2026-03-07",
    updatedAt: "2026-03-07",
    messages: [
      { id: "m1", role: "user", content: "My rice plants have brown spots on the leaves. What could it be?", timestamp: "2026-03-07T08:30:00Z" },
      { id: "m2", role: "assistant", content: "Based on your description, this sounds like it could be **Rice Blast** (caused by the fungus *Magnaporthe oryzae*). Brown spots on leaves are a classic symptom.\n\n**Recommended Actions:**\n1. 🧪 Apply tricyclazole fungicide at 0.6g/L water\n2. 🚿 Drain excess water from paddy fields\n3. 🌱 Reduce nitrogen fertilizer application\n4. 🔄 Increase spacing between plants for air circulation\n\nWould you like me to help you find the nearest supplier for fungicide?", timestamp: "2026-03-07T08:30:15Z" },
    ],
  },
  {
    id: "c2",
    title: "Best time to plant cassava",
    createdAt: "2026-03-05",
    updatedAt: "2026-03-05",
    messages: [
      { id: "m3", role: "user", content: "When is the best season to plant cassava in Battambang province?", timestamp: "2026-03-05T10:00:00Z" },
      { id: "m4", role: "assistant", content: "For **Battambang province**, the optimal planting window for cassava is:\n\n🗓️ **Early wet season: April to June**\n\nThis allows the crop to establish during the rainy season and mature during the dry season.\n\n**Key Tips:**\n- Plant stem cuttings 20-30cm long at 45° angle\n- Space rows 1m apart with 80cm between plants\n- KU50 variety is popular in your area\n- Harvest after 8-12 months\n\nShall I create a planting schedule for your farm?", timestamp: "2026-03-05T10:00:20Z" },
    ],
  },
  {
    id: "c3",
    title: "Mango pest control",
    createdAt: "2026-03-02",
    updatedAt: "2026-03-02",
    messages: [
      { id: "m5", role: "user", content: "I found small flies around my mango trees. How do I control fruit flies?", timestamp: "2026-03-02T14:00:00Z" },
      { id: "m6", role: "assistant", content: "You're likely dealing with **Oriental Fruit Flies** (*Bactrocera dorsalis*), very common in mango orchards in Cambodia.\n\n**Control Methods:**\n1. 🪤 **Methyl Eugenol Traps** - Hang 8-10 traps per hectare\n2. 🧴 **Protein Bait Spray** - Mix GF-120 with water, spray weekly\n3. 🛍️ **Fruit Bagging** - Cover individual fruits with paper bags\n4. 🧹 **Sanitation** - Remove fallen and damaged fruits daily\n5. 🌿 **Neem Oil Spray** - Organic option, spray every 10 days\n\nThe most effective approach combines traps + bagging for premium fruit quality.", timestamp: "2026-03-02T14:00:25Z" },
    ],
  },
];

// ─── Community Posts ──────────────────────────────────────────
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "cp1",
    author: { name: "Dara Pich", role: "Farmer", avatar: "" },
    content: "Just harvested 4.2 tonnes per hectare of Phka Rumduol rice! The new SRI method really works. Happy to share my experience with anyone interested. 🌾",
    likes: 45,
    comments: 12,
    createdAt: "2026-03-07T16:00:00Z",
    tags: ["rice", "harvest", "SRI"],
  },
  {
    id: "cp2",
    author: { name: "Channary Sok", role: "Agricultural Officer", avatar: "" },
    content: "Free soil testing available at the provincial agriculture office in Battambang this Saturday 9AM-4PM. Bring samples from at least 3 spots in your field. Results within 48 hours!",
    likes: 89,
    comments: 23,
    createdAt: "2026-03-06T09:00:00Z",
    tags: ["soil-testing", "battambang", "free"],
  },
  {
    id: "cp3",
    author: { name: "Sophal Meas", role: "Farmer", avatar: "" },
    content: "Warning: Seeing brown planthoppers in rice fields near Moung Russei. Monitor your paddies carefully and report to the local extension office if you spot them.",
    likes: 67,
    comments: 31,
    createdAt: "2026-03-05T11:30:00Z",
    tags: ["pest-alert", "rice", "battambang"],
  },
];

// ─── Suggested Questions ──────────────────────────────────────
export const suggestedQuestions = [
  "What is the best fertilizer for rice?",
  "How to prevent cassava mosaic disease?",
  "When should I harvest my mango crop?",
  "What are today's market prices for rice?",
  "How to improve soil health naturally?",
  "Best drought-resistant crop varieties?",
];
