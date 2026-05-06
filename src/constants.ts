import { Product, Customer, Order, JournalPost } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "numina-midnight",
    name: "Midnight Amethyst",
    subtitle: "The depth of the unseen",
    description: "A mysterious blend of deep purple florals and dark woods. Evokes the atmosphere of a clandestine evening garden.",
    price: 185,
    sku: "NM-MID-100",
    stock: 45,
    category: "Woody Floral",
    images: ["https://picsum.photos/seed/numina1/800/800"],
    variants: [
      { id: "v1", size: "30ml", price: 85, stock: 20, sku: "NM-MID-30" },
      { id: "v2", size: "50ml", price: 125, stock: 15, sku: "NM-MID-50" },
      { id: "v3", size: "100ml", price: 185, stock: 10, sku: "NM-MID-100" },
    ],
    scentFamily: ["Woody", "Floral", "Mysterious"],
    pyramidNotes: {
      top: ["Blackberry", "Saffron"],
      mid: ["Night-blooming Jasmine", "Damask Rose"],
      base: ["Oud", "Patchouli", "Sandalwood"],
    },
    subscriptionEnabled: true,
    engravingEnabled: true,
    tags: ["bestseller", "unisex"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "numina-rose",
    name: "Vintage Rose",
    subtitle: "A timeless memory",
    description: "A dusty, sun-drenched rose that feels both nostalgic and modern. Like an old letter found in a cedar chest.",
    price: 165,
    sku: "NM-ROSE-100",
    stock: 32,
    category: "Floral",
    images: ["https://picsum.photos/seed/numina2/800/800"],
    variants: [
      { id: "v1", size: "30ml", price: 75, stock: 12, sku: "NM-ROSE-30" },
      { id: "v2", size: "50ml", price: 115, stock: 10, sku: "NM-ROSE-50" },
      { id: "v3", size: "100ml", price: 165, stock: 10, sku: "NM-ROSE-100" },
    ],
    scentFamily: ["Floral", "Nostalgic"],
    pyramidNotes: {
      top: ["Bergamot", "Pink Pepper"],
      mid: ["Grasse Rose", "Geranium"],
      base: ["Cedarwood", "Amber", "White Musk"],
    },
    subscriptionEnabled: true,
    engravingEnabled: true,
    tags: ["new"],
    createdAt: new Date().toISOString(),
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "Eleanor Vance",
    email: "eleanor@example.com",
    loyaltyPoints: 450,
    tier: "Gold",
    orderCount: 4,
    totalSpent: 740,
    createdAt: "2024-01-15T10:00:00Z",
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-1001",
    customerId: "c1",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor@example.com",
    items: [
      {
        productId: "numina-midnight",
        productName: "Midnight Amethyst",
        variantId: "v3",
        size: "100ml",
        price: 185,
        quantity: 1,
        engravingText: "E.V.",
      }
    ],
    total: 185,
    status: "delivered",
    shippingAddress: {
      street: "123 Hill House Rd",
      city: "Shirley",
      state: "MA",
      zip: "01464",
      country: "USA",
    },
    createdAt: "2024-03-20T14:30:00Z",
  }
];

export const MOCK_POSTS: JournalPost[] = [
  {
    id: "p1",
    title: "The Alchemy of Night: Sourcing Our Oud",
    author: "Atelier Numina",
    content: "Deep in the forests of Southeast Asia, we found a resin so rare...",
    excerpt: "Discover the journey of our signature Oud note, from the forest floor to the Midnight Amethyst bottle.",
    coverImage: "https://picsum.photos/seed/journal1/1200/600",
    publishDate: "2024-03-01T08:00:00Z",
    tags: ["Behind the Scenes", "Ingredients"],
    status: "published",
  }
];
