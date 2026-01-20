import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { WhatsAppWidget } from "@/components/whatsapp-widget"
import "./globals.css"

export const metadata: Metadata = {
  title: "Glamour Hub – Premium Beauty Studio & Shop in Abuja",
  description:
    "Your one-stop beauty destination in Maitama, Abuja. Professional hair, makeup, nails, spa treatments, and curated beauty products. Book your appointment or shop online today!",
  keywords: [
    "beauty salon Abuja",
    "hair styling Maitama",
    "makeup artist Abuja",
    "nails Abuja",
    "spa treatments",
    "bridal makeup Abuja",
    "beauty products Nigeria",
    "Glamour Hub Abuja",
  ],
  authors: [{ name: "Glamour Hub" }],
  creator: "Glamour Hub",
  publisher: "Glamour Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://glamourhub.ng"), // you can change this later when you buy the domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Glamour Hub – Premium Beauty Studio & Shop in Abuja",
    description:
      "Professional beauty services and curated products in Maitama, Abuja. Hair | Makeup | Nails | Spa | Shop online with nationwide delivery.",
    url: "https://glamourhub.ng",
    siteName: "Glamour Hub",
    images: [
      {
        url: "/og-image.jpg", // we'll add a nice OG image later in /public
        width: 1200,
        height: 630,
        alt: "Glamour Hub – Premium Beauty Studio Abuja",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glamour Hub – Premium Beauty Studio & Shop in Abuja",
    description:
      "Hair, makeup, nails, spa & beauty products in Maitama, Abuja with nationwide delivery.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <WhatsAppWidget phone="2347035118531" /> {/* Your number without the leading 0 */}
      </body>
    </html>
  )
}