// components/hero-section.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Star, ShoppingBag } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image – you can keep or replace later */}
      <div className="absolute inset-0 z-0">
        <img
          src="/luxury-beauty-salon-interior-with-elegant-styling-.png"
          alt="Glamour Hub – Premium Beauty Studio in Maitama, Abuja"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm lg:text-base text-gray-100">
              Rated 5.0 by 200+ happy clients
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Your Beauty, <br />
          <span className="text-accent">Reimagined</span> in Abuja
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Premium salon services • Professional makeup • Nails • Spa treatments • Curated beauty products with nationwide delivery.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/booking">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 text-lg shadow-xl"
            >
              <Calendar className="mr-3 h-6 w-6" />
              Book Appointment
            </Button>
          </Link>

          <Link href="/shop">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3 text-lg backdrop-blur-sm bg-white/10"
            >
              <ShoppingBag className="mr-3 h-6 w-6" />
              Shop Beauty Products
            </Button>
          </Link>
        </div>

        {/* Location Badge – now Maitama */}
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 text-base font-medium">
          <MapPin className="h-5 w-5 text-accent" />
          <span>Holy Trinity Catholic Church, Maitama, Abuja</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
