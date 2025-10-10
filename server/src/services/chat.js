import { ChatCollection } from "../db/models/Chat.js";

export const getAllChats = () => ChatCollection.find();

export const getChatById = (id) => ChatCollection.findById(id);
