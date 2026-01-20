// app/gallery/page.tsx
"use client"

import { useState } from "react"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { toast } from '@/hooks/use-toast'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Filter, Heart, Share2, MapPin } from "lucide-react"

const categories = [
  { id: "all", label: "All Work", count: 28 },
  { id: "hair", label: "Hair Styling", count: 9 },
  { id: "braids", label: "Braids & Locs", count: 7 },
  { id: "color", label: "Hair Color", count: 6 },
  { id: "makeup", label: "Makeup", count: 4 },
  { id: "bridal", label: "Bridal", count: 4 },
  { id: "interior", label: "Salon Interior", count: 2 },
]

const photos = [
  { id: 1, cat: "hair", title: "Sleek Silk Press", desc: "Mirror-shine finish on natural hair.", featured: true },
  { id: 2, cat: "braids", title: "Jumbo Knotless Braids", desc: "Lightweight & scalp-friendly", featured: true },
  { id: 3, cat: "color", title: "Caramel Balayage", desc: "Sun-kissed glow", featured: true },
  { id: 4, cat: "bridal", title: "Soft Bridal Waves", desc: "Romantic wedding look", featured: true },
  { id: 5, cat: "hair", title: "Voluminous Curls", desc: "Bouncy & defined", featured: false },
  { id: 6, cat: "braids", title: "Fulani Braids with Beads", desc: "Cultural elegance", featured: false },
  { id: 7, cat: "color", title: "Platinum Blonde", desc: "Full transformation", featured: true },
  { id: 8, cat: "makeup", title: "Soft Glam Beat", desc: "Natural yet stunning", featured: true },
  { id: 9, cat: "hair", title: "Precision Bob Cut", desc: "Sharp & modern", featured: false },
  { id: 10, cat: "braids", title: "Goddess Locs", desc: "Boho chic vibes", featured: true },
  { id: 11, cat: "color", title: "Cherry Red Ombré", desc: "Bold & beautiful", featured: false },
  { id: 12, cat: "interior", title: "Luxury Reception", desc: "Welcome to Glamour Hub", featured: true },
  { id: 13, cat: "hair", title: "Textured Pixie", desc: "Edgy & effortless", featured: false },
  { id: 14, cat: "braids", title: "Cornrows with Extensions", desc: "Sleek ponytail", featured: false },
  { id: 15, cat: "makeup", title: "Editorial Glam", desc: "Magazine-ready look", featured: false },
  { id: 16, cat: "bridal", title: "Classic Bridal Updo", desc: "Timeless elegance", featured: false },
  { id: 17, cat: "hair", title: "Beach Waves", desc: "Vacation-ready hair", featured: false },
  { id: 18, cat: "color", title: "Chocolate Brown Melt", desc: "Rich & glossy", featured: false },
  { id: 19, cat: "braids", title: "Box Braids with Curls", desc: "Half-up style", featured: false },
  { id: 20, cat: "makeup", title: "Bridal Makeup Trial", desc: "Soft & glowing", featured: false },
  { id: 21, cat: "hair", title: "Layered Long Cut", desc: "Face-framing layers", featured: false },
  { id: 22, cat: "color", title: "Honey Blonde Highlights", desc: "Natural dimension", featured: false },
  { id: 23, cat: "bridal", title: "Princess Bridal Crown", desc: "Royal treatment", featured: true },
  { id: 24, cat: "interior", title: "Styling Stations", desc: "Modern luxury setup", featured: false },
  { id: 25, cat: "braids", title: "Stitch Braids", desc: "Clean & neat", featured: false },
  { id: 26, cat: "makeup", title: "Cut Crease Glam", desc: "Sharp & dramatic", featured: false },
  { id: 27, cat: "hair", title: "Hollywood Waves", desc: "Red carpet ready", featured: true },
  { id: 28, cat: "bridal", title: "Veiled Beauty", desc: "Complete bridal look", featured: false },
]

export default function GalleryPage() {
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState<typeof photos[0] | null>(null)
  const router = useRouter()

  async function handleShare(item: typeof photos[0]) {
    try {
      const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/gallery?item=${item.id}` : `/gallery?item=${item.id}`
      if (navigator.share) {
        await navigator.share({ title: item.title, text: item.desc, url: shareUrl })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        // lightweight feedback using app toast
        toast({ title: 'Link copied', description: 'Gallery link copied to clipboard' })
      } else {
        // final fallback
        window.prompt("Copy this link", shareUrl)
      }
    } catch (err) {
      console.error("Share failed:", err)
    }
  }

  const filtered = filter === "all" ? photos : photos.filter(p => p.cat === filter)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-accent/50 to-muted/50 py-24 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Our <span className="text-accent">Gallery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real clients. Real transformations. Real glamour — at Glamour Hub, Maitama
          </p>
          <div className="flex justify-center mt-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <MapPin className="h-4 w-4 mr-1" />
              Holy Trinity Church, Maitama, Abuja
            </Badge>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={filter === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat.id)}
                className={filter === cat.id ? "bg-accent hover:bg-accent/90" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                {cat.label} ({cat.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(item => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300">
                    <div className="aspect-square relative">
                      <Image
                        src={`/gallery/${item.id}.jpg`}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        loading="lazy"
                        quality={75}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                      
                      {item.featured && (
                        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                          <Heart className="h-3 w-3 mr-1" fill="currentColor" />
                          Featured
                        </Badge>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-8 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-xs opacity-90">{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-5xl p-0 bg-background">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 flex items-center justify-center bg-black/5">
                      <div className="relative w-full h-[80vh] max-h-[80vh]">
                        <Image
                          src={`/gallery/${item.id}.jpg`}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="eager"
                          priority
                          quality={90}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between relative">
                      {item.featured && (
                        <div className="absolute top-2 right-4 z-10">
                          <Badge className="bg-accent text-accent-foreground text-sm px-2 py-0.5 inline-flex items-center">
                            <Heart className="h-0.5 w-0.5 mr-0.5" fill="currentColor" />
                            Featured
                          </Badge>
                        </div>
                      )}

                      <div className="mb-6 flex-1 overflow-auto">
                        <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
                        <p className="text-muted-foreground text-lg">{item.desc}</p>
                      </div>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-4">
                          <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => router.push(`/booking?look=${item.id}`)}>
                            <Calendar className="mr-2 h-5 w-5" />
                            Book This Look
                          </Button>
                          <Button size="lg" variant="outline" onClick={() => handleShare(item)}>
                            <Share2 className="mr-2 h-5 w-5" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Your Turn to Shine</h2>
          <p className="text-xl mb-10 opacity-90">
            Book your appointment at Glamour Hub and let us create magic for you
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/booking")}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12"
          >
            <Calendar className="mr-3 h-6 w-6" />
            Book Now
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
