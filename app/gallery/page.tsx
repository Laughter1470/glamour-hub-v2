"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Filter, Heart, Share2 } from "lucide-react"

const galleryCategories = [
  { id: "all", label: "All Work", count: 24 },
  { id: "hair-styling", label: "Hair Styling", count: 8 },
  { id: "braiding", label: "Braiding", count: 6 },
  { id: "coloring", label: "Hair Coloring", count: 5 },
  { id: "bridal", label: "Bridal", count: 3 },
  { id: "salon", label: "Salon Interior", count: 2 },
]

const galleryItems = [
  {
    id: 1,
    category: "hair-styling",
    title: "Elegant Bob Cut",
    description: "Modern bob with subtle layers for volume and movement",
    image: "/gallery-elegant-bob-cut-styling.png",
    beforeAfter: false,
    featured: true,
  },
  {
    id: 2,
    category: "braiding",
    title: "Intricate Box Braids",
    description: "Long box braids with premium synthetic hair",
    image: "/gallery-box-braids-hairstyle.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 3,
    category: "coloring",
    title: "Honey Blonde Highlights",
    description: "Beautiful honey blonde highlights on natural hair",
    image: "/gallery-honey-blonde-highlights.png",
    beforeAfter: true,
    featured: true,
  },
  {
    id: 4,
    category: "bridal",
    title: "Bridal Updo Perfection",
    description: "Elegant bridal updo with delicate accessories",
    image: "/gallery-bridal-updo-hairstyle.png",
    beforeAfter: false,
    featured: true,
  },
  {
    id: 5,
    category: "hair-styling",
    title: "Voluminous Curls",
    description: "Bouncy curls with professional styling techniques",
    image: "/gallery-voluminous-curls-styling.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 6,
    category: "braiding",
    title: "Feed-in Cornrows",
    description: "Precise feed-in cornrows with geometric patterns",
    image: "/gallery-feed-in-cornrows.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 7,
    category: "coloring",
    title: "Ombre Color Transformation",
    description: "Stunning ombre from dark roots to light ends",
    image: "/gallery-ombre-color-transformation.png",
    beforeAfter: true,
    featured: false,
  },
  {
    id: 8,
    category: "hair-styling",
    title: "Sleek Straight Style",
    description: "Pin-straight hair with mirror-like shine",
    image: "/gallery-sleek-straight-hairstyle.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 9,
    category: "braiding",
    title: "Senegalese Twists",
    description: "Protective Senegalese twists with natural-looking texture",
    image: "/gallery-senegalese-twists.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 10,
    category: "coloring",
    title: "Platinum Blonde Transformation",
    description: "Complete color transformation to platinum blonde",
    image: "/gallery-platinum-blonde-transformation.png",
    beforeAfter: true,
    featured: true,
  },
  {
    id: 11,
    category: "bridal",
    title: "Romantic Bridal Waves",
    description: "Soft romantic waves perfect for wedding day",
    image: "/gallery-romantic-bridal-waves.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 12,
    category: "salon",
    title: "Luxury Salon Interior",
    description: "Our elegant styling stations and comfortable atmosphere",
    image: "/gallery-salon-interior-styling-stations.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 13,
    category: "hair-styling",
    title: "Textured Pixie Cut",
    description: "Edgy pixie cut with textured layers",
    image: "/gallery-textured-pixie-cut.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 14,
    category: "braiding",
    title: "Goddess Braids",
    description: "Thick goddess braids with intricate patterns",
    image: "/gallery-goddess-braids-hairstyle.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 15,
    category: "coloring",
    title: "Balayage Highlights",
    description: "Natural-looking balayage highlights",
    image: "/gallery-balayage-highlights.png",
    beforeAfter: true,
    featured: false,
  },
  {
    id: 16,
    category: "hair-styling",
    title: "Beach Waves",
    description: "Effortless beach waves with natural texture",
    image: "/gallery-beach-waves-hairstyle.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 17,
    category: "braiding",
    title: "Dutch Braids",
    description: "Classic Dutch braids with modern styling",
    image: "/gallery-dutch-braids-hairstyle.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 18,
    category: "bridal",
    title: "Bridal Hair Accessories",
    description: "Elegant bridal styling with pearl accessories",
    image: "/gallery-bridal-hair-accessories.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 19,
    category: "hair-styling",
    title: "Layered Long Hair",
    description: "Long layered cut with face-framing highlights",
    image: "/gallery-layered-long-hairstyle.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 20,
    category: "coloring",
    title: "Red Color Transformation",
    description: "Vibrant red color with professional application",
    image: "/gallery-red-color-transformation.png",
    beforeAfter: true,
    featured: false,
  },
  {
    id: 21,
    category: "braiding",
    title: "Fulani Braids",
    description: "Traditional Fulani braids with beads and accessories",
    image: "/gallery-fulani-braids-hairstyle.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 22,
    category: "hair-styling",
    title: "Vintage Hollywood Waves",
    description: "Classic Hollywood glamour waves",
    image: "/gallery-hollywood-waves-styling.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 23,
    category: "hair-styling",
    title: "Modern Shag Cut",
    description: "Contemporary shag with feathered layers",
    image: "/gallery-modern-shag-hairstyle.png",
    beforeAfter: false,
    featured: false,
  },
  {
    id: 24,
    category: "salon",
    title: "Relaxation Area",
    description: "Comfortable waiting area with luxury amenities",
    image: "/gallery-salon-relaxation-area.png",
    beforeAfter: false,
    featured: false,
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)

  const filteredItems = galleryItems.filter((item) => activeCategory === "all" || item.category === activeCategory)

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Our Work <span className="text-accent">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover the artistry and expertise behind every transformation at Hairvolution
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {galleryCategories.map((category) => (
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
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.featured && (
                          <Badge className="bg-accent text-accent-foreground">
                            <Heart className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        {item.beforeAfter && (
                          <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            Before/After
                          </Badge>
                        )}
                      </div>

                      {/* Overlay Content */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                        <p className="text-white/80 text-xs">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">{item.title}</h2>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="flex gap-2">
                          {item.featured && (
                            <Badge className="bg-accent text-accent-foreground">
                              <Heart className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {item.beforeAfter && (
                            <Badge variant="secondary" className="bg-primary text-primary-foreground">
                              Before/After
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Similar Style
                        </Button>
                        <Button variant="outline">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready for Your Transformation?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let our expert stylists create your perfect look. Book your consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Calendar className="mr-2 h-5 w-5" />
              Book Consultation
            </Button>
            <Button size="lg" variant="outline">
              View Services & Pricing
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
