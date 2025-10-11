import createHttpError from "http-errors";
import {
  createChat,
  deleteChat,
  getAllChats,
  getChatById,
  updateChat,
} from "../services/chat.js";

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
    message: `Chat with ${id} successfully found`,
    data,
  });
};

export const createChatController = async (req, res) => {
  const data = await createChat(req.body);

  res.status(201).json({
    message: `Chat successfully created`,
    data,
  });
};

export const updateController = async (req, res) => {
  const { id } = req.params;

  const result = await updateChat(id, req.body);

  if (!result) {
    throw createHttpError(404, `Chat with ID ${id} not found`);
  }

  res.status(200).json({
    message: `Chat with ID ${id} updated successfully`,
    data: result.data,
  });
};

export const deleteChatController = async (req, res) => {
  const { id } = req.params;

  const data = await deleteChat({ _id: id });

  if (!data) {
    throw createHttpError(404, `Chat with ID ${id} not found`);
  }

  res.status(204).json({
    message: `Chat with id:${id} deleted successfully`,
  });
};
