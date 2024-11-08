import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import { connectDB } from "./src/lib/db.js";

import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import albumRoutes from "./src/routes/album.routes.js";
import statsRoutes from "./src/routes/stats.routes.js";
import songRoutes from "./src/routes/songs.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(clerkMiddleware()); // this will add auth to the req object -> req.auth.userId

const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/songs", songRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
