"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scissors, Palette, Sparkles, Heart, ShoppingBag, Calendar, User, Star } from "lucide-react"

const testimonials = [
  { name: "Zainab M.", text: "The braiding service was exceptional! My hair looks gorgeous and feels so healthy.", rating: 5 },
  { name: "Nneka T.", text: "Professional stylists who truly understand diverse hair. Worth every naira!", rating: 5 },
  { name: "Blessing O.", text: "My bridal package was absolutely stunning. The team made me feel like royalty.", rating: 5 },
  { name: "Yetunde L.", text: "The spa treatments are so relaxing. My scalp has never felt better!", rating: 5 },
  { name: "Amira K.", text: "Hair coloring expertise is top-notch. My color correction turned out perfectly.", rating: 5 },
  { name: "Hauwa S.", text: "The nail services are impeccable. Highly skilled technicians with amazing attention to detail.", rating: 5 },
  { name: "Ifunanya P.", text: "Best salon experience in Abuja! Staff is friendly and professional. Definitely coming back.", rating: 5 },
]

const services = [
  {
    icon: Scissors,
    title: "Hair Styling",
    description: "Professional cuts, blowouts, and styling for all hair types",
    price: "From ₦15,000",
    image: "/professional-hair-styling-in-luxury-salon.png",
  },
  {
    icon: Palette,
    title: "Hair Coloring",
    description: "Expert coloring, highlights, and color correction services",
    price: "From ₦25,000",
    image: "/hair-coloring-and-highlights-in-salon.png",
  },
  {
    icon: Sparkles,
    title: "Braiding & Weaving",
    description: "Traditional and modern braiding styles with premium extensions",
    price: "From ₦20,000",
    image: "/professional-hair-braiding-and-weaving.png",
  },
  {
    icon: Heart,
    title: "Spa Treatments",
    description: "Relaxing facials, scalp treatments, and wellness services",
    price: "From ₦18,000",
    image: "/luxury-spa-treatment-and-facial.png",
  },
  {
    icon: ShoppingBag,
    title: "Nail Services",
    description: "Manicures, pedicures, and nail art by certified technicians",
    price: "From ₦8,000",
    image: "/professional-nail-art-and-manicure.png",
  },
  {
    icon: Calendar,
    title: "Bridal Packages",
    description: "Complete bridal beauty packages for your special day",
    price: "From ₦80,000",
    image: "/bridal-hair-and-makeup-styling.png",
  },
]

export function ServicesPreview() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Our Premium Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our comprehensive range of beauty services designed to enhance your natural beauty and boost your
            confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground rounded-full p-2">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-accent">{service.price}</span>
                    <Link href="/services">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-accent hover:text-accent-foreground bg-transparent"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              View All Services
            </Button>
          </Link>
        </div>
        
        {/* Testimonials (icons) - placed under the View All Services button */}
        <div className="mt-12">
          <div className="max-w-5xl mx-auto">
            <div className="overflow-hidden py-4 px-6">
              <div className="flex gap-6 animate-scroll-services">
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div key={`${t.name}-${i}`} className="min-w-[280px] bg-card rounded-lg p-6 flex-shrink-0 shadow-lg border-l-4 border-accent">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-muted/20 p-2">
                        <User className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground italic mb-2">"{t.text}"</p>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{t.name}</p>
                          <div className="flex -ml-2">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className={`h-3 w-3 ${j < t.rating ? "fill-accent text-accent" : "text-muted"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes scrollServices {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-services {
            display: flex;
            width: max-content;
            animation: scrollServices 35s linear infinite;
          }
          .animate-scroll-services:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  )
}
