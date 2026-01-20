// app/booking/page.tsx
"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Scissors,
  Palette,
  Sparkles,
  Gem,
  Heart,
  Crown,
  Clock,
  Phone,
  MapPin,
  CheckCircle,
  ChevronRight,
  X,
} from "lucide-react"

type Service = {
  name: string
  price: string
  duration: string
  desc: string
}

type PaymentBooking = {
  bookingId?: string
  serviceName: string
  totalPrice: number
  clientEmail: string
  currency?: string
}

const categories: { name: string; icon: any; services: Service[] }[] = [
  {
    name: "Hair Styling",
    icon: Scissors,
    services: [
      {
        name: "Precision Hair Cut",
        price: "₦18,000",
        duration: "60 mins",
        desc: "Custom haircut designed to complement your face shape, lifestyle, and personal style. Includes wash, cut, and blow-dry.",
      },
      {
        name: "Blowout & Styling",
        price: "₦15,000",
        duration: "45 mins",
        desc: "Luxurious wash and professional blow-dry. Choose from sleek straight, bouncy curls, or beach waves.",
      },
      {
        name: "Deep Conditioning",
        price: "₦25,000",
        duration: "60 mins",
        desc: "Intensive repair treatment for damaged, dry, or chemically treated hair. Restores moisture and shine.",
      },
      {
        name: "Keratin Treatment",
        price: "₦80,000",
        duration: "150 mins",
        desc: "Premium Brazilian blowout that eliminates frizz and makes hair silky smooth for up to 6 months.",
      },
    ],
  },
  {
    name: "Hair Coloring",
    icon: Palette,
    services: [
      {
        name: "Full Color",
        price: "₦45,000",
        duration: "120 mins",
        desc: "Complete color transformation using premium ammonia-free dyes. Includes scalp protection and shine treatment.",
      },
      {
        name: "Balayage/Highlights",
        price: "₦55,000",
        duration: "150 mins",
        desc: "Hand-painted, natural-looking highlights or balayage for that sun-kissed glow all year round.",
      },
      {
        name: "Root Touch-Up",
        price: "₦20,000",
        duration: "60 mins",
        desc: "Seamless coverage of regrowth. Perfect for maintaining your color between full sessions.",
      },
      {
        name: "Fashion Color",
        price: "₦70,000",
        duration: "180 mins",
        desc: "Bold and vibrant colors — rose gold, silver, pastel pink, electric blue, and more.",
      },
    ],
  },
  {
    name: "Braids & Extensions",
    icon: Sparkles,
    services: [
      {
        name: "Box Braids",
        price: "₦35,000",
        duration: "4–6 hrs",
        desc: "Protective style with small to jumbo braids. Waist or mid-back length. Lightweight and versatile.",
      },
      {
        name: "Cornrows",
        price: "₦20,000",
        duration: "2–3 hrs",
        desc: "Neat and artistic scalp braids. From simple to intricate designs with added beads or cuffs.",
      },
      {
        name: "Goddess Locs",
        price: "₦45,000",
        duration: "5–7 hrs",
        desc: "Boho-chic faux locs with soft, wavy curls. Lightweight and perfect for festivals or vacations.",
      },
      {
        name: "Weave Install",
        price: "₦40,000",
        duration: "3–4 hrs",
        desc: "Professional sew-in or glue-less installation using premium virgin hair extensions.",
      },
    ],
  },
  {
    name: "Nails",
    icon: Gem,
    services: [
      {
        name: "Luxury Manicure",
        price: "₦15,000",
        duration: "60 mins",
        desc: "Full nail shaping, cuticle care, exfoliation, massage + long-lasting gel polish.",
      },
      {
        name: "Spa Pedicure",
        price: "₦18,000",
        duration: "75 mins",
        desc: "Foot soak, scrub, callus removal, massage + flawless gel polish application.",
      },
      {
        name: "Nail Art Add-on",
        price: "₦8,000+",
        duration: "+30 mins",
        desc: "Hand-painted designs, crystals, chrome, 3D art — make your nails a masterpiece.",
      },
      {
        name: "Gel-X Extensions",
        price: "₦35,000",
        duration: "120 mins",
        desc: "Soft gel tips for long, strong, natural-looking nails. Custom shapes and lengths.",
      },
    ],
  },
  {
    name: "Makeup & Facials",
    icon: Heart,
    services: [
      {
        name: "Full Glam Makeup",
        price: "₦30,000",
        duration: "60 mins",
        desc: "Flawless full-face beat using premium brands. Waterproof, long-lasting, photo-ready.",
      },
      {
        name: "Signature Facial",
        price: "₦25,000",
        duration: "75 mins",
        desc: "Deep cleansing, exfoliation, extractions, mask + LED light therapy for glowing skin.",
      },
      {
        name: "Lash Lift + Tint",
        price: "₦20,000",
        duration: "60 mins",
        desc: "Natural lash enhancement. Curl + dark tint for that wide-awake look — no extensions needed.",
      },
      {
        name: "Bridal Makeup",
        price: "₦80,000",
        duration: "90 mins",
        desc: "Timeless, tear-proof, long-wear bridal look. Includes touch-up kit.",
      },
    ],
  },
  {
    name: "Bridal & Special Events",
    icon: Crown,
    services: [
      {
        name: "Complete Bridal Package",
        price: "₦100,000",
        duration: "Full Day",
        desc: "Hair + Makeup + Touch-ups all day. Be camera-ready from morning till night.",
      },
      {
        name: "Bridal Trial",
        price: "₦50,000",
        duration: "3 hrs",
        desc: "Perfect your exact wedding look in advance. Photos included.",
      },
      {
        name: "Event Glam",
        price: "₦30,000",
        duration: "60 mins",
        desc: "Red carpet, birthday, or dinner — arrive looking like a celebrity.",
      },
      {
        name: "Group Styling (4+)",
        price: "₦120,000+",
        duration: "Varies",
        desc: "Bride + bridesmaids or full wedding party. Coordinated looks.",
      },
    ],
  },
]

