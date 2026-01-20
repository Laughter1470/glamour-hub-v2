// app/services/page.tsx
"use client"  // ← THIS LINE WAS MISSING!

import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Scissors,
  Palette,
  Sparkles,
  Heart,
  Gem,
  Crown,
  Zap,
  Phone,
  Calendar,
  Clock,
} from "lucide-react"

const serviceCategories = [
  {
    category: "Hair Styling",
    icon: Scissors,
    services: [
      { id: "hair-cut", name: "Precision Hair Cut", desc: "Custom cut to suit your face & style", price: "₦18,000", popular: true },
      { id: "blowout", name: "Blowout & Styling", desc: "Voluminous, sleek or curly finish", price: "₦15,000", popular: true },
      { id: "conditioning", name: "Deep Conditioning", desc: "Intensive repair for damaged hair", price: "₦25,000", popular: false },
      { id: "keratin", name: "Keratin Treatment", desc: "Smooth, frizz-free hair for months", price: "₦80,000", popular: false },
    ],
  },
  {
    category: "Hair Coloring",
    icon: Palette,
    services: [
      { id: "full-color", name: "Full Color", desc: "Complete color change with premium dyes", price: "₦45,000", popular: true },
      { id: "balayage", name: "Balayage/Highlights", desc: "Natural sun-kissed look", price: "₦55,000", popular: true },
      { id: "root-touch", name: "Root Touch-Up", desc: "Seamless regrowth coverage", price: "₦20,000", popular: false },
      { id: "fashion-color", name: "Fashion Color", desc: "Pink, purple, silver & more", price: "₦70,000", popular: false },
    ],
  },
  {
    category: "Braids & Extensions",
    icon: Sparkles,
    services: [
      { id: "box-braids", name: "Box Braids", desc: "Small to jumbo, waist or mid-back", price: "₦35,000", popular: true },
      { id: "cornrows", name: "Cornrows", desc: "Neat, stylish scalp braids", price: "₦20,000", popular: true },
      { id: "goddess-locs", name: "Goddess Locs", desc: "Lightweight boho locs", price: "₦45,000", popular: false },
      { id: "weave", name: "Weave Install", desc: "Sew-in or glue-less installation", price: "₦40,000", popular: true },
    ],
  },
  {
    category: "Nails",
    icon: Gem,
    services: [
      { id: "manicure", name: "Luxury Manicure", desc: "Shape, cuticle care + gel polish", price: "₦15,000", popular: true },
      { id: "pedicure", name: "Spa Pedicure", desc: "Soak, scrub & polish", price: "₦18,000", popular: true },
      { id: "nail-art", name: "Nail Art", desc: "Hand-painted designs", price: "₦8,000+", popular: false },
      { id: "gel-x", name: "Gel-X Extensions", desc: "Long, strong & natural-looking", price: "₦35,000", popular: false },
    ],
  },
  {
    category: "Makeup & Facials",
    icon: Heart,
    services: [
      { id: "glam-makeup", name: "Full Glam Makeup", desc: "Flawless beat for events", price: "₦30,000", popular: true },
      { id: "facial", name: "Signature Facial", desc: "Deep cleanse & glow treatment", price: "₦25,000", popular: true },
      { id: "lash-lift", name: "Lash Lift + Tint", desc: "Wake up with perfect lashes", price: "₦20,000", popular: false },
      { id: "bridal-makeup", name: "Bridal Makeup", desc: "Long-lasting wedding glam", price: "₦80,000", popular: true },
    ],
  },
  {
    category: "Bridal & Special Events",
    icon: Crown,
    services: [
      { id: "bridal-package", name: "Complete Bridal Package", desc: "Hair + Makeup + Touch-ups", price: "₦100,000", popular: true },
      { id: "bridal-trial", name: "Bridal Trial", desc: "Perfect your wedding look", price: "₦50,000", popular: false },
      { id: "event-glam", name: "Event Glam", desc: "Red carpet ready", price: "₦30,000", popular: true },
      { id: "group-styling", name: "Group Styling", desc: "Bride + bridesmaids", price: "₦120,000", popular: true },
    ],
  },
]

export default function ServicesPage() {
  const router = useRouter()

  const handleBookService = (serviceName: string) => {
    const encoded = encodeURIComponent(serviceName)
    router.push(`/booking?service=${encoded}`)
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-accent/50 to-muted/50 py-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Premium beauty treatments crafted with care at Glamour Hub, Maitama
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/booking")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:+2347035118531">
                <Phone className="mr-2 h-5 w-5" />
                Call 0703 511 8531
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {serviceCategories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <div key={i} className="mb-20 last:mb-0">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-accent/10 rounded-2xl">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="text-4xl font-bold text-foreground">{cat.category}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {cat.services.map((service) => (
                    <Card
                      key={service.id}
                      className="group hover:shadow-2xl transition-all duration-300 border-0 bg-card/95 backdrop-blur"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-2xl group-hover:text-accent transition-colors">
                            {service.name}
                          </CardTitle>
                          {service.popular && (
                            <Badge className="bg-accent text-accent-foreground">
                              <Zap className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-6 text-base">{service.desc}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-3xl font-bold text-accent">{service.price}</p>
                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              Duration: 1 - 2 hrs
                            </p>
                          </div>
                          <Button
                            onClick={() => handleBookService(service.name)}
                            className="font-medium bg-accent hover:bg-accent/90"
                          >
                            Book This Service
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Your Transformation Starts Here</h2>
          <p className="text-xl opacity-90 mb-10">
            One click away from your perfect look
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/booking")}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12"
          >
            <Calendar className="mr-3 h-6 w-6" />
            Book Your Appointment
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
