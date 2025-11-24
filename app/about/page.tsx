import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Star, Calendar } from "lucide-react"

const values = [
  {
    icon: Award,
    title: "Professionalism",
    description: "We maintain the highest standards of service excellence and technical expertise in every treatment.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description:
      "Your comfort and satisfaction are our top priorities. We listen, understand, and deliver beyond expectations.",
  },
  {
    icon: Star,
    title: "Style Innovation",
    description: "We stay ahead of beauty trends while honoring timeless elegance to create your perfect look.",
  },
]

const teamMembers = [
  {
    name: "Adunni Okafor",
    role: "Founder & Master Stylist",
    experience: "15+ years",
    specialties: "Hair coloring, Bridal styling",
    image: "/professional-female-hair-stylist-portrait.png",
  },
  {
    name: "Kemi Adebayo",
    role: "Senior Braiding Specialist",
    experience: "12+ years",
    specialties: "Traditional & modern braiding",
    image: "/professional-braiding-specialist-portrait.png",
  },
  {
    name: "Fatima Hassan",
    role: "Spa & Wellness Expert",
    experience: "8+ years",
    specialties: "Facials, Scalp treatments",
    image: "/professional-spa-therapist-portrait.png",
  },
  {
    name: "Grace Emeka",
    role: "Nail Art Specialist",
    experience: "6+ years",
    specialties: "Nail art, Manicures, Pedicures",
    image: "/professional-nail-technician-portrait.png",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              About Hair<span className="text-accent">volution</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Where beauty meets excellence in the heart of Abuja
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2018 in the vibrant Wuye district of Abuja, Hairvolution began as a dream to create a
                  sanctuary where beauty, wellness, and exceptional service converge. Our founder, Adunni Okafor,
                  envisioned a space that would redefine the salon experience in Nigeria's capital.
                </p>
                <p>
                  What started as a small boutique salon has grown into Abuja's premier beauty destination, serving over
                  2,000 satisfied clients. We've built our reputation on unwavering commitment to quality, continuous
                  education, and genuine care for each person who walks through our doors.
                </p>
                <p>
                  Today, Hairvolution stands as a testament to the power of passion, professionalism, and the belief
                  that every individual deserves to feel beautiful, confident, and pampered.
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Experience
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/hairvolution-salon-founder-and-team.png"
                alt="Hairvolution Salon Team"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold">2000+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Hairvolution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Expert Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Skilled professionals dedicated to bringing out your natural beauty
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs font-semibold">
                    {member.experience}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-accent font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-xs">{member.specialties}</p>
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
