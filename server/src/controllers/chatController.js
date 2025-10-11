import createHttpError from "http-errors";
import { getAllChats, getChatById } from "../services/chat.js";

export const getAllChatsController = async (req, res) => {
  const data = await getAllChats();

  return res.status(200).json({
    message: "Successfully found all chats",
    data,
  });
};

export const getChatByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getChatById(id);

  if (!data) {
    throw createHttpError(404, `Chat with ID ${id} not found`);
    // return res.status(404).json({
    //   message: `Chat with ID ${id} not found`,
    // });
  }

  res.status(200).json({
    message: `Chat with ${id} seccessfully found`,
    data,
  });
};
