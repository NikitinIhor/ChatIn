import { ChatCollection } from "../db/models/Chat.js";

export const getAllChats = async (userId) => {
  return await ChatCollection.find({ sender: userId });
};

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
