import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      typeof: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true } // this add createdAt, updatedAt
);

export const User = mongoose.model("User", userSchema);