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
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, CalendarIcon, Star } from "lucide-react"

const services = [
  {
    id: 1,
    name: "Hair Cut & Style",
    duration: "60 mins",
    price: 20000,
    category: "Hair Styling",
    description: "Professional cut with styling",
  },
  {
    id: 2,
    name: "Hair Coloring",
    duration: "120 mins",
    price: 35000,
    category: "Coloring",
    description: "Full color or highlights",
  },
  {
    id: 3,
    name: "Box Braids",
    duration: "240 mins",
    price: 25000,
    category: "Braiding",
    description: "Classic box braids with extensions",
  },
  {
    id: 4,
    name: "Bridal Package",
    duration: "180 mins",
    price: 80000,
    category: "Bridal",
    description: "Complete bridal hair and makeup",
  },
  {
    id: 5,
    name: "Deep Conditioning Treatment",
    duration: "90 mins",
    price: 25000,
    category: "Treatment",
    description: "Intensive hair repair treatment",
  },
  {
    id: 6,
    name: "Manicure & Pedicure",
    duration: "90 mins",
    price: 15000,
    category: "Nails",
    description: "Complete nail care service",
  },
]

const stylists = [
  {
    id: 1,
    name: "Adunni Okafor",
    specialties: ["Hair Coloring", "Bridal"],
    rating: 4.9,
    experience: "15+ years",
    image: "/stylist-adunni-okafor.png",
    available: true,
  },
  {
    id: 2,
    name: "Kemi Adebayo",
    specialties: ["Braiding", "Extensions"],
    rating: 4.8,
    experience: "12+ years",
    image: "/stylist-kemi-adebayo.png",
    available: true,
  },
  {
    id: 3,
    name: "Fatima Hassan",
    specialties: ["Treatments", "Spa"],
    rating: 4.7,
    experience: "8+ years",
    image: "/stylist-fatima-hassan.png",
    available: true,
  },
  {
    id: 4,
    name: "Grace Emeka",
    specialties: ["Nails", "Styling"],
    rating: 4.6,
    experience: "6+ years",
    image: "/stylist-grace-emeka.png",
    available: false,
  },
]

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
]

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)
  const [selectedStylist, setSelectedStylist] = useState<(typeof stylists)[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleServiceSelect = (service: (typeof services)[0]) => {
    setSelectedService(service)
    setCurrentStep(2)
  }

  const handleStylistSelect = (stylist: (typeof stylists)[0]) => {
    setSelectedStylist(stylist)
    setCurrentStep(3)
  }

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep(4)
    }
  }

  const handleBookingSubmit = () => {
    // Here you would typically send the booking data to your backend
    console.log("Booking submitted:", {
      service: selectedService,
      stylist: selectedStylist,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
    })
    setCurrentStep(5)
  }

  const steps = [
    { number: 1, title: "Select Service", completed: currentStep > 1 },
    { number: 2, title: "Choose Stylist", completed: currentStep > 2 },
    { number: 3, title: "Pick Date & Time", completed: currentStep > 3 },
    { number: 4, title: "Your Details", completed: currentStep > 4 },
    { number: 5, title: "Confirmation", completed: currentStep === 5 },
  ]

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Book Your <span className="text-accent">Appointment</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Schedule your beauty transformation with our expert stylists
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step.completed
                        ? "bg-accent text-accent-foreground"
                        : currentStep === step.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.completed ? <CheckCircle className="h-5 w-5" /> : step.number}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p
                      className={`text-sm font-medium ${
                        step.completed || currentStep === step.number ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-16 h-0.5 bg-border mx-4 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Choose Your Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-accent transition-colors">
                            {service.name}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {service.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-accent">{formatPrice(service.price)}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {service.duration}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Stylist */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Choose Your Stylist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stylists.map((stylist) => (
                  <Card
                    key={stylist.id}
                    className={`cursor-pointer hover:shadow-lg transition-all duration-300 group ${
                      !stylist.available ? "opacity-50" : ""
                    }`}
                    onClick={() => stylist.available && handleStylistSelect(stylist)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={stylist.image || "/placeholder.svg"}
                          alt={stylist.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                            {stylist.name}
                          </h3>
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="text-sm text-muted-foreground">
                              {stylist.rating} • {stylist.experience}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {stylist.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          {!stylist.available && (
                            <Badge variant="secondary" className="mt-2">
                              Unavailable
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Pick Date & Time */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Select Date & Time</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Choose Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Available Times
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className={
                              selectedTime === time
                                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                                : "hover:bg-accent/10 hover:text-accent"
                            }
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">Please select a date first</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {selectedDate && selectedTime && (
                <div className="mt-8 text-center">
                  <Button
                    size="lg"
                    onClick={handleDateTimeSelect}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Continue to Details
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Customer Details */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Your Information</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={customerInfo.firstName}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={customerInfo.lastName}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Special Requests (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={customerInfo.notes}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                        placeholder="Any special requests or notes..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service:</span>
                        <span className="font-medium">{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stylist:</span>
                        <span className="font-medium">{selectedStylist?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{selectedService?.duration}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-accent">{selectedService && formatPrice(selectedService.price)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  onClick={handleBookingSubmit}
                  disabled={
                    !customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone
                  }
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div className="text-center">
              <div className="mb-8">
                <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-4">Booking Confirmed!</h2>
                <p className="text-lg text-muted-foreground">
                  Your appointment has been successfully booked. We'll send you a confirmation email shortly.
                </p>
              </div>

              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Appointment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stylist:</span>
                    <span className="font-medium">{selectedStylist?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Time:</span>
                    <span className="font-medium">
                      {selectedDate?.toLocaleDateString()} at {selectedTime}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-accent">{selectedService && formatPrice(selectedService.price)}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Please arrive 10 minutes early for your appointment. If you need to reschedule, please call us at
                  least 24 hours in advance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={() => (window.location.href = "/")}>
                    Back to Home
                  </Button>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Add to Calendar</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
