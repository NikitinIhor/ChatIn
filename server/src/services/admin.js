import { ChatCollection } from "../db/models/Chat.js";

export const getAllChatsAdmin = async () => {
  return await ChatCollection.find();
};
