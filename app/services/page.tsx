import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scissors, Palette, Sparkles, Heart, ShoppingBag, Calendar, Crown, Zap } from "lucide-react"

const serviceCategories = [
  {
    category: "Hair Styling Services",
    icon: Scissors,
    services: [
      {
        name: "Professional Hair Cut",
        description: "Precision cuts tailored to your face shape and lifestyle",
        price: "₦15,000 - ₦25,000",
        duration: "45-60 mins",
        popular: false,
      },
      {
        name: "Blowout & Styling",
        description: "Smooth, voluminous styling for any occasion",
        price: "₦12,000 - ₦18,000",
        duration: "30-45 mins",
        popular: true,
      },
      {
        name: "Hair Treatment & Deep Conditioning",
        description: "Restorative treatments for damaged or dry hair",
        price: "₦20,000 - ₦35,000",
        duration: "60-90 mins",
        popular: false,
      },
      {
        name: "Keratin Treatment",
        description: "Smoothing treatment for frizz-free, manageable hair",
        price: "₦45,000 - ₦65,000",
        duration: "2-3 hours",
        popular: false,
      },
    ],
  },
  {
    category: "Hair Coloring & Highlights",
    icon: Palette,
    services: [
      {
        name: "Full Hair Coloring",
        description: "Complete color transformation with premium products",
        price: "₦30,000 - ₦50,000",
        duration: "2-3 hours",
        popular: true,
      },
      {
        name: "Highlights & Lowlights",
        description: "Dimensional color for natural-looking depth",
        price: "₦25,000 - ₦40,000",
        duration: "2-2.5 hours",
        popular: false,
      },
      {
        name: "Root Touch-Up",
        description: "Maintain your color with professional root coverage",
        price: "₦15,000 - ₦22,000",
        duration: "60-90 mins",
        popular: true,
      },
      {
        name: "Color Correction",
        description: "Expert correction for previous color mishaps",
        price: "₦40,000 - ₦80,000",
        duration: "3-5 hours",
        popular: false,
      },
    ],
  },
  {
    category: "Braiding & Protective Styles",
    icon: Sparkles,
    services: [
      {
        name: "Box Braids",
        description: "Classic protective style with premium synthetic or human hair",
        price: "₦20,000 - ₦35,000",
        duration: "3-5 hours",
        popular: true,
      },
      {
        name: "Cornrows & Feed-in Braids",
        description: "Intricate braided patterns close to the scalp",
        price: "₦15,000 - ₦25,000",
        duration: "2-4 hours",
        popular: true,
      },
      {
        name: "Senegalese Twists",
        description: "Elegant twisted protective style",
        price: "₦22,000 - ₦32,000",
        duration: "3-4 hours",
        popular: false,
      },
      {
        name: "Weave Installation",
        description: "Professional sew-in or bonding with quality extensions",
        price: "₦25,000 - ₦45,000",
        duration: "2-4 hours",
        popular: true,
      },
    ],
  },
  {
    category: "Spa & Wellness Treatments",
    icon: Heart,
    services: [
      {
        name: "Signature Facial Treatment",
        description: "Customized facial for your specific skin needs",
        price: "₦18,000 - ₦28,000",
        duration: "60-75 mins",
        popular: true,
      },
      {
        name: "Scalp Massage & Treatment",
        description: "Relaxing scalp therapy for healthy hair growth",
        price: "₦12,000 - ₦18,000",
        duration: "30-45 mins",
        popular: false,
      },
      {
        name: "Hot Oil Treatment",
        description: "Nourishing oil treatment for dry, damaged hair",
        price: "₦8,000 - ₦15,000",
        duration: "30-45 mins",
        popular: true,
      },
      {
        name: "Eyebrow Shaping & Tinting",
        description: "Professional brow sculpting and coloring",
        price: "₦5,000 - ₦8,000",
        duration: "30-45 mins",
        popular: false,
      },
    ],
  },
  {
    category: "Nail Services",
    icon: ShoppingBag,
    services: [
      {
        name: "Classic Manicure",
        description: "Complete nail care with polish application",
        price: "₦8,000 - ₦12,000",
        duration: "45-60 mins",
        popular: true,
      },
      {
        name: "Gel Manicure",
        description: "Long-lasting gel polish manicure",
        price: "₦12,000 - ₦18,000",
        duration: "60-75 mins",
        popular: true,
      },
      {
        name: "Pedicure",
        description: "Relaxing foot care and nail treatment",
        price: "₦10,000 - ₦15,000",
        duration: "45-60 mins",
        popular: false,
      },
      {
        name: "Nail Art Design",
        description: "Custom nail art and decorative designs",
        price: "₦15,000 - ₦25,000",
        duration: "60-90 mins",
        popular: false,
      },
    ],
  },
  {
    category: "Bridal & Special Occasion",
    icon: Crown,
    services: [
      {
        name: "Bridal Hair & Makeup Package",
        description: "Complete bridal beauty for your special day",
        price: "₦80,000 - ₦120,000",
        duration: "3-4 hours",
        popular: true,
      },
      {
        name: "Bridal Trial Session",
        description: "Practice session to perfect your bridal look",
        price: "₦35,000 - ₦45,000",
        duration: "2-3 hours",
        popular: false,
      },
      {
        name: "Special Event Styling",
        description: "Glamorous styling for parties and events",
        price: "₦25,000 - ₦40,000",
        duration: "1.5-2 hours",
        popular: true,
      },
      {
        name: "Group Bridal Party Package",
        description: "Styling for bride and bridal party (4+ people)",
        price: "₦200,000 - ₦350,000",
        duration: "4-6 hours",
        popular: false,
      },
    ],
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">Our Premium Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Comprehensive beauty solutions tailored to enhance your natural radiance
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 mr-4">
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
              <Button size="lg" variant="outline">
                View Price List
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {serviceCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <div key={categoryIndex} className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="bg-accent/10 rounded-full p-3 mr-4">
                    <CategoryIcon className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">{category.category}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <Card key={serviceIndex} className="hover:shadow-lg transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg text-foreground group-hover:text-accent transition-colors">
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
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bold text-accent">{service.price}</div>
                            <div className="text-xs text-muted-foreground">{service.duration}</div>
                          </div>
                          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            Book Now
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

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Look?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Book your appointment today and experience the Hairvolution difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Call Us: +234 803 123 4567
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
