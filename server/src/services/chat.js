import { ChatCollection } from "../db/models/Chat.js";

export const getAllChats = () => ChatCollection.find();
