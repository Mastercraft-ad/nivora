import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ error: "Validation failed", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create contact" });
      }
    }
  });

  app.get("/api/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ error: "Validation failed", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create booking" });
      }
    }
  });

  app.get("/api/bookings", async (_req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBookingById(req.params.id);
      if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({ error: "Booking not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ error: "Status is required" });
      }
      const booking = await storage.updateBookingStatus(req.params.id, status);
      if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({ error: "Booking not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update booking status" });
    }
  });

  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getBookingStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Admin routes
  const ADMIN_PASSWORD = "nivora2025adminpass";

  app.post("/api/admin/verify", async (req, res) => {
    try {
      const { password } = req.body;
      if (password === ADMIN_PASSWORD) {
        res.json({ authenticated: true });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Verification failed" });
    }
  });

  app.delete("/api/admin/contacts/:id", async (req, res) => {
    try {
      const success = await storage.deleteContact(req.params.id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Contact not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  app.delete("/api/admin/bookings/:id", async (req, res) => {
    try {
      const success = await storage.deleteBooking(req.params.id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Booking not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });

  return httpServer;
}
