import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ChatSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    chatRoom: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
    message: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    file: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export const ChatCollection = model("chat", ChatSchema);