const CANCELLATION_POLICY = `Cancellation & No-Show Policy

1. Credit Card Guarantee
To confirm your appointment, a valid credit card is required on file.

2. Cancellation Policy (24+ Hours Notice): No charge
Cancellation Less Than 24 Hours: 50% fee charged to card on file

3. No-Show Policy: 100% of service price charged to card on file

4. Late Arrival (15+ minutes): Considered late cancellation (50% fee)

Location: Holy Trinity Church, Maitama, Abuja
Contact: 0703 511 8531`

const TERMS_AND_CONDITIONS = `General Terms & Conditions

1. All services provided by certified professionals
2. Clients must disclose allergies/medical conditions prior to service
3. Prices subject to change (booked price honored)
4. Personal property not our responsibility
5. Data handled per Privacy Policy

Contact: 0703 511 8531 | @glamourhub_ng`


const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("")
  const [clientInfo, setClientInfo] = useState({ name: "", phone: "", email: "", notes: "" })
  const [pendingBooking, setPendingBooking] = useState<PaymentBooking | null>(null)
  const [receiptText, setReceiptText] = useState("")
  const [showReceipt, setShowReceipt] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalContent, setModalContent] = useState("")

  const parsePriceToNumber = (priceStr: string | undefined) => {
    if (!priceStr) return 0
    const digits = priceStr.replace(/[^0-9.]/g, "")
    const n = parseFloat(digits || "0")
    return Number.isNaN(n) ? 0 : n
  }

const [selectedDepositOption, setSelectedDepositOption] = useState<number>(25)
const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false)

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount)

