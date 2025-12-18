import { Link } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import laundryImage from "@assets/stock_images/professional_laundry_f3ce0c52.jpg";
import dryCleaningImage from "@assets/stock_images/dry_cleaning_clothes_014db305.jpg";
import ironingImage from "@assets/stock_images/iron_steam_pressing__1a9c9008.jpg";
import stainRemovalImage from "@assets/stock_images/stain_removal_cleani_0c35f2f0.jpg";

const services = [
  {
    id: "laundry",
    title: "Laundry Services",
    description: "Our professional laundry service handles all your everyday clothing needs. We use premium detergents and fabric softeners to ensure your clothes come out fresh, clean, and soft. Each item is carefully sorted by color and fabric type for optimal care.",
    image: laundryImage,
    price: "From ₦3,500/lb",
    features: [
      "Wash, dry, and fold service",
      "Color and fabric sorting",
      "Premium eco-friendly detergents",
      "Careful handling of all items",
      "Same-day service available",
    ],
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    description: "Trust us with your most delicate and valuable garments. Our state-of-the-art dry cleaning process is gentle on fabrics while effectively removing dirt and odors. Perfect for suits, formal wear, silk, and other specialty items.",
    image: dryCleaningImage,
    price: "From ₦13,500/item",
    features: [
      "Gentle solvent cleaning process",
      "Expert handling of delicate fabrics",
      "Suits, dresses, and formal wear",
      "Silk, wool, and cashmere safe",
      "Professional pressing included",
    ],
  },
  {
    id: "ironing",
    title: "Ironing & Pressing",
    description: "Get that crisp, professional look for all your garments. Our skilled team uses professional-grade equipment to deliver perfectly pressed clothes every time. Ideal for business attire, special occasions, or when you want to look your best.",
    image: ironingImage,
    price: "From ₦6,000/item",
    features: [
      "Professional steam pressing",
      "Crisp, wrinkle-free finish",
      "Shirts, pants, and dresses",
      "Business attire specialists",
      "Rush service available",
    ],
  },
  {
    id: "stain-removal",
    title: "Stain Removal",
    description: "Don't give up on stained garments! Our stain removal specialists use advanced techniques and products to tackle even the toughest stains. From wine and coffee to oil and ink, we'll work to restore your clothes to their original condition.",
    image: stainRemovalImage,
    price: "From ₦9,000/item",
    features: [
      "Specialized stain treatment",
      "Wine, coffee, and food stains",
      "Oil and grease removal",
      "Ink and dye treatment",
      "Pre-treatment assessment",
    ],
  },
];

const addOns = [
  {
    title: "Free Pickup & Delivery",
    description: "Convenient doorstep service at no extra charge for orders over ₦45,000",
  },
  {
    title: "Express Same-Day Service",
    description: "Need it fast? Get your items back the same day for a small fee",
  },
  {
    title: "Special Fabric Care",
    description: "Specialized handling for vintage, designer, or heirloom garments",
  },
  {
    title: "Folding Preferences",
    description: "Let us know how you like your clothes folded or hung",
  },
];

export default function Services() {
  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-16 border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Services</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" data-testid="text-services-page-title">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            From everyday laundry to specialized garment care, we offer a full range of 
            professional cleaning services. Each service is backed by our quality guarantee 
            and delivered with care.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid gap-8 items-center lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
                data-testid={`service-section-${service.id}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                </div>
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                      {service.title}
                    </h2>
                    <Badge variant="secondary" className="mt-3">
                      {service.price}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/booking?service=${service.id}`}>
                    <Button size="lg" className="gap-2 mt-2" data-testid={`button-book-${service.id}`}>
                      Book This Service
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-addons-title">
              Service Add-Ons
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Customize your experience with our convenient add-on services.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {addOns.map((addon) => (
              <Card key={addon.title} className="text-center" data-testid={`card-addon-${addon.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-6">
                  <h3 className="font-semibold">{addon.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-ready-title">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Book your service now and experience the Nivora difference. 
            First-time customers get 15% off their first order!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/booking">
              <Button size="lg" className="gap-2" data-testid="button-services-cta-book">
                Book Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" data-testid="button-services-cta-contact">
                Have Questions?
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
