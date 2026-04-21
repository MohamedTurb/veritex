const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
    description: "Immersive sound quality with active noise cancellation. 30-hour battery life, comfortable over-ear design, and premium build quality. Perfect for music lovers and professionals alike.",
    rating: 4.8,
    reviews: 324,
    badge: "Best Seller"
  },
  {
    id: 2,
    title: "Minimalist Leather Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Accessories",
    description: "Handcrafted Italian leather strap with a Swiss-inspired movement. Water-resistant to 50m, sapphire crystal glass, and a timeless minimalist dial design.",
    rating: 4.9,
    reviews: 189,
    badge: "Premium"
  },
  {
    id: 3,
    title: "Ergonomic Office Chair",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80",
    category: "Furniture",
    description: "Lumbar support, adjustable armrests, and breathable mesh back. Designed for all-day comfort with 5-year warranty. Perfect for home office setups.",
    rating: 4.7,
    reviews: 512,
    badge: "Top Rated"
  },
  {
    id: 4,
    title: "Ultralight Running Shoes",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    category: "Fashion",
    description: "Carbon fiber plate technology with reactive foam cushioning. Engineered mesh upper for breathability and a snug, sock-like fit. Race-day performance.",
    rating: 4.6,
    reviews: 743,
    badge: null
  },
  {
    id: 5,
    title: "Smart Home Hub",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    category: "Electronics",
    description: "Control all your smart devices from one central hub. Compatible with Alexa, Google Assistant, and Apple HomeKit. Simple setup, powerful automation.",
    rating: 4.5,
    reviews: 298,
    badge: "New"
  },
  {
    id: 6,
    title: "Ceramic Coffee Mug Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80",
    category: "Home & Kitchen",
    description: "Set of 4 handcrafted ceramic mugs in muted earth tones. Microwave and dishwasher safe. Each piece is unique with subtle glaze variations.",
    rating: 4.8,
    reviews: 156,
    badge: null
  },
  {
    id: 7,
    title: "Professional Camera Bag",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80",
    category: "Accessories",
    description: "Weather-resistant nylon with padded compartments for DSLR body, 3 lenses, and accessories. Laptop sleeve fits up to 15\". Comfortable carry all day.",
    rating: 4.7,
    reviews: 221,
    badge: null
  },
  {
    id: 8,
    title: "Bamboo Standing Desk",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80",
    category: "Furniture",
    description: "Electric height adjustment from 27\" to 47\". Sustainable bamboo surface, dual motor for quiet operation, and programmable height presets.",
    rating: 4.9,
    reviews: 87,
    badge: "Premium"
  },
  {
    id: 9,
    title: "Noise-Canceling Earbuds",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    category: "Electronics",
    description: "True wireless earbuds with 8-hour battery and 24-hour charging case. IPX5 water resistance, touch controls, and crystal-clear call quality.",
    rating: 4.5,
    reviews: 892,
    badge: "Sale"
  },
  {
    id: 10,
    title: "Linen Throw Blanket",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
    category: "Home & Kitchen",
    description: "100% French linen, pre-washed for softness. Breathable in summer, warm in winter. Available in 6 natural tones. 140x180cm.",
    rating: 4.8,
    reviews: 341,
    badge: null
  },
  {
    id: 11,
    title: "Leather Wallet",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    category: "Accessories",
    description: "Slim bifold design in full-grain leather. RFID blocking technology, 6 card slots, and a pull-tab for easy access. Develops beautiful patina over time.",
    rating: 4.7,
    reviews: 567,
    badge: null
  },
  {
    id: 12,
    title: "Mechanical Keyboard",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1558618047-3c9e4c5dbeff?w=500&q=80",
    category: "Electronics",
    description: "TKL layout with Cherry MX Brown switches. RGB per-key lighting, hot-swappable PCB, and PBT doubleshot keycaps. USB-C and Bluetooth 5.0.",
    rating: 4.9,
    reviews: 445,
    badge: "Best Seller"
  },
  {
    id: 13,
    title: "Yoga Mat Premium",
    price: 68.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
    category: "Sports",
    description: "6mm thick natural rubber base with microfiber top layer. Non-slip in wet and dry conditions. Alignment lines, carrying strap included.",
    rating: 4.6,
    reviews: 289,
    badge: null
  },
  {
    id: 14,
    title: "Pour-Over Coffee Set",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
    category: "Home & Kitchen",
    description: "Borosilicate glass server with wooden collar, stainless steel dripper, and 40 filters included. Brews 600ml. Minimal, beautiful design.",
    rating: 4.8,
    reviews: 178,
    badge: "New"
  },
  {
    id: 15,
    title: "Merino Wool Sweater",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80",
    category: "Fashion",
    description: "100% extra-fine merino wool. Naturally temperature-regulating, odor-resistant, and machine washable. Classic crewneck silhouette in 8 colors.",
    rating: 4.7,
    reviews: 412,
    badge: null
  },
  {
    id: 16,
    title: "Wireless Charging Pad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&q=80",
    category: "Electronics",
    description: "15W fast wireless charging for Qi-compatible devices. Ultra-slim 5mm profile, LED indicator, and anti-slip base. Works through phone cases up to 5mm.",
    rating: 4.4,
    reviews: 634,
    badge: "Sale"
  },
];

export default products;