const totalPriceNumber = parsePriceToNumber(selectedService?.price)
const amountToCharge = totalPriceNumber * (selectedDepositOption / 100)


  const resetBookingState = () => {
    setPendingBooking(null)
    setSelectedService(null)
    setDate(undefined)
    setTime("")
    setClientInfo({ name: "", phone: "", email: "", notes: "" })
  }

  const handleBooking = () => {
    if (!selectedService || !clientInfo.email) return

    const bookingPayload: PaymentBooking = {
      bookingId: `bk_${Date.now()}`,
      serviceName: selectedService.name,
      totalPrice: parsePriceToNumber(selectedService.price),
      clientEmail: clientInfo.email,
      currency: "NGN",
    }
    setPendingBooking(bookingPayload)
  }

  const onBookingConfirmed = async (transactionId: string, amountPaid: number) => {
    if (!selectedService) return

    const fullPrice = parsePriceToNumber(selectedService.price)
    const depositPercent = selectedDepositOption
    const depositAmount = amountPaid
    const balance = fullPrice - depositAmount

    const bookingDetails = {
      customerInfo: {
        name: clientInfo.name,
        phone: clientInfo.phone,
        email: clientInfo.email,
        notes: clientInfo.notes,
      },
      service: {
        name: selectedService.name,
        price: selectedService.price,
        duration: selectedService.duration,
        desc: selectedService.desc,  // ← ADD THIS LINE
      },
      appointment: {
        date: date?.toDateString(),
        time: time,
      },
      paymentRef: transactionId,
      totalCost: fullPrice,
      paidCost: depositAmount,
      dateCreated: new Date().toLocaleString(),
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      })

      if (response.ok) {
        console.log("Booking email sent successfully")
      }
    } catch (err) {
      console.error("Failed to communicate with email API", err)
    }

    alert(`Booking confirmed!\nReference: ${transactionId}\nAmount Paid: ₦${depositAmount.toLocaleString()}`)

    const receipt = `GLAMOUR HUB OFFICIAL APPOINTMENT LISTING
Thank you for booking with us!

Booking Created: ${new Date().toLocaleDateString()} | 
${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service: ${selectedService.name}
Description: ${selectedService.desc}
Duration: ${selectedService.duration}

Full Price: ₦${fullPrice.toLocaleString()}
Deposit (${depositPercent}%): ₦${depositAmount.toLocaleString()}
Balance Due: ₦${balance.toLocaleString()} 
(payable on arrival)

Appointment:
${date?.toDateString()} at ${time}

Customer Information:
• Name: ${clientInfo.name}
• Phone: ${clientInfo.phone}
• Email: ${clientInfo.email || "Not provided"}
• Special Requests: ${clientInfo.notes || "None"}

Reference: ${transactionId}
Location: Holy Trinity Church, Maitama, Abuja
Contact: 0703 511 8531

Please arrive 10 minutes early for your appointment. 
If you need to reschedule, 
please call us at least 24 hours in advance.

We look forward to making you look & feel fabulous!
@glamourhub_ng • www.glamourhub.ng`

    setReceiptText(receipt)
    setShowReceipt(true)
    resetBookingState()
  }

  const handleTestPayment = () => {
  if (!selectedService) return
  const testRef = `BK_${Date.now()}`
  const testAmount = amountToCharge // use the percentage amount
  onBookingConfirmed(testRef, testAmount)
}

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-accent/50 to-muted/50 py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Book Your <span className="text-accent">Appointment</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
            Select your desired service and secure your spot instantly
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Badge variant="secondary" className="px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden sm:inline">Holy Trinity Church</span>
              <span className="sm:hidden">Holy Trinity</span>
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              0703 511 8531
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {!selectedService ? (
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Choose Your Service</h2>
              <Accordion type="single" collapsible className="space-y-6">
                {categories.map((cat, i) => {
                  const Icon = cat.icon
                  return (
                    <AccordionItem
                      key={i}
                      value={`cat-${i}`}
                      className="border-0 shadow-lg rounded-lg sm:rounded-2xl overflow-hidden bg-card"
                    >
                      <AccordionTrigger className="px-4 sm:px-8 py-5 sm:py-8 text-lg sm:text-2xl font-bold hover:no-underline hover:bg-accent/5 transition-colors">
                        <div className="flex items-center gap-3 sm:gap-5">
                          <div className="p-2 sm:p-4 bg-accent/10 rounded-lg sm:rounded-2xl">
                            <Icon className="h-6 sm:h-10 w-6 sm:w-10 text-accent" />
                          </div>
                          <span>{cat.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-8 pb-6 sm:pb-10 pt-4 bg-muted/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          {cat.services.map((service, j) => (
                            <Card
                              key={j}
                              className="cursor-pointer hover:shadow-xl hover:border-accent transition-all group"
                              onClick={() => setSelectedService(service)}
                            >
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-xl group-hover:text-accent transition-colors">
                                    {service.name}
                                  </CardTitle>
                                  <ChevronRight className="h-6 w-6 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <CardDescription className="mt-3 text-base">{service.desc}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-2xl font-bold text-accent">{service.price}</p>
                                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                                      <Clock className="h-4 w-4 mr-1" />
                                      {service.duration}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Select Date & Time</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date() || d.getDay() === 0}
                  className="rounded-xl border shadow-lg"
                />
                <div className="mt-9 sm:mt-8">
                  <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Available Times</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                    {timeSlots.map((t) => (
                      <Button
                        key={t}
                        variant={time === t ? "default" : "outline"}
                        size="lg"
                        onClick={() => setTime(t)}
                        className={time === t ? "bg-accent hover:bg-accent/90 text-white" : ""}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <Card className="border-2 border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      {selectedService.name}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedService(null)}
                        className="w-full sm:w-auto"
                      >
                        Change Service
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                      {selectedService.desc}
                    </p>
                    <Separator />
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-base sm:text-lg">
                      <div>
                        <span className="text-muted-foreground">Price:</span>
                        <p className="font-bold text-accent text-2xl">{selectedService.price}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-bold flex items-center mt-1">
                          <Clock className="h-5 w-5 mr-2 text-accent" />
                          {selectedService.duration}
                        </p>
                      </div>
                    </div>
                    {date && time && (
                      <div className="bg-accent/10 rounded-lg p-4">
                        <p className="font-medium flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                          {date.toDateString()} at {time}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {!pendingBooking ? (
  <div className="space-y-4 sm:space-y-5">
    <h3 className="text-xl sm:text-2xl font-bold">Your Details</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div>
        <Label>Full Name</Label>
        <Input
          value={clientInfo.name}
          onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
          placeholder="Ada Obi"
        />
      </div>
      <div>
        <Label>Phone Number</Label>
        <Input
          value={clientInfo.phone}
          onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
          placeholder="070XXXXXXXX"
        />
      </div>
    </div>
    <div>
      <Label>Email</Label>
      <Input
        type="email"
        value={clientInfo.email}
        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
        placeholder="ada@example.com"
      />
    </div>
    <div>
      <Label>Special Requests</Label>
      <Textarea
        value={clientInfo.notes}
        onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
        placeholder="E.g. I want medium box braids with curls at the ends..."
        rows={4}
      />
    </div>

    <Button
      size="lg"
      className="w-full bg-accent hover:bg-accent/90 text-base sm:text-lg font-semibold py-5 sm:py-7"
      onClick={handleBooking}
      disabled={!date || !time || !clientInfo.name || !clientInfo.phone}
    >
      Confirm & Book Appointment
    </Button>
  </div>
) : (
  <div className="space-y-4 sm:space-y-6">
    <h3 className="text-xl sm:text-2xl font-bold">Secure Your Booking</h3>

    {/* Payment options card */}
    <Card className="border-2 border-accent/20">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Choose Payment Option</CardTitle>
        <CardDescription>
          Total: {formatCurrency(totalPriceNumber || 0)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[25, 50, 100].map((p) => {
            const amt = (totalPriceNumber || 0) * (p / 100)
            const active = selectedDepositOption === p
            return (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedDepositOption(p)}
                className={`py-3 rounded-lg border text-sm font-semibold transition-all ${
                  active
                    ? "bg-accent text-white border-accent shadow"
                    : "bg-muted border-border hover:border-accent"
                }`}
              >
                <div>{p}%</div>
                <div className="text-xs opacity-80">{formatCurrency(amt || 0)}</div>
              </button>
            )
          })}
        </div>

        <div className="bg-accent/10 rounded-lg p-3 text-sm">
          <p className="font-semibold">Pay now:</p>
          <p className="text-lg font-bold">
            {formatCurrency(amountToCharge || 0)}
          </p>
          {selectedDepositOption < 100 && (
            <p className="text-xs text-muted-foreground mt-1">
              Balance due on arrival:{" "}
              {formatCurrency((totalPriceNumber || 0) - (amountToCharge || 0))}
            </p>
          )}
        </div>

        {/* Terms checkbox */}
        <label className="flex items-start gap-3 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={hasAgreedToTerms}
            onChange={(e) => setHasAgreedToTerms(e.target.checked)}
            className="mt-1 w-4 h-4"
          />
          <span>
            I agree to the{" "}
            <button
                  type="button"
                  className="text-accent underline"
                  onClick={() => {
                    setModalTitle("Terms & Conditions")
                    setModalContent(TERMS_AND_CONDITIONS)
                    setIsModalOpen(true)
                  }}
                >
                  Terms & Conditions
                </button>{" "}
            and{" "}
            <button
                type="button"
                className="text-accent underline"
                onClick={() => {
                  setModalTitle("Cancellation & No-Show Policy")
                  setModalContent(CANCELLATION_POLICY)
                  setIsModalOpen(true)
                }}
              >
                Cancellation Policy
              </button>
            .
          </span>
        </label>
      </CardContent>
    </Card>

    <Button
      variant="outline"
      className="w-full bg-accent hover:bg-accent/70 text-base sm:text-lg font-semibold py-5 sm:py-7"
      onClick={() => {
        if (!hasAgreedToTerms) {
          alert("Please agree to the Terms & Conditions and Cancellation Policy before continuing.")
          return
        }
        handleTestPayment()
      }}
      disabled={!hasAgreedToTerms}
    >
      Simulate Payment & Complete Booking
    </Button>

    <div className="mt-2 text-sm text-muted-foreground">
      <button
        className="text-accent underline"
        onClick={() => setPendingBooking(null)}
      >
        Go back to edit details
      </button>
      <div className="mt-2">
      Please arrive 10 minutes early for your appointment. 
      If you need to reschedule, please call us at least 24 hours in advance.
      </div>
    </div>
  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {showReceipt && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl border">
      {/* Header */}
      <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">GLAMOUR HUB RECEIPT</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setShowReceipt(false)
            resetBookingState()
          }}
          className="h-10 w-10"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Compact Receipt Content */}
      <div className="p-6 text-sm text-gray-700 leading-relaxed">
        <div className="space-y-4 whitespace-pre-wrap break-words">
          {receiptText.split('\n').map((line, i) => (
            line.trim() ? (
              <div key={i} className="py-1">
                {line.includes('━━━━━━━━') ? (
                  <div className="border-t border-gray-300 my-2" />
                ) : line.startsWith('• ') ? (
                  <div className="flex items-center gap-2 pl-4">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span>{line.slice(2)}</span>
                  </div>
                ) : (
                  <p className="break-words">{line}</p>
                )}
              </div>
            ) : (
              <div key={i} className="h-2" />
            )
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-4 border-t bg-white sticky bottom-0 flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.clipboard) {
              navigator.clipboard.writeText(receiptText)
            }
          }}
          className="flex-1 bg-accent hover:bg-accent/90 text-white h-11 font-semibold"
        >
          📋 Copy Receipt
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setShowReceipt(false)
            resetBookingState()
          }}
          className="flex-1 h-11 font-semibold"
        >
          Close
        </Button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border">
      {/* Header */}
      <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">{modalTitle}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsModalOpen(false)}
          className="h-10 w-10"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Content */}
      <div className="p-6 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
        <div className="[&>br]:hidden [&>p]:mb-3 [&>ul]:list-disc [&>ul]:ml-6 [&>li]:mb-1">
          {modalContent.split('\n').map((line, i) => (
            line.trim() ? (
              line.startsWith('1. ') || line.match(/^\d+\./) ? (
                <div key={i} className="ml-6" dangerouslySetInnerHTML={{ __html: line }} />
              ) : line.startsWith('- ') ? (
                <div key={i} className="list-disc list-inside ml-4" dangerouslySetInnerHTML={{ __html: line.slice(2) }} />
              ) : (
                <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
              )
            ) : <br key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
)}
      <Footer />
    </main>
  )
} 
