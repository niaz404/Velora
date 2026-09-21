export const MOCK_CATEGORIES = [
  {
    _id: "cat_01",
    id: "cat_01",
    name: "Haute Couture & Outerwear",
    slug: "haute-couture",
    description: "Bespoke tailored outerwear, evening silhouettes, and artisanal wool coats.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    productCount: 4,
  },
  {
    _id: "cat_02",
    id: "cat_02",
    name: "Artisanal Knitwear",
    slug: "knitwear",
    description: "Handcrafted cashmere, merino cable-knits, and custom crochet masterpieces.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    productCount: 4,
  },
  {
    _id: "cat_03",
    id: "cat_03",
    name: "Leather Goods & Bags",
    slug: "leather-goods",
    description: "Hand-stitched saddle bags, minimalist leather totes, and luxury accessories.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    productCount: 3,
  },
  {
    _id: "cat_04",
    id: "cat_04",
    name: "Fine Jewelry & Accents",
    slug: "accessories",
    description: "Artisanal 18k gilded accents, signet rings, and hand-woven silk accessories.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    productCount: 3,
  },
  {
    _id: "cat_05",
    id: "cat_05",
    name: "Home Atelier & Ceramics",
    slug: "home-atelier",
    description: "Sculpted terracotta vessels, hand-poured soy candles, and boutique decor.",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
    productCount: 2,
  },
];

