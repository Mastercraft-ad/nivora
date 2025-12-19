import { Link } from "wouter";
import { ArrowRight, Award, Users, Leaf, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import teamImage from "@assets/stock_images/professional_laundry_4a80a06d.jpg";

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We never compromise on quality. Every garment is treated with the utmost care and attention to detail.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We listen, adapt, and go the extra mile to exceed expectations.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    description: "We use environmentally friendly products and processes to minimize our impact on the planet.",
  },
  {
    icon: Heart,
    title: "Community Care",
    description: "We're proud to serve our local community and contribute to neighborhood initiatives.",
  },
];

const stats = [
  { value: "1+", label: "Years in Business" },
  { value: "250+", label: "Happy Customers" },
  { value: "50,000+", label: "Items Cleaned" },
  { value: "4.9", label: "Star Rating" },
];

const team = [
  {
    name: "Moses Pius",
    role: "Founder & CEO",
    bio: "With 1+ years in the textile industry, Moses founded Nivora to bring professional quality care to everyday laundry.",
  },
  {
    name: "Michael Josh",
    role: "Operations Manager",
    bio: "Michael ensures every order is processed efficiently and every customer receives timely, quality service.",
  },
  {
    name: "Emily Grace",
    role: "Quality Specialist",
    bio: "Emily leads our quality control team, ensuring every garment meets our exacting standards before delivery.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-16 border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">About Us</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" data-testid="text-about-title">
            About Nivora
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Dedicated to providing premium laundry and dry cleaning services with a 
            commitment to quality, convenience, and customer satisfaction.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 items-center lg:grid-cols-2">
            <div>
              <img
                src={teamImage}
                alt="Nivora team"
                className="w-full h-80 md:h-96 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-our-story">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2024, Nivora began with a simple mission: to transform the 
                  laundry experience from a chore into a convenience. What started as a 
                  small local service has grown into a trusted name in professional 
                  garment care.
                </p>
                <p>
                  Our journey began when founder Sarah Johnson noticed how much time 
                  busy professionals were spending on laundry instead of the things 
                  that matter most. She envisioned a service that would deliver 
                  professional-quality results with unmatched convenience.
                </p>
                <p>
                  Today, we serve thousands of satisfied customers across the city, 
                  maintaining the same dedication to quality and customer care that 
                  defined us from day one. Every garment that passes through our 
                  facility is treated as if it were our own.
                </p>
              </div>
              <Link href="/services">
                <Button className="gap-2" data-testid="button-explore-services">
                  Explore Our Services
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-our-values">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at Nivora.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center" data-testid={`card-value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
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

      <section className="py-16 md:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-our-team">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The dedicated professionals behind Nivora.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} data-testid={`card-team-${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto h-24 w-24 rounded-full bg-muted mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-about-cta">
            Ready to Experience the Nivora Difference?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their garments.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/booking">
              <Button size="lg" variant="secondary" className="gap-2" data-testid="button-about-book">
                Book Your First Service
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground" data-testid="button-about-contact">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
