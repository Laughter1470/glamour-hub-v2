import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scissors, Palette, Sparkles, Heart, ShoppingBag, Calendar } from "lucide-react"

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
      </div>
    </section>
  )
}
