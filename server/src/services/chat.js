import { ChatCollection } from "../db/models/Chat.js";

export const getAllChats = () => ChatCollection.find();

export const getChatById = (id) => ChatCollection.findById(id);

export const createChat = (payload) => ChatCollection.create(payload);

export const updateChat = async (id, data, options = {}) => {
  const updated = await ChatCollection.findByIdAndUpdate(id, data, {
    new: true,
    ...options,
  });

  if (!updated) return null;

  return { data: updated };
};

export const deleteChat = (filter) => ChatCollection.findOneAndDelete(filter);
