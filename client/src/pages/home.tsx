import { Link } from "wouter";
import { Shirt, Sparkles, Clock, Leaf, Truck, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/stock_images/professional_laundry_f3ce0c52.jpg";

const services = [
  {
    icon: Shirt,
    title: "Laundry Services",
    description: "Professional washing, drying, and folding for all your everyday garments.",
  },
  {
    icon: Sparkles,
    title: "Dry Cleaning",
    description: "Expert care for delicate fabrics, suits, and formal wear.",
  },
  {
    icon: Clock,
    title: "Ironing & Pressing",
    description: "Crisp, wrinkle-free clothes ready for any occasion.",
  },
  {
    icon: Shield,
    title: "Stain Removal",
    description: "Specialized treatment for tough stains and fabric restoration.",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Most orders ready within 24-48 hours. Same-day service available for urgent needs.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "We use environmentally safe cleaning products that are gentle on fabrics and the planet.",
  },
  {
    icon: Truck,
    title: "Free Pickup & Delivery",
    description: "Convenient doorstep service available. We come to you on your schedule.",
  },
];

const stats = [
  { value: "1+", label: "Years Experience" },
  { value: "250+", label: "Happy Customers" },
  { value: "24hr", label: "Fast Turnaround" },
  { value: "100%", label: "Satisfaction Rate" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Professional laundry service"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl" data-testid="text-hero-title">
              Premium Laundry & Dry Cleaning Services
            </h1>
            <p className="mt-6 text-lg text-white/90 md:text-xl" data-testid="text-hero-description">
              Experience the difference of truly clean clothes. Professional care for your 
              garments with convenient pickup and delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/booking">
                <Button size="lg" className="gap-2" data-testid="button-hero-book-now">
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 backdrop-blur-sm" data-testid="button-hero-services">
                  Our Services
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Same-Day Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Free Pickup & Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Eco-Friendly Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-services-title">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From everyday laundry to specialized garment care, we offer comprehensive 
              cleaning solutions tailored to your needs.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title} className="group hover-elevate transition-all" data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-muted-foreground">{service.description}</p>
                  <Link href="/services">
                    <Button variant="link" className="mt-4 p-0 h-auto gap-1" data-testid={`link-learn-more-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-why-choose-title">
              Why Choose Nivora?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine professional expertise with modern convenience to deliver 
              exceptional laundry and dry cleaning services.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center" data-testid={`benefit-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-6">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="text-4xl font-bold text-primary md:text-5xl">{stat.value}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-cta-title">
            Ready to Experience Premium Care?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Book your first service today and discover why thousands of customers 
            trust Nivora with their garments.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/booking">
              <Button size="lg" variant="secondary" className="gap-2" data-testid="button-cta-book">
                Book Your Service
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground" data-testid="button-cta-contact">
                Contact Us
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-80">
            Mon - Fri: 8am - 5pm | Sat: 9am - 6pm
          </p>
        </div>
      </section>
    </div>
  );
}
