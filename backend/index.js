import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import path from "path";

import { connectDB } from "./src/lib/db.js";

import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import albumRoutes from "./src/routes/album.routes.js";
import statsRoutes from "./src/routes/stats.routes.js";
import songRoutes from "./src/routes/songs.routes.js";
import fileUpload from "express-fileupload";

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(clerkMiddleware()); // this will add auth to the req object -> req.auth.userId
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  })
);

const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/songs", songRoutes);

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
