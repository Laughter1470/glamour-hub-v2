// app/contact/page.tsx
"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  NavigationIcon,
  Car,
  Bus,
  CheckCircle,
  X,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error")
      setStatusMessage("Please fill in your name, email, and message.")
      return
    }

    setIsSubmitting(true)
    setStatus("idle")
    setStatusMessage("")

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactForm: true,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          subject: formData.subject || "General Inquiry",
          message: formData.message,
          date: new Date().toLocaleString(),
        }),
      })

      if (!res.ok) throw new Error("Failed")

      setStatus("success")
      setStatusMessage("Thank you! Your message has been sent. We’ll reply soon.")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (err) {
      setStatus("error")
      setStatusMessage("Failed to send message. Please try again or WhatsApp us.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const openWhatsApp = () => {
    const text = "Hi Glamour Hub! I'd like to book an appointment or inquire about your services."
    window.open(`https://wa.me/2347035118531?text=${encodeURIComponent(text)}`, "_blank")
  }

  const openMaps = () => {
    const query = "Holy Trinity Catholic Church, Maitama, Abuja"
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, "_blank")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-accent/50 to-muted/50 py-30 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We’re here for you — call, message, or visit us in Maitama
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg">Visit Us</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Holy Trinity Catholic Church
                  <br />
                  Maitama, Abuja
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg">Call Us</h3>
                <p className="text-sm text-muted-foreground mt-2">0703 511 8531</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-sm text-muted-foreground mt-2">fidelisemma1470@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg">WhatsApp</h3>
                <Button
                  onClick={openWhatsApp}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white"
                >
                  Chat Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact Form + Transportation */}
            <div className="space-y-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Send className="mr-3 h-6 w-6" />
                    Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {status === "success" && (
                    <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{statusMessage}</span>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm flex items-center gap-2">
                      <X className="h-4 w-4 text-red-600" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Your full name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+234 xxx xxx xxxx"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="your@email.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label>Subject</Label>
                      <Input
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        placeholder="What's this about?"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Textarea
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us how we can help you..."
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* How to Get Here */}
              <Card>
                <CardHeader>
                  <CardTitle>How to Get Here</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <Car className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">By Car</h4>
                        <p className="text-sm text-muted-foreground">
                          Ample free parking available right in front of the salon.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Bus className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Public Transport / Ride-Hailing
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Just tell your driver “Holy Trinity Catholic Church, Maitama” — everyone
                          knows it!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Map + Hours */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-3" /> Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-90 bg-muted rounded-b-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src="/glamour-hub-location.jpg"
                      alt="Glamour Hub Maitama Location"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <Button
                        onClick={openMaps}
                        size="lg"
                        className="bg-accent hover:bg-accent/90"
                      >
                        <NavigationIcon className="mr-2" /> Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-3" /> Opening Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monday – Saturday</span>
                    <Badge variant="secondary">9:00 AM – 7:00 PM</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <Badge variant="secondary">11:00 AM – 5:00 PM</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground pt-4">
                    We recommend booking in advance, especially on weekends!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-accent/50 to-muted/50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Glow?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            We’re here for you — call, message, or visit us in Maitama
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/70 text-lg px-10"
              asChild
            >
              <a href="/booking">Book Appointment</a>
            </Button>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-lg px-10"
              onClick={openWhatsApp}
            >
              <MessageCircle className="mr-3 h-5 w-5" /> WhatsApp Us
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-10" asChild>
              <a href="tel:+2347035118531">
                <Phone className="mr-3 h-5 w-5" /> Call 0703 511 8531
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
