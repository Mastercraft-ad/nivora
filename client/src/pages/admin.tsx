import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Trash2, LogOut } from "lucide-react";
import type { Contact, Booking } from "@shared/schema";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Fetch contacts
  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    enabled: isAuthenticated,
  });

  // Fetch bookings
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
  });

  // Delete contact mutation
  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      toast({ title: "Contact deleted successfully" });
    },
    onError: () => {
      toast({
        title: "Failed to delete contact",
        variant: "destructive",
      });
    },
  });

  // Delete booking mutation
  const deleteBookingMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({ title: "Booking deleted successfully" });
    },
    onError: () => {
      toast({
        title: "Failed to delete booking",
        variant: "destructive",
      });
    },
  });

  // Update booking status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest(`/api/bookings/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({ title: "Booking status updated" });
    },
    onError: () => {
      toast({
        title: "Failed to update status",
        variant: "destructive",
      });
    },
  });

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiRequest("POST", "/api/admin/verify", { password });
      const data = await response.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        setPassword("");
        toast({ title: "Logged in successfully" });
      }
    } catch (error) {
      toast({
        title: "Invalid password",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md p-6">
          <h1 className="text-2xl font-bold mb-6">Nivora Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Admin Password</label>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-admin-password"
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-admin-login">
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts" data-testid="tab-contacts">
              Contacts ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="bookings" data-testid="tab-bookings">
              Bookings ({bookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Service</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="border-b hover:bg-muted/30">
                        <td className="px-4 py-3 text-sm">{contact.name}</td>
                        <td className="px-4 py-3 text-sm">{contact.email}</td>
                        <td className="px-4 py-3 text-sm">{contact.phone || "-"}</td>
                        <td className="px-4 py-3 text-sm">{contact.serviceInterest || "-"}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {contact.createdAt
                            ? new Date(contact.createdAt).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteContactMutation.mutate(contact.id)}
                            disabled={deleteContactMutation.isPending}
                            data-testid={`button-delete-contact-${contact.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {contacts.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No contacts yet
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Service</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-muted/30">
                        <td className="px-4 py-3 text-sm">{booking.customerName}</td>
                        <td className="px-4 py-3 text-sm">{booking.customerPhone || "-"}</td>
                        <td className="px-4 py-3 text-sm">{booking.serviceType}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {booking.scheduledDate}
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            defaultValue={booking.status || "pending"}
                            onValueChange={(status) =>
                              updateStatusMutation.mutate({
                                id: booking.id,
                                status,
                              })
                            }
                          >
                            <SelectTrigger
                              className="w-24"
                              data-testid={`select-status-${booking.id}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBookingMutation.mutate(booking.id)}
                            disabled={deleteBookingMutation.isPending}
                            data-testid={`button-delete-booking-${booking.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bookings.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No bookings yet
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
