import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      // Clerk user ID
      type: String,
      required: true,
    },
    receiverId: {
      // Clerk User ID
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // this add createdAt, updatedAt
);

export const User = mongoose.model("Message", messageSchema);
