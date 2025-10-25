import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMediaSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/media", async (req, res) => {
    try {
      const media = await storage.getAllMedia();
      res.json(media);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });

  app.post("/api/media", async (req, res) => {
    try {
      const validatedData = insertMediaSchema.parse(req.body);
      const media = await storage.createMedia(validatedData);
      res.status(201).json(media);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid media data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create media" });
      }
    }
  });

  app.patch("/api/media/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertMediaSchema.partial().parse(req.body);
      const media = await storage.updateMedia(id, updates);
      
      if (!media) {
        res.status(404).json({ error: "Media not found" });
        return;
      }
      
      res.json(media);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid update data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update media" });
      }
    }
  });

  app.delete("/api/media/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteMedia(id);
      
      if (!success) {
        res.status(404).json({ error: "Media not found" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete media" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