export const MOCK_PRODUCTS = [
  {
    _id: "prod_01",
    id: "prod_01",
    name: "Silk Velvet Evening Trench",
    slug: "silk-velvet-evening-trench",
    description: "An impeccably tailored velvet trench cut with structured shoulders and a cascading draped silhouette. Lined with mulberry silk for effortless movement.",
    price: 480.0,
    discountPrice: 390.0,
    category: "Haute Couture & Outerwear",
    categoryId: {
      _id: "cat_01",
      name: "Haute Couture & Outerwear",
      slug: "haute-couture"
    },
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 8,
    inStock: true,
    isFeatured: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Noir Black", "Champagne Gold", "Espresso"],
    rating: 4.9,
    totalSold: 42,
    createdAt: new Date("2026-02-15").toISOString(),
  },
  {
    _id: "prod_02",
    id: "prod_02",
    name: "Hand-Knitted Cashmere Cardigan",
    slug: "hand-knitted-cashmere-cardigan",
    description: "Artisanal chunky knit spun from 100% Mongolian organic cashmere with hand-carved horn buttons.",
    price: 320.0,
    discountPrice: 260.0,
    category: "Artisanal Knitwear",
    categoryId: {
      _id: "cat_02",
      name: "Artisanal Knitwear",
      slug: "knitwear"
    },
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 14,
    inStock: true,
    isFeatured: true,
    sizes: ["S", "M", "L"],
    colors: ["Oatmeal Beige", "Cream White", "Heather Grey"],
    rating: 5.0,
    totalSold: 67,
    createdAt: new Date("2026-02-18").toISOString(),
  },
  {
    _id: "prod_03",
    id: "prod_03",
    name: "Bespoke Structured Saddle Bag",
    slug: "bespoke-structured-saddle-bag",
    description: "Hand-stitched full grain vegetable tanned leather with brushed antique brass hardware and custom monogram tag.",
    price: 540.0,
    discountPrice: 480.0,
    category: "Leather Goods & Bags",
    categoryId: {
      _id: "cat_03",
      name: "Leather Goods & Bags",
      slug: "leather-goods"
    },
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 5,
    inStock: true,
    isFeatured: true,
    sizes: ["Standard Medium"],
    colors: ["Caramel Tan", "Midnight Noir", "Forest Green"],
    rating: 4.8,
    totalSold: 89,
    createdAt: new Date("2026-02-20").toISOString(),
  },
  {
    _id: "prod_04",
    id: "prod_04",
    name: "Merino Wool Cable-Knit Sweater",
    slug: "merino-wool-cable-knit-sweater",
    description: "Substantial heavyweight merino knit inspired by historic coastal fisherman wear. Warm, breathable, and timeless.",
    price: 280.0,
    discountPrice: null,
    category: "Artisanal Knitwear",
    categoryId: {
      _id: "cat_02",
      name: "Artisanal Knitwear",
      slug: "knitwear"
    },
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 18,
    inStock: true,
    isFeatured: false,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ecru", "Navy", "Olive"],
    rating: 4.7,
    totalSold: 34,
    createdAt: new Date("2026-02-22").toISOString(),
  },
  {
    _id: "prod_05",
    id: "prod_05",
    name: "Handcrafted 18k Gilded Signet Ring",
    slug: "handcrafted-18k-gilded-signet-ring",
    description: "Solid sterling silver coated in heavy 18-karat yellow gold vermeil with subtle satin brush finish.",
    price: 195.0,
    discountPrice: 165.0,
    category: "Fine Jewelry & Accents",
    categoryId: {
      _id: "cat_04",
      name: "Fine Jewelry & Accents",
      slug: "accessories"
    },
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 22,
    inStock: true,
    isFeatured: true,
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Yellow Gold", "White Rhodium"],
    rating: 4.9,
    totalSold: 110,
    createdAt: new Date("2026-02-25").toISOString(),
  },
  {
    _id: "prod_06",
    id: "prod_06",
    name: "Double-Breasted Wool Overcoat",
    slug: "double-breasted-wool-overcoat",
    description: "Architectural structured coat crafted from 100% virgin wool. Sharp peak lapels and tailored interior welt pockets.",
    price: 590.0,
    discountPrice: 510.0,
    category: "Haute Couture & Outerwear",
    categoryId: {
      _id: "cat_01",
      name: "Haute Couture & Outerwear",
      slug: "haute-couture"
    },
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 4,
    inStock: true,
    isFeatured: true,
    sizes: ["38R", "40R", "42R", "44R"],
    colors: ["Charcoal Grey", "Camel", "Black"],
    rating: 5.0,
    totalSold: 28,
    createdAt: new Date("2026-03-01").toISOString(),
  },
  {
    _id: "prod_07",
    id: "prod_07",
    name: "Sculpted Terracotta Atelier Vase",
    slug: "sculpted-terracotta-atelier-vase",
    description: "Hand-thrown earthen vessel fired in an artisan wood kiln with raw tactile matte texture.",
    price: 140.0,
    discountPrice: null,
    category: "Home Atelier & Ceramics",
    categoryId: {
      _id: "cat_05",
      name: "Home Atelier & Ceramics",
      slug: "home-atelier"
    },
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 12,
    inStock: true,
    isFeatured: false,
    sizes: ["Large (30cm)"],
    colors: ["Raw Sienna", "Chalk White"],
    rating: 4.6,
    totalSold: 19,
    createdAt: new Date("2026-03-02").toISOString(),
  },
  {
    _id: "prod_08",
    id: "prod_08",
    name: "Hand-Woven Silk Jacquard Scarf",
    slug: "hand-woven-silk-jacquard-scarf",
    description: "100% hand-rolled twill silk printed with intricate architectural geometry inspired by antique European palaces.",
    price: 175.0,
    discountPrice: null,
    category: "Fine Jewelry & Accents",
    categoryId: {
      _id: "cat_04",
      name: "Fine Jewelry & Accents",
      slug: "accessories"
    },
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 19,
    inStock: true,
    isFeatured: false,
    sizes: ["90cm x 90cm"],
    colors: ["Bronze & Teal", "Burgundy Gold"],
    rating: 4.8,
    totalSold: 45,
    createdAt: new Date("2026-03-05").toISOString(),
  }
];

