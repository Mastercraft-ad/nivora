import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Shirt, Sparkles, Clock, Shield, Zap, Calendar, User, Phone, Mail, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const services = [
  {
    id: "laundry",
    title: "Laundry Services",
    description: "Wash, dry, and fold service",
    price: "From ₦3,500/lb",
    icon: Shirt,
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    description: "Expert care for delicate fabrics",
    price: "From ₦13,500/item",
    icon: Sparkles,
  },
  {
    id: "ironing",
    title: "Ironing & Pressing",
    description: "Crisp, wrinkle-free finish",
    price: "From ₦6,000/item",
    icon: Clock,
  },
  {
    id: "stain-removal",
    title: "Stain Removal",
    description: "Specialized stain treatment",
    price: "From ₦9,000/item",
    icon: Shield,
  },
  {
    id: "express",
    title: "Express Same-Day",
    description: "Urgent service available",
    price: "+₦15,000 service fee",
    icon: Zap,
  },
];

const bookingSchema = z.object({
  serviceType: z.string().min(1, "Please select a service"),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().optional(),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
  specialInstructions: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

function CalendlyWidget({ serviceType }: { serviceType: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/30 p-6 text-center">
        <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h3 className="text-lg font-semibold mb-2">Schedule with Calendly</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click the button below to open our scheduling calendar and pick a convenient time for pickup.
        </p>
        <a 
          href="https://calendly.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button className="gap-2" data-testid="button-open-calendly">
            <Calendar className="h-4 w-4" />
            Open Scheduling Calendar
          </Button>
        </a>
        <p className="text-xs text-muted-foreground mt-4">
          Note: Connect your Calendly account to enable inline scheduling. Selected service: {serviceType || "None"}
        </p>
      </div>
      <div 
        className="calendly-inline-widget min-h-[400px] rounded-lg overflow-hidden"
        data-url="https://calendly.com"
        data-testid="calendly-widget"
      />
    </div>
  );
}

export default function Booking() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const serviceFromUrl = searchParams.get("service") || "";
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedService, setSelectedService] = useState(serviceFromUrl);
  const [bookingMethod, setBookingMethod] = useState<"form" | "calendly">("form");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: serviceFromUrl,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      scheduledDate: "",
      scheduledTime: "",
      specialInstructions: "",
    },
  });

  useEffect(() => {
    if (serviceFromUrl) {
      form.setValue("serviceType", serviceFromUrl);
      setSelectedService(serviceFromUrl);
    }
  }, [serviceFromUrl, form]);

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      return apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "We've received your booking request. Check your email for confirmation details.",
      });
      setBookingSuccess(true);
      form.reset();
      setSelectedService("");
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    form.setValue("serviceType", value);
  };

  const selectedServiceData = services.find((s) => s.id === selectedService);

  if (bookingSuccess) {
    return (
      <div className="flex flex-col">
        <section className="py-12 md:py-16 border-b">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">Booking Confirmed</span>
            </nav>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-4 md:px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-booking-success">
              Booking Confirmed!
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you for choosing Nivora. We've sent a confirmation email with all the details. 
              Our team will contact you shortly to confirm pickup.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/">
                <Button variant="outline" data-testid="button-back-home">Back to Home</Button>
              </Link>
              <Button onClick={() => setBookingSuccess(false)} data-testid="button-new-booking">
                Book Another Service
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-16 border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Book a Service</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" data-testid="text-booking-title">
            Book Your Service
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Select your service, choose a convenient time, and we'll take care of the rest. 
            Free pickup and delivery available for orders over ₦45,000.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-4 mb-8">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</div>
                  Select Your Service
                </h2>
                <RadioGroup
                  value={selectedService}
                  onValueChange={handleServiceChange}
                  className="grid gap-4 md:grid-cols-2"
                >
                  {services.map((service) => (
                    <Label
                      key={service.id}
                      htmlFor={service.id}
                      className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-all hover-elevate ${
                        selectedService === service.id
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      data-testid={`radio-service-${service.id}`}
                    >
                      <RadioGroupItem value={service.id} id={service.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <service.icon className="h-5 w-5 text-primary" />
                          <span className="font-medium">{service.title}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                        <p className="mt-2 text-sm font-medium text-primary">{service.price}</p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <Tabs value={bookingMethod} onValueChange={(v) => setBookingMethod(v as "form" | "calendly")} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</div>
                    Choose Booking Method
                  </h2>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="form" data-testid="tab-booking-form">Quick Form</TabsTrigger>
                    <TabsTrigger value="calendly" data-testid="tab-booking-calendly">Schedule with Calendly</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="calendly" className="space-y-6">
                  <CalendlyWidget serviceType={selectedService} />
                </TabsContent>

                <TabsContent value="form" className="space-y-8">
                  {bookingMutation.isError && (
                    <Alert variant="destructive" data-testid="alert-booking-error">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Booking Failed</AlertTitle>
                      <AlertDescription>
                        There was an error processing your booking. Please check your information and try again.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <input type="hidden" {...form.register("serviceType")} />

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          Your Information
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="John Doe" 
                                    {...field} 
                                    disabled={bookingMutation.isPending}
                                    data-testid="input-customer-name" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="customerEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    {...field} 
                                    disabled={bookingMutation.isPending}
                                    data-testid="input-customer-email" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="customerPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number (Optional)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="tel" 
                                    placeholder="+1 (555) 123-4567" 
                                    {...field} 
                                    disabled={bookingMutation.isPending}
                                    data-testid="input-customer-phone" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          Schedule Pickup
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="scheduledDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Date</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="date" 
                                    {...field} 
                                    disabled={bookingMutation.isPending}
                                    data-testid="input-scheduled-date" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="scheduledTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Time</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="time" 
                                    {...field} 
                                    disabled={bookingMutation.isPending}
                                    data-testid="input-scheduled-time" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="specialInstructions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Instructions (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Any specific requirements or notes for your order..."
                                  className="min-h-[100px]"
                                  {...field}
                                  disabled={bookingMutation.isPending}
                                  data-testid="textarea-special-instructions"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto gap-2"
                        disabled={bookingMutation.isPending || !selectedService}
                        data-testid="button-submit-booking"
                      >
                        {bookingMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </Button>
                      {!selectedService && (
                        <p className="text-sm text-muted-foreground">Please select a service above to continue</p>
                      )}
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card data-testid="card-booking-summary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Booking Summary
                  </CardTitle>
                  <CardDescription>Review your service selection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedServiceData ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                        <selectedServiceData.icon className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{selectedServiceData.title}</p>
                          <p className="text-sm text-muted-foreground">{selectedServiceData.price}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service</span>
                          <span>{selectedServiceData.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estimated Price</span>
                          <span className="font-medium">{selectedServiceData.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pickup</span>
                          <span>Free (orders over ₦45,000)</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Select a service to see your booking summary</p>
                    </div>
                  )}

                  <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <span className="text-primary">*</span>
                      Final price depends on quantity and items
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary">*</span>
                      We'll confirm your booking via email
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
