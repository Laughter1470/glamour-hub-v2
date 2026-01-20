// app/shop/page.tsx
"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Star,
  Heart,
  Package,
  Download,
  X,
} from "lucide-react"
import Image from "next/image"

const categories = ["All", "Hair Care", "Extensions & Wigs", "Styling Tools", "Natural Oils", "Accessories"]
const products = [
  { id: 1, name: "Premium Argan Oil Shampoo", price: 8500, category: "Hair Care", rating: 4.8, reviews: 124, bestseller: true, desc: "Deeply nourishing shampoo infused with pure Moroccan argan oil. Repairs damaged hair, adds shine, and reduces frizz.", image: "/product/Premium argan oil shampoo.jpeg" },
  { id: 2, name: "Brazilian Virgin Hair Bundle", price: 45000, category: "Extensions & Wigs", rating: 4.9, reviews: 89, bestseller: true, desc: "100% unprocessed virgin Brazilian hair. Soft, full, and bouncy. Available in 16–26 inches.", image: "/product/Brazilian virgin hair bundle.jpeg" },
  { id: 3, name: "Professional Ionic Hair Dryer", price: 25000, category: "Styling Tools", rating: 4.7, reviews: 67, desc: "2000W professional dryer with ionic technology. Fast drying, frizz-free results, cool shot button.", image: "/product/professional ionic hair drying.jpeg" },
  { id: 4, name: "Coconut Hair Growth Oil", price: 6500, category: "Natural Oils", rating: 4.6, reviews: 156, bestseller: true, desc: "Cold-pressed coconut oil blend with rosemary & castor oil. Promotes growth and strengthens hair.", image: "/product/coconut hair growth oil.jpeg" },
  { id: 5, name: "Luxury Silk Bonnet", price: 3500, category: "Accessories", rating: 4.5, reviews: 203, desc: "100% mulberry silk bonnet with adjustable strap. Protects curls and prevents breakage overnight.", image: "/product/luxury silk bonnet.jpeg" },
  { id: 6, name: "Deep Conditioning Mask", price: 12000, category: "Hair Care", rating: 4.8, reviews: 98, desc: "Intensive repair treatment with keratin, argan oil, and shea butter. Restores dry, damaged hair.", image: "/product/deep conditional Mask.jpeg" },
  { id: 7, name: "HD Lace Front Wig - Body Wave", price: 75000, category: "Extensions & Wigs", rating: 4.9, reviews: 56, bestseller: true, desc: "Pre-plucked hairline, baby hairs, transparent lace. 180% density, 22-inch.", image: "/product/hd lace front wig body wave.jpeg" },
  { id: 8, name: "luxe Argan Restore Shampoo", price: 37000, category: "Hair Care", rating: 5.0, reviews: 26, desc: "This nourishing shampoo infused with premium Moroccan argan oil, keratin, and Dead Sea minerals deeply hydrates dry, damaged hair while smoothing frizz and restoring natural shine.", image: "/product/luxe argan restore shampoo.jpeg" },
]
const testimonials = [
  { name: "Chioma A.", text: "Best hair products in Abuja! My hair has never been healthier.", rating: 5 },
  { name: "Tolu M.", text: "The Brazilian bundle is so soft! Looks exactly like my natural hair.", rating: 5 },
  { name: "Adaeze O.", text: "Fast delivery and great customer service. Will definitely order again!", rating: 5 },
  { name: "Funmi K.", text: "The coconut growth oil actually works! My edges are back!", rating: 5 },
  { name: "Grace E.", text: "Premium quality at affordable prices. Highly recommend Glamour Hub!", rating: 5 },
  { name: "Ifeoma N.", text: "I loved the silk bonnet — my curls stayed perfect overnight. Excellent value!", rating: 5 },
  { name: "Kemi R.", text: "Quick support and smooth checkout. The HD lace wig exceeded my expectations.", rating: 5 },
]