export const MOCK_ORDERS = [
  {
    _id: "ord_9842a1",
    totalPrice: 780.0,
    status: "shipped",
    paymentMethod: "Card (Stripe)",
    isPaid: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    shippingAddress: {
      fullName: "Genevieve Vance",
      address: "742 Evergreen Terr.",
      city: "Beverly Hills",
      postalCode: "90210",
      phone: "+1 (310) 555-0192",
    },
    user: {
      name: "Genevieve Vance",
      email: "genevieve.vance@example.com",
    },
    items: [
      {
        name: "Silk Velvet Evening Trench",
        quantity: 1,
        price: 390.0,
        size: "M",
        color: "Noir Black"
      },
      {
        name: "Silk Velvet Evening Trench",
        quantity: 1,
        price: 390.0,
        size: "S",
        color: "Champagne Gold"
      }
    ]
  },
  {
    _id: "ord_8721b4",
    totalPrice: 1020.0,
    status: "delivered",
    paymentMethod: "Apple Pay",
    isPaid: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    shippingAddress: {
      fullName: "Julian Sterling",
      address: "120 Madison Ave, Penthouse B",
      city: "New York",
      postalCode: "10016",
      phone: "+1 (212) 555-8392",
    },
    user: {
      name: "Julian Sterling",
      email: "julian.sterling@atelier.com",
    },
    items: [
      {
        name: "Bespoke Structured Saddle Bag",
        quantity: 1,
        price: 480.0,
        size: "Standard",
        color: "Caramel Tan"
      },
      {
        name: "Double-Breasted Wool Overcoat",
        quantity: 1,
        price: 540.0,
        size: "42R",
        color: "Camel"
      }
    ]
  },
  {
    _id: "ord_7634c9",
    totalPrice: 390.0,
    status: "processing",
    paymentMethod: "Card (Visa)",
    isPaid: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    shippingAddress: {
      fullName: "Elena Rostova",
      address: "44 Kensington Church St",
      city: "London",
      postalCode: "W8 4DB",
      phone: "+44 20 7946 0912",
    },
    user: {
      name: "Elena Rostova",
      email: "elena.rostova@luxury.co.uk",
    },
    items: [
      {
        name: "Silk Velvet Evening Trench",
        quantity: 1,
        price: 390.0,
        size: "S",
        color: "Noir Black"
      }
    ]
  },
  {
    _id: "ord_6529d2",
    totalPrice: 540.0,
    status: "confirmed",
    paymentMethod: "COD",
    isPaid: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    shippingAddress: {
      fullName: "Marcus Dupont",
      address: "18 Rue du Faubourg Saint-Honoré",
      city: "Paris",
      postalCode: "75008",
      phone: "+33 1 42 68 00 00",
    },
    user: {
      name: "Marcus Dupont",
      email: "marcus.dupont@paris.fr",
    },
    items: [
      {
        name: "Hand-Knitted Cashmere Cardigan",
        quantity: 1,
        price: 260.0,
        size: "L",
        color: "Oatmeal Beige"
      },
      {
        name: "Merino Wool Cable-Knit Sweater",
        quantity: 1,
        price: 280.0,
        size: "L",
        color: "Navy"
      }
    ]
  },
  {
    _id: "ord_5412e8",
    totalPrice: 260.0,
    status: "pending",
    paymentMethod: "COD",
    isPaid: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    shippingAddress: {
      fullName: "Clara Beaumont",
      address: "Bahnhofstrasse 28",
      city: "Zurich",
      postalCode: "8001",
      phone: "+41 44 211 00 00",
    },
    user: {
      name: "Clara Beaumont",
      email: "clara.beaumont@ch.com",
    },
    items: [
      {
        name: "Hand-Knitted Cashmere Cardigan",
        quantity: 1,
        price: 260.0,
        size: "M",
        color: "Cream White"
      }
    ]
  }
];

export const MOCK_USERS = [
  {
    _id: "usr_super_01",
    name: "Executive Director",
    email: "director@velora.luxury",
    role: "super_admin",
    createdAt: new Date("2026-01-01").toISOString()
  },
  {
    _id: "usr_admin_02",
    name: "Alexander Hayes (Store Admin)",
    email: "alexander@velora.luxury",
    role: "admin",
    createdAt: new Date("2026-01-10").toISOString()
  },
  {
    _id: "usr_seller_03",
    name: "Artisan Merchant Studio",
    email: "artisan.seller@velora.luxury",
    role: "seller",
    createdAt: new Date("2026-01-15").toISOString()
  },
  {
    _id: "usr_support_04",
    name: "Concierge & Client Care",
    email: "concierge@velora.luxury",
    role: "support",
    createdAt: new Date("2026-01-20").toISOString()
  },
  {
    _id: "usr_cust_05",
    name: "Genevieve Vance",
    email: "genevieve.vance@example.com",
    role: "customer",
    createdAt: new Date("2026-02-01").toISOString()
  },
  {
    _id: "usr_cust_06",
    name: "Julian Sterling",
    email: "julian.sterling@atelier.com",
    role: "customer",
    createdAt: new Date("2026-02-05").toISOString()
  }
];
