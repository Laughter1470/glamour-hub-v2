import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { WhatsAppWidget } from "@/components/whatsapp-widget"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hairvolution - Redefining Beauty in Abuja | Premium Beauty Salon",
  description:
    "Premium beauty salon in Wuye, Abuja offering professional hair styling, braiding, coloring, spa treatments, and beauty products. Book your appointment today!",
  keywords: [
    "beauty salon Abuja",
    "hair styling Wuye",
    "braiding salon Nigeria",
    "hair coloring Abuja",
    "spa treatments",
    "bridal hair makeup",
    "beauty products Nigeria",
    "professional hairstylist",
  ],
  authors: [{ name: "Hairvolution Salon" }],
  creator: "Hairvolution",
  publisher: "Hairvolution",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hairvolution.ng"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hairvolution - Redefining Beauty in Abuja",
    description:
      "Premium beauty salon in Wuye, Abuja offering professional hair styling, braiding, coloring, spa treatments, and beauty products.",
    url: "https://hairvolution.ng",
    siteName: "Hairvolution",
    images: [
      {
        url: "/luxury-beauty-salon-interior-with-elegant-styling-.png",
        width: 1200,
        height: 630,
        alt: "Hairvolution Salon Interior",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hairvolution - Redefining Beauty in Abuja",
    description:
      "Premium beauty salon in Wuye, Abuja offering professional hair styling, braiding, coloring, spa treatments, and beauty products.",
    images: ["/luxury-beauty-salon-interior-with-elegant-styling-.png"],
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
  generator: "v0.app",
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
        <WhatsAppWidget />
      </body>
    </html>
  )
}
