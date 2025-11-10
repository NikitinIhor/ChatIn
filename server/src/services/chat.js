import mongoose from "mongoose";
import { ChatCollection } from "../db/models/Chat.js";

export const getChat = (filter) => ChatCollection.findById(filter);

export const createChat = (payload) => ChatCollection.create(payload);

export const updateChat = async (id, userId, data, options = {}) => {
  const updated = await ChatCollection.findOneAndUpdate(
    { _id: id, sender: userId },
    data,
    { new: true, ...options }
  );

  if (!updated) return null;

  return { data: updated };
};

export const deleteChat = (filter) => ChatCollection.findOneAndDelete(filter);
// -------------------------------------------------------------------

export const getConversation = async (user1, user2) => {
  if (
    !mongoose.Types.ObjectId.isValid(user1) ||
    !mongoose.Types.ObjectId.isValid(user2)
  ) {
    throw new Error("Invalid user ID(s)");
  }

  const user1Id = new mongoose.Types.ObjectId(user1);
  const user2Id = new mongoose.Types.ObjectId(user2);

  const conversation = await ChatCollection.find({
    $or: [
      { sender: user1Id, receiver: user2Id },
      { sender: user2Id, receiver: user1Id },
    ],
  }).sort({ createdAt: 1 });

  return conversation;
};

export const getAllUsers = (filter) =>
  UserCollection.find(filter).select("username -_id");
