// components/navigation.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/shop", label: "Shop" },
    { href: "/booking", label: "Book Now" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo – Glamour Hub */}
          <Link href="/" className="flex items-center space-x-1">
            <div className="flex items-center space-x-3">
  {/* Logo Image */}
  <Image 
    src="/logo.png" 
    alt="GlamourHub" 
    width={44} 
    height={44}
    className="flex-shrink-0"
    priority 
  />
  
  {/* Text with Black + Gold */}
  <div>
    <div className="text-2xl font-bold tracking-tight text-black dark:text-white">
      Glamour<span className="text-accent">Hub</span>
    </div>
  </div>
</div>

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Phone Number (real) + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Phone – Desktop */}
            <div className="hidden sm:flex items-center space-x-2 text-sm font-medium text-foreground">
              <Phone className="h-4 w-4 text-accent" />
              <Link
                href="tel:+2347035118531"
                className="hover:text-accent transition-colors"
              >
                0703 511 8531
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 bg-card border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-foreground hover:text-accent hover:bg-muted rounded-md transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 py-3 text-sm font-medium flex items-center space-x-2 text-foreground">
                <Phone className="h-4 w-4 text-accent" />
                <Link href="tel:+2347035118531" className="hover:text-accent">
                  0703 511 8531
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}