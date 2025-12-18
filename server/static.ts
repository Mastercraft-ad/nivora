import express, { type Express, type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Middleware to set proper content types
  app.use((req: Request, res: Response, next: NextFunction) => {
    const filePath = req.path;
    
    if (filePath.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else if (filePath.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else if (filePath.endsWith(".json")) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
    } else if (filePath.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
    
    next();
  });

  // Serve static files
  app.use(express.static(distPath, {
    maxAge: "1h",
    etag: false,
    index: false,
  }));

  // Serve index.html for all other routes (SPA routing)
  app.use((req: Request, res: Response) => {
    // Only serve HTML if it's not an API request
    if (!req.path.startsWith("/api")) {
      const indexPath = path.join(distPath, "index.html");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      
      if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
      }
    }
    
    res.status(404).json({ error: "Not Found" });
  });
}