const formatPrice = (price: number) => `₦${price.toLocaleString()}`

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 875)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className="fixed bottom-28 right-6 z-[60] p-5 bg-black text-white rounded-2xl shadow-2xl flex items-center gap-4 border border-accent/20">
      <p className="font-medium text-sm">{message}</p>
      <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 p-0 text-white hover:bg-white/10">
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Small image component that shows a placeholder while loading or on error using next/image
function ProductImage({ src, alt, className }: { src?: string | null; alt?: string; className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const srcPath = src ? (src.startsWith("/") ? src : `/${src}`) : null
  if (!srcPath || error) {
    return (
      <div className={`${className || ""} bg-muted/20 flex items-center justify-center`}>
        <div className="text-center">
          <Package className="h-12 w-12 text-muted-foreground/40 mx-auto" />
          <p className="text-xs text-muted-foreground mt-2">{srcPath || "no image"}</p>
        </div>
      </div>
    )
  }
  return (
    <div className={`${className || ""} relative bg-muted/20 flex items-center justify-center overflow-hidden`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="h-12 w-12 text-muted-foreground/40" />
        </div>
      )}
      <Image
        src={srcPath}
        alt={alt || ""}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoadingComplete={() => setLoaded(true)}
        onError={() => { console.error("Image failed to load:", srcPath); setError(true) }}
      />
    </div>
  )
}

function ReviewerAvatar({ name, src, size = 40 }: { name: string; src?: string | null; size?: number }) {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  if (src) {
    const srcPath = src.startsWith("/") ? src : `/${src}`
    return (
      <div style={{ width: size, height: size }} className="rounded-full overflow-hidden bg-muted/20">
        <Image src={srcPath} alt={name} width={size} height={size} className="object-cover" />
      </div>
    )
  }

  return (
    <div style={{ width: size, height: size }} className="rounded-full bg-accent/10 text-accent flex items-center justify-center font-medium">
      {initials}
    </div>
  )
}

