"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Filter, Star, Heart, Plus } from "lucide-react"

const productCategories = [
  { id: "all", label: "All Products", count: 24 },
  { id: "hair-care", label: "Hair Care", count: 8 },
  { id: "extensions", label: "Extensions & Wigs", count: 6 },
  { id: "styling", label: "Styling Tools", count: 4 },
  { id: "oils", label: "Natural Oils", count: 3 },
  { id: "accessories", label: "Accessories", count: 3 },
]

const products = [
  {
    id: 1,
    name: "Premium Argan Oil Shampoo",
    category: "hair-care",
    price: 8500,
    originalPrice: 10000,
    rating: 4.8,
    reviews: 124,
    image: "/shop-argan-oil-shampoo.png",
    inStock: true,
    bestseller: true,
    description: "Nourishing shampoo with pure Moroccan argan oil for damaged hair",
  },
  {
    id: 2,
    name: "Brazilian Virgin Hair Bundle",
    category: "extensions",
    price: 45000,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: "/shop-brazilian-virgin-hair.png",
    inStock: true,
    bestseller: true,
    description: "100% virgin Brazilian hair, 18-inch straight bundle",
  },
  {
    id: 3,
    name: "Professional Hair Dryer",
    category: "styling",
    price: 25000,
    originalPrice: 30000,
    rating: 4.7,
    reviews: 67,
    image: "/shop-professional-hair-dryer.png",
    inStock: true,
    bestseller: false,
    description: "Ionic hair dryer with multiple heat settings and cool shot",
  },
  {
    id: 4,
    name: "Coconut Hair Growth Oil",
    category: "oils",
    price: 6500,
    originalPrice: null,
    rating: 4.6,
    reviews: 156,
    image: "/shop-coconut-hair-oil.png",
    inStock: true,
    bestseller: true,
    description: "Pure coconut oil blend for hair growth and scalp health",
  },
  {
    id: 5,
    name: "Silk Hair Bonnet",
    category: "accessories",
    price: 3500,
    originalPrice: 4000,
    rating: 4.5,
    reviews: 203,
    image: "/shop-silk-hair-bonnet.png",
    inStock: true,
    bestseller: false,
    description: "Premium silk bonnet to protect hair while sleeping",
  },
  {
    id: 6,
    name: "Deep Conditioning Mask",
    category: "hair-care",
    price: 12000,
    originalPrice: null,
    rating: 4.8,
    reviews: 98,
    image: "/shop-deep-conditioning-mask.png",
    inStock: true,
    bestseller: false,
    description: "Intensive repair mask for dry and damaged hair",
  },
  {
    id: 7,
    name: "Lace Front Wig - Curly",
    category: "extensions",
    price: 65000,
    originalPrice: 75000,
    rating: 4.9,
    reviews: 45,
    image: "/shop-lace-front-curly-wig.png",
    inStock: true,
    bestseller: true,
    description: "Natural-looking lace front wig with beautiful curls",
  },
  {
    id: 8,
    name: "Ceramic Flat Iron",
    category: "styling",
    price: 18000,
    originalPrice: null,
    rating: 4.6,
    reviews: 78,
    image: "/shop-ceramic-flat-iron.png",
    inStock: false,
    bestseller: false,
    description: "Professional ceramic flat iron for smooth, sleek styles",
  },
  {
    id: 9,
    name: "Jojoba Hair Serum",
    category: "oils",
    price: 7500,
    originalPrice: null,
    rating: 4.7,
    reviews: 112,
    image: "/shop-jojoba-hair-serum.png",
    inStock: true,
    bestseller: false,
    description: "Lightweight jojoba serum for shine and frizz control",
  },
  {
    id: 10,
    name: "Wide Tooth Comb Set",
    category: "accessories",
    price: 2500,
    originalPrice: null,
    rating: 4.4,
    reviews: 167,
    image: "/shop-wide-tooth-comb-set.png",
    inStock: true,
    bestseller: false,
    description: "Gentle wide tooth combs for detangling wet hair",
  },
  {
    id: 11,
    name: "Sulfate-Free Conditioner",
    category: "hair-care",
    price: 7500,
    originalPrice: 9000,
    rating: 4.5,
    reviews: 134,
    image: "/shop-sulfate-free-conditioner.png",
    inStock: true,
    bestseller: false,
    description: "Gentle sulfate-free conditioner for color-treated hair",
  },
  {
    id: 12,
    name: "Kinky Curly Hair Extensions",
    category: "extensions",
    price: 35000,
    originalPrice: null,
    rating: 4.8,
    reviews: 67,
    image: "/shop-kinky-curly-extensions.png",
    inStock: true,
    bestseller: false,
    description: "Natural kinky curly hair extensions, 16-inch length",
  },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({})

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (productId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Beauty <span className="text-accent">Shop</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Premium hair care products, extensions, and styling tools curated by our experts
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter & Cart */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {productCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className={
                    activeCategory === category.id
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "hover:bg-accent/10 hover:text-accent"
                  }
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart ({getTotalCartItems()})
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.bestseller && (
                      <Badge className="bg-accent text-accent-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Bestseller
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge variant="destructive">
                        Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                    {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white text-foreground"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-accent">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product.id)}
                  >
                    {product.inStock ? (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    ) : (
                      "Out of Stock"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">Find exactly what you need for your hair care routine</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Hair Care Essentials",
                image: "/shop-category-hair-care.png",
                count: "8 products",
                category: "hair-care",
              },
              {
                name: "Extensions & Wigs",
                image: "/shop-category-extensions.png",
                count: "6 products",
                category: "extensions",
              },
              {
                name: "Styling Tools",
                image: "/shop-category-styling-tools.png",
                count: "4 products",
                category: "styling",
              },
              {
                name: "Natural Oils",
                image: "/shop-category-natural-oils.png",
                count: "3 products",
                category: "oils",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
                onClick={() => setActiveCategory(category.category)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div className="text-white">
                      <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.count}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
