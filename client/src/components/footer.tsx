import { Link } from "wouter";
import { Phone, MapPin, Clock } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "@assets/Abstract_logo_for_website_developers_1766098228256.png";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Book Now" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Laundry Services",
  "Dry Cleaning",
  "Ironing & Pressing",
  "Stain Removal",
  "Express Service",
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" data-testid="link-footer-logo">
              <img src={logoImage} alt="Nivora logo" className="h-9 w-9 object-contain" />
              <span className="text-xl font-bold tracking-tight">Nivora</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium laundry and dry cleaning services with a commitment to quality, 
              hygiene, and customer satisfaction.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" data-testid="button-social-whatsapp">
                <SiWhatsapp className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" data-testid="button-social-facebook">
                <SiFacebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" data-testid="button-social-instagram">
                <SiInstagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>No.58 Yadi Street, G9 Estate Dutse, Jigawa State</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+2348164248021</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p>Mon - Fri: 8am - 5pm</p>
                  <p>Sat: 9am - 6pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              2024 Nivora Laundry. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
