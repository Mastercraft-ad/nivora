import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@freshpress.com",
    link: "mailto:hello@freshpress.com",
    action: "Send Email",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Clean Street, Fresh City, FC 12345",
    link: "https://maps.google.com",
    action: "Get Directions",
  },
];

const businessHours = [
  { day: "Monday - Friday", hours: "7:00 AM - 8:00 PM" },
  { day: "Saturday", hours: "8:00 AM - 6:00 PM" },
  { day: "Sunday", hours: "8:00 AM - 6:00 PM" },
];

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceInterest: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });
      setSubmitSuccess(true);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-16 border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Contact</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" data-testid="text-contact-title">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Have questions or need assistance? We're here to help. Reach out to us 
            through any of the channels below.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-6" data-testid="text-send-message">
                Send Us a Message
              </h2>

              {submitSuccess ? (
                <div className="rounded-lg border bg-green-50 dark:bg-green-950 p-8 text-center" data-testid="contact-success">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitSuccess(false)} variant="outline" data-testid="button-send-another">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  {contactMutation.isError && (
                    <Alert variant="destructive" className="mb-6" data-testid="alert-contact-error">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Failed to Send</AlertTitle>
                      <AlertDescription>
                        There was an error sending your message. Please check your information and try again.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John Doe" 
                                  {...field} 
                                  disabled={contactMutation.isPending}
                                  data-testid="input-contact-name" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="john@example.com" 
                                  {...field} 
                                  disabled={contactMutation.isPending}
                                  data-testid="input-contact-email" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel" 
                                  placeholder="+1 (555) 123-4567" 
                                  {...field} 
                                  disabled={contactMutation.isPending}
                                  data-testid="input-contact-phone" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="serviceInterest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Interest (Optional)</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                value={field.value}
                                disabled={contactMutation.isPending}
                              >
                                <FormControl>
                                  <SelectTrigger data-testid="select-service-interest">
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="laundry">Laundry Services</SelectItem>
                                  <SelectItem value="dry-cleaning">Dry Cleaning</SelectItem>
                                  <SelectItem value="ironing">Ironing & Pressing</SelectItem>
                                  <SelectItem value="stain-removal">Stain Removal</SelectItem>
                                  <SelectItem value="express">Express Same-Day</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can we help you?"
                                className="min-h-[150px]"
                                {...field}
                                disabled={contactMutation.isPending}
                                data-testid="textarea-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto gap-2"
                        disabled={contactMutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {contactMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" data-testid="text-contact-info">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <Card key={info.title} data-testid={`card-contact-${info.title.toLowerCase()}`}>
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <info.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{info.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{info.value}</p>
                        </div>
                        <a href={info.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" data-testid={`button-${info.title.toLowerCase()}-action`}>
                            {info.action}
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="bg-green-600 text-white border-green-600" data-testid="card-whatsapp">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <SiWhatsapp className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">Quick Chat on WhatsApp</p>
                    <p className="text-sm opacity-90">Get instant responses to your questions</p>
                  </div>
                  <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" className="shrink-0" data-testid="button-whatsapp-chat">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat Now
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card data-testid="card-business-hours">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {businessHours.map((item) => (
                      <div key={item.day} className="flex justify-between">
                        <span className="text-muted-foreground">{item.day}</span>
                        <span className="font-medium">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-testid="text-contact-cta">
            Ready to Try Our Services?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Book your first service now and experience the FreshPress difference.
          </p>
          <div className="mt-8">
            <Link href="/booking">
              <Button size="lg" className="gap-2" data-testid="button-contact-book">
                Book a Service
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
