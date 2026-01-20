// app/about/page.tsx
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Star, Calendar, Sparkles } from "lucide-react"

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We deliver the highest standards of skill, hygiene, and professionalism in every service.",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Every client is unique. We listen, understand, and tailor every experience just for you.",
  },
  {
    icon: Sparkles,
    title: "Innovation & Quality",
    description: "We combine the latest beauty trends with premium products to give you flawless, long-lasting results.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-accent/50 to-muted/50 py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            About Glamour<span className="text-accent">Hub</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your premium beauty studio & online shop in the heart of Maitama, Abuja
          </p>
        </div>
      </section>

{/* Our Story + Image Card Section – FIXED & WORKING */}
<section className="py-20 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-start">

      {/* Left: Story Text */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-foreground">Our Journey</h2>
        <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
          <p>
            Glamour Hub was born from a passion to create a luxury beauty experience that combines world-class services
            with carefully curated products — all under one roof.
          </p>
          <p>
            Located at Holy Trinity Catholic Church in Maitama, Abuja, we’ve grown from a boutique salon into a
            trusted name for hair, makeup, nails, spa treatments, and premium beauty products with nationwide delivery.
          </p>
          <p>
            Thousands of happy clients later, we remain committed to one thing: helping you look and feel your absolute best.
          </p>
        </div>
        <div className="mt-8">
          <Button size="lg" asChild>
            <a href="/booking">
              <Calendar className="mr-2 h-5 w-5" />
              Book Your Appointment
            </a>
          </Button>
        </div>
      </div>

      {/* Right: Image Card – NOW WORKING 100% */}
      <div className="relative group">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/5] lg:aspect-auto">
          {/* THIS IS THE CORRECT WAY */}
          <img
            src="/glamour-hub-interior.jpg"
            alt="Inside Glamour Hub – Luxury Beauty Studio in Maitama, Abuja"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Welcome to Glamour Hub</h3>
            <p className="text-sm opacity-90">
              A sanctuary of beauty, style, and self-care in the heart of Abuja
            </p>
          </div>
        </div>

        {/* Floating Stat Badge */}
        <div className="absolute -top-6 -right-6 bg-accent text-accent-foreground rounded-full p-5 shadow-xl z-10">
          <div className="text-3xl font-bold">2K+</div>
          <div className="text-xs opacity-90">Happy Clients</div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that define every experience at Glamour Hub
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <Card key={i} className="hover:shadow-xl transition-shadow duration-300 border-0">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-10 w-10 text-accent" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team – Generic (no real names/photos for portfolio safety) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12-moving">
            <h2 className="text-4xl font-bold mb-4">Our Expert Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate, certified professionals dedicated to your beauty
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { role: "Master Stylist", exp: "4+ years", spec: "Color & Extensions" },
              { role: "Makeup Artist", exp: "3+ years", spec: "Bridal & Editorial" },
              { role: "Nail Technician", exp: "7+ years", spec: "Gel & Nail Art" },
              { role: "Spa Therapist", exp: "2+ years", spec: "Facials & Massage" },
            ].map((member, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-80 bg-gradient-to-br from-accent/20 to-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-accent/10 border-2 border-dashed border-accent rounded-full w-32 h-32" />
                  </div>
                </div>
                <CardContent className="pt-6 text-center">
                  <h3 className="text-xl font-semibold">{member.role}</h3>
                  <p className="text-accent text-sm font-medium mt-1">{member.exp}</p>
                  <p className="text-sm text-muted-foreground mt-2">{member.spec}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