export default function ShopPage() {
  const [cart, setCart] = useState<Record<number, { qty: number; product: any }>>({})
  const [favorites, setFavorites] = useState<number[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [fullName, setFullName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [receipt, setReceipt] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [checkoutStage, setCheckoutStage] = useState<'items' | 'details'>('items')
  const [isPaying, setIsPaying] = useState(false)  // Add this to prevent sheet closing during payment

  const cartItems = useMemo(() => Object.values(cart), [cart])
  const totalAmount = useMemo(() => cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0), [cartItems])
  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems])

  const filteredProducts = products.filter(
    (p) => (selectedCategory === "All" || p.category === selectedCategory) && p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToCart = (product: any) => {
    setCart(prev => ({ ...prev, [product.id]: { qty: (prev[product.id]?.qty || 0) + 1, product } }))
    setToastMessage(`Added ${product.name} to cart`)
    setIsCartOpen(true)
    setCheckoutStage('items')
  }

  const updateQty = (id: number, delta: number) => {
    setCart(prev => {
      const newQty = (prev[id]?.qty || 0) + delta
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev
        setToastMessage("Item removed from cart")
        return rest
      }
      return { ...prev, [id]: { ...prev[id], qty: newQty } }
    })
  }

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const isFav = prev.includes(id)
      setToastMessage(isFav ? "Removed from favorites" : "Added to favorites")
      return isFav ? prev.filter(p => p !== id) : [...prev, id]
    })
  }

  const generateReceipt = useCallback(() => {
    const receiptText = `
GLAMOUR HUB • OFFICIAL RECEIPT
Thank you for shopping with us!
Order Date: ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}
Items Purchased:
${cartItems.map(i => `• ${i.product.name} × ${i.qty} = ₦${(i.product.price * i.qty).toLocaleString()}`).join("\n")}
━━━━━━━━━━━━━━━━━━━━━━
TOTAL PAID: ₦${totalAmount.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━
Customer: ${email || "Guest"}
Reference: GH_${Date.now()}
Delivery: Nationwide • Pickup Available
Location: Opposite Holy Trinity Church, Maitama, Abuja
We appreciate your trust in Glamour Hub
@glamourhub_ng • 0703 511 8531
www.glamourhub.ng
    Customer: ${fullName || email || "Guest"} (${phone || "n/a"})
  Address: ${deliveryMethod === 'delivery' ? (address || 'n/a') : 'Pickup / Store Collection'}
  Delivery Method: ${deliveryMethod}
    `.trim()
    setReceipt(receiptText)
  }, [cartItems, totalAmount, email, fullName, phone, address, deliveryMethod])

 useEffect(() => {
  if (typeof window === "undefined") return;

  // Already loaded? Skip
  if (document.querySelector('script[src="https://checkout.flutterwave.com/v3.js"]')) {
    console.log("Flutterwave script already loaded");
    return;
  }

  console.log("Loading Flutterwave script");

  const script = document.createElement("script");
  script.src = "https://checkout.flutterwave.com/v3.js";
  script.async = true;

  script.onload = () => {
    console.log("Flutterwave script loaded successfully");
    // Optional: You can trigger any post-load logic here if needed
  };

  script.onerror = () => {
    console.error("Failed to load Flutterwave script");
    // Optional: Show user error toast if critical
  };

  // Append to head (recommended for payment gateways)
  document.head.appendChild(script);

  // Cleanup: Remove script when component unmounts
  return () => {
    if (document.head.contains(script)) {
      document.head.removeChild(script);
      console.log("Flutterwave script cleaned up");
    }
  };
}, []);

  // Hide the global WhatsApp widget while this page is mounted
  useEffect(() => {
    if (typeof window === "undefined") return
    const el = document.getElementById("whatsapp-widget")
    const prevDisplay = el ? el.style.display : null
    if (el) el.style.display = "none"
    return () => {
      if (el) el.style.display = prevDisplay || ""
    }
  }, [])

 const payWithFlutterwave = () => {
  if (totalAmount === 0) return setToastMessage("Cart is empty")
  if (!fullName.trim()) return setToastMessage("Please enter your full name")
  const digits = phone.replace(/\D/g, "")
  if (digits.length < 7) return setToastMessage("Please enter a valid phone number")
  if (!email.includes("@")) return setToastMessage("Please enter a valid email")
  if (deliveryMethod === 'delivery' && !address.trim()) return setToastMessage("Please enter a delivery address or choose Pickup")

  console.log("Flutterwave payment initiated")
  setIsPaying(true)

  const FlutterwaveCheckout = (window as any).FlutterwaveCheckout
  if (!FlutterwaveCheckout) {
    console.error("FlutterwaveCheckout not available")
    setToastMessage("Payment gateway loading... please try again")
    setIsPaying(false)
    return
  }

  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-931e8f52850f908030f9b7f3ab81bc77-X", // ← YOUR REAL FLUTTERWAVE PUBLIC KEY
    tx_ref: `GH_${Date.now()}`,
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card, mobilemoney, ussd",
    redirect_url: window.location.origin + "/shop?payment=success", // optional redirect after payment
    customer: {
      email,
      phone_number: phone,
      name: fullName,
    },
    customizations: {
      title: "Glamour Hub Checkout",
      description: "Payment for cart items",
      logo: "https://your-logo-url.com/logo.png", // ← optional
    },
    meta: {
      address,
      deliveryMethod,
    },
callback: async (response: { status: string; tx_ref: string; transaction_id?: number; flw_ref?: string; customer?: { email?: string; name?: string; phone_number?: string } }) => {
  console.log("Flutterwave callback triggered:", response)

  if (response.status === "successful") {
    console.log("Payment successful, starting email process...")

    let emailSent = false
    try {
      const orderDetails = {
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        address: deliveryMethod === 'delivery' ? address : 'Pickup at store',
        items: cartItems.map(item => ({
          name: item.product.name,
          qty: item.qty,
          price: item.product.price,
          total: item.product.price * item.qty
        })),
        totalAmount,
        paymentRef: response.tx_ref,
        date: new Date().toLocaleString()
      }

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails)
      })

      if (res.ok) {
        emailSent = true
        console.log("Confirmation emails sent successfully")
      } else {
        console.error("Email API error:", res.status, await res.text())
      }
    } catch (err) {
      console.error("Email sending failed:", err)
    }

    generateReceipt()
    setCart({})
    setFullName("")
    setEmail("")
    setPhone("")
    setAddress("")
    setDeliveryMethod('delivery')
    setIsCartOpen(false)
    setCheckoutStage('items')
    setIsPaying(false)

    setToastMessage(emailSent 
      ? "Payment successful! Receipt & emails sent" 
      : "Payment successful! Receipt generated (email failed)")
  } else {
    setToastMessage("Payment failed. Please try again.")
  }
},
    onclose: () => {
      console.log("Flutterwave popup closed")
      setIsPaying(false)
      setToastMessage("Payment popup closed")
    }
  })
}

  const copyReceipt = () => {
    navigator.clipboard.writeText(receipt || "")
    setToastMessage("Receipt copied to clipboard")
  }

  // Add this function to test success logic without Paystack
  const testPaymentSuccess = async () => {
    console.log("🎉 TEST PAYMENT SUCCESSFUL!")
    console.log("Payment successful, starting email process...")
    
    // FEATURE 1: Send email to buyer & owner first
    let emailSent = false
    try {
      const orderDetails = {
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        address: deliveryMethod === 'delivery' ? address : 'Pickup at store',
        items: cartItems.map(item => ({
          name: item.product.name,
          qty: item.qty,
          price: item.product.price,
          total: item.product.price * item.qty
        })),
        totalAmount,
        paymentRef: `GH_TEST_${Date.now()}`,
        date: new Date().toLocaleString()
      }

      console.log("Sending email with details:", orderDetails)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails)
      })
      
      if (response.ok) {
        emailSent = true
        console.log("Confirmation emails sent successfully")
      } else {
        console.error("Email API returned error:", response.status, await response.text())
      }
    } catch (err) {
      console.error("Email sending failed:", err)
    }

    generateReceipt()
    console.log("Receipt generated")
    
    // FEATURE 2: Reset cart and form fields completely after success
    console.log("Resetting cart and form fields")
    setCart({})
    setFullName("")
    setEmail("")
    setPhone("")
    setAddress("")
    setDeliveryMethod('delivery')
    setIsCartOpen(false)
    setCheckoutStage('items')
    setIsPaying(false)
    
    const message = emailSent 
      ? "Payment successful! Receipt generated & emails sent"
      : "Payment successful! Receipt generated (email sending failed)"
    setToastMessage(message)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-accent/50 to-muted/50 py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Glamour Hub <span className="text-accent">Shop</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Premium hair extensions, products & tools — delivered nationwide
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative border-2 border-yellow-300/60 rounded-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 py-6 text-lg border-0 bg-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-8 bg-card border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "bg-accent hover:bg-accent/90 text-white" : "hover:border-accent hover:text-accent"}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
<section className="py-16 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <Card
          key={product.id}
          className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden flex flex-col bg-card rounded-2xl"
        >
          {/* Image Area – Bigger & Beautiful */}
          <div
            className="relative bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer h-64 sm:h-72 md:h-80 lg:h-96 flex-shrink-0 overflow-hidden"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.image || "https://via.placeholder.com/600x800.png?text=No+Image"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Bestseller Badge */}
            {product.bestseller && (
              <Badge className="absolute top-4 left-4 bg-accent text-white font-medium shadow-lg">
                Bestseller
              </Badge>
            )}

            {/* Favorite Button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(product.id)
              }}
              className="absolute top-4 right-4 bg-white/95 hover:bg-white backdrop-blur-sm shadow-xl border border-gray-200 rounded-full h-10 w-10"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  favorites.includes(product.id)
                    ? "fill-accent text-accent"
                    : "text-gray-600"
                }`}
              />
            </Button>
          </div>

          {/* Card Content */}
          <CardContent className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg line-clamp-2 mb-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {product.desc}
              </p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-muted"
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.reviews})
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold text-accent">
                {formatPrice(product.price)}
              </span>
              <Button
                onClick={() => addToCart(product)}
                className="bg-black hover:bg-gray-900 text-white rounded-xl"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-12 bg-muted/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Queens Say</h2>
          <div className="flex animate-scroll gap-8">
            {[...testimonials, ...testimonials].map((t, i) => (
              <Card key={`${t.name}-${i}`} className="min-w-[300px] p-4 bg-card shadow-xl border-l-4 border-accent h-36 flex flex-col justify-between">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-accent text-accent" />)}
                </div>
                <p className="text-muted-foreground italic text-sm leading-snug mb-2">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <ReviewerAvatar name={t.name} src={(t as any).avatar} />
                  <p className="font-bold text-sm">{t.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CART SIDEBAR */}
      <Sheet open={isCartOpen} onOpenChange={(open) => !isPaying && setIsCartOpen(open)}>  
        <SheetTrigger asChild>
          <Button className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-2xl bg-black hover:bg-gray-900 z-50">
            <ShoppingCart className="h-7 w-7" />
            {cartCount > 0 && <Badge className="absolute -top-2 -right-2 bg-accent text-white">{cartCount}</Badge>}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md bg-card flex flex-col h-full">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">Your Cart ({cartCount})</SheetTitle>
          </SheetHeader>
          {/* Cart Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <ShoppingCart className="h-10 w-10 mx-auto mb-4 text-muted-foreground"/>
                <p className="font-medium">Your cart is empty.</p>
                <p className="text-sm">Start adding some glamorous products!</p>
              </div>
            ) : (
              <>
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex gap-4 py-3 items-center bg-card p-4 rounded-xl shadow-sm border border-border">
                    <div className="flex-shrink-0">
                      <ProductImage src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg overflow-hidden" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-base line-clamp-2">{item.product.name}</h4>
                      <p className="text-accent font-bold text-sm">{formatPrice(item.product.price)}</p>
                    </div>
                    <div className="flex items-center gap-1 border border-border rounded-full p-0.5 shadow-sm">
                      <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:bg-accent/10" onClick={() => updateQty(item.product.id, -1)}><Minus className="h-3 w-3" /></Button>
                      <span className="w-5 text-center text-sm font-medium text-foreground">{item.qty}</span>
                      <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:bg-accent/10" onClick={() => updateQty(item.product.id, 1)}><Plus className="h-3 w-3" /></Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* Totals / Checkout - fixed at bottom */}
          <div className="p-4 border-t border-border bg-card max-h-[60vh] overflow-y-auto">
            {checkoutStage === 'items' ? (
              <div className="space-y-3">
                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span className="text-accent">{formatPrice(totalAmount)}</span>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-black hover:bg-gray-900 text-white py-3 text-base font-semibold" onClick={() => setCheckoutStage('details')} disabled={cartItems.length === 0}>
                    Proceed to Checkout
                  </Button>
                  <Button variant="ghost" className="w-12" onClick={() => { setIsCartOpen(false) }}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span className="text-accent">{formatPrice(totalAmount)}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Full Name</Label>
                    <Input placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 py-2 text-sm" />
                  </div>
                  <div>
                    <Label className="text-sm">Phone</Label>
                    <Input placeholder="e.g., 0703 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 py-2 text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-sm">Your Email</Label>
                    <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 py-2 text-sm" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm">Delivery Method</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="inline-flex items-center text-sm">
                      <input type="radio" name="delivery" value="delivery" checked={deliveryMethod === 'delivery'} onChange={() => setDeliveryMethod('delivery')} className="mr-2" />
                      Delivery
                    </label>
                    <label className="inline-flex items-center text-sm">
                      <input type="radio" name="delivery" value="pickup" checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} className="mr-2" />
                      Pickup
                    </label>
                  </div>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div>
                    <Label className="text-sm">Delivery Address</Label>
                    <Textarea placeholder="Enter delivery address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 text-sm resize-none h-20" />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white py-3 text-base font-semibold" onClick={testPaymentSuccess}>
                    Test Payment Success
                  </Button>
                  <Button variant="ghost" className="w-20" onClick={() => setCheckoutStage('items')}>
                    Back
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* PRODUCT MODAL */}
<Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
  <DialogContent className="max-w-4xl p-0 bg-background overflow-hidden rounded-2xl">

    <div className="flex flex-col md:flex-row gap-0 items-stretch">

      {/* LEFT SIDE — FULL IMAGE */}
      <div className="md:w-3/6 relative h-80 md:h-[600px] max-h-[80vh] bg-gray-50 border-r border-border">
        <img
          src={selectedProduct?.image || "https://via.placeholder.com/800"}
          alt={selectedProduct?.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE — PRODUCT DETAILS */}
      <div className="md:w-3/6 p-6 md:p-8 flex flex-col min-w-0">

        {/* TITLE + BADGE */}
        <div className="mb-6">
          {selectedProduct?.bestseller && (
            <div className="mb-3">
              <Badge className="bg-accent text-accent-foreground font-semibold shadow-sm">Bestseller</Badge>
            </div>
          )}

          <h2 className="text-3xl font-bold text-foreground leading-tight">
            {selectedProduct?.name}
          </h2>
        </div>

        {/* DESCRIPTION (scrollable if long) */}
        <div className="flex-1 overflow-auto mb-6 pr-1">
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {selectedProduct?.desc}
          </p>
        </div>

        {/* PRICE + BUTTON */}
        <div className="mt-auto">
          <div className="mb-5">
            <span className="text-4xl font-bold text-accent tracking-tight">
              {selectedProduct && formatPrice(selectedProduct.price)}
            </span>
          </div>

          <Button
            onClick={() => {
              selectedProduct && addToCart(selectedProduct);
              setSelectedProduct(null);
              setIsCartOpen(true);
            }}
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-6 text-lg rounded-xl shadow-lg transition-all"
          >
            Add to Cart
          </Button>
        </div>

      </div>

    </div>
    
  </DialogContent>
</Dialog>


      {/* RECEIPT MODAL */}
      <Dialog open={!!receipt} onOpenChange={() => setReceipt(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-600">Payment Successful!</DialogTitle>
          </DialogHeader>
          <pre className="bg-black text-white p-6 rounded-lg text-sm font-mono whitespace-pre-wrap">{receipt}</pre>
          <Button className="w-full bg-accent hover:bg-accent/90 text-white" onClick={copyReceipt}>
            <Download className="mr-2 h-4 w-4" /> Copy Receipt
          </Button>
        </DialogContent>
      </Dialog>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 35s linear infinite;
        }
      `}</style>

      <Footer />
    </main>
  )
}