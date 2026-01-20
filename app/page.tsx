// app/page.tsx
import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesPreview } from "@/components/services-preview"
import { Footer } from "@/components/footer"

// Page-specific metadata (overrides the one in layout.tsx for the homepage only)
export const metadata: Metadata = {
  title: "Glamour Hub – Premium Beauty Studio & Shop in Maitama, Abuja",
  description:
    "Professional hair styling, makeup, nails, spa treatments and curated beauty products. Book your appointment or shop online with nationwide delivery.",
  openGraph: {
    title: "Glamour Hub – Premium Beauty Studio & Shop in Maitama, Abuja",
    description:
      "Your one-stop beauty destination in Abuja | Services + Online Shop + Nationwide Delivery",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesPreview />
      <Footer />
    </main>
  )
}