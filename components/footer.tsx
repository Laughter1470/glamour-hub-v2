// components/footer.tsx
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <div className="text-3xl font-bold tracking-tight">
              Glamour<span className="text-accent">Hub</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
              Your premium beauty studio & online shop in Maitama, Abuja. 
              Professional services and curated beauty products delivered nationwide.
            </p>
            <div className="flex space-x-5">
              <Link href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {["About", "Services", "Gallery", "Shop", "Booking", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-").replace(/-now$/, "")}`}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Services */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Popular Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Hair Styling & Coloring</li>
              <li>Professional Makeup</li>
              <li>Manicure & Pedicure</li>
              <li>Spa & Wellness Treatments</li>
              <li>Bridal Packages</li>
            </ul>
          </div>

          {/* Contact Info – Your real details */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Visit Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  Holy Trinity Catholic Church,<br />
                  Maitama, Abuja, Nigeria
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <Link href="tel:+2347035118531" className="text-primary-foreground/80 hover:text-accent">
                  0703 511 8531
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <Link href="mailto:fidelisemma1470@gmail.com" className="text-primary-foreground/80 hover:text-accent">
                  fidelisemma1470@gmail.com
                </Link>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent mt-0.5" />
                <div className="text-primary-foreground/80">
                  <div>Mon–Sat: 9:00 AM – 7:00 PM</div>
                  <div>Sunday: 11:00 AM – 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} Glamour Hub. All rights reserved /
            Crafted with passion in Abuja
          </p>
        </div>
      </div>
    </footer>
  )
}
