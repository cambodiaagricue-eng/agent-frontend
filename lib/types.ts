export interface User {
  id: string;
  username?: string;
  name?: string;
  email?: string;
  phone: string;
  role:
    | "farmer"
    | "agent"
    | "admin"
    | "superadmin"
    | "buyer"
    | "seller"
    | "officer"
    | "vendor"
    | "loan_provider";
  memberQrCode?: string;
  onboardingCompleted?: boolean;
  joinedAt: string;
  avatar?: string;
  farmSize?: number;
  location?: string;
  crops?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface SoilReport {
  id: string;
  farmerId: string;
  date: string;
  location: string;
  healthScore: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  organicMatter: number;
  moisture: number;
  recommendations: string[];
  status: "pending" | "analyzed" | "reviewed";
}

export interface Loan {
  id: string;
  farmerId: string;
  provider: string;
  amount: number;
  interestRate: number;
  tenure: number;
  status: "pending" | "approved" | "disbursed" | "rejected" | "repaying" | "completed";
  emiAmount: number;
  appliedAt: string;
  purpose: string;
}

export interface LoanProvider {
  id: string;
  name: string;
  logo: string;
  interestRange: string;
  maxAmount: number;
  features: string[];
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: "seeds" | "fertilizers" | "equipment" | "pesticides" | "crops";
  image: string;
  seller: {
    id: string;
    name: string;
    rating: number;
    location: string;
  };
  stock: number;
  rating: number;
  reviews: number;
}

export interface MarketPrice {
  id: string;
  crop: string;
  variety: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  date: string;
  trend: "up" | "down" | "stable";
  changePercent: number;
}

export interface PublicCoinPrice {
  name: string;
  symbol: string;
  priceUsd: number;
  changePercent: number;
  logoUrl?: string;
}

export interface PublicMemberProfile {
  memberQrCode: string;
  username: string;
  fullName: string | null;
  role: string;
  phoneMasked: string | null;
  address: string | null;
  gender: string | null;
  age: number | null;
  onboardingCompleted: boolean;
  joinedAt: string | null;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";
  placedAt: string;
  deliveryDate?: string;
}

export interface WeatherData {
  locationLabel: string;
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
  }>;
}

export interface CropAlert {
  id: string;
  type: "disease" | "pest" | "weather" | "market";
  severity: "low" | "medium" | "high";
  title: string;
  description: string;
  crop: string;
  date: string;
}

export interface DashboardStats {
  totalFarmArea: number;
  activeCrops: number;
  soilHealth: number;
  pendingLoans: number;
  marketListings: number;
  weatherAlerts: number;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
}
