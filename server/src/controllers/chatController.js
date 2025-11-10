import createHttpError from "http-errors";
import {
  createChat,
  deleteChat,
  getChat,
  getConversation,
  updateChat,
} from "../services/chat.js";

export const getChatByIdController = async (req, res) => {
  const { id } = req.params;

  const { _id: userId } = req.user;

  const data = await getChat({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Chat with ID ${id} not found`);
  }

  res.status(200).json({
    message: `Chat with ${id} successfully found`,
    data,
  });
};

export const createChatController = async (req, res) => {
  const { _id: userId } = req.user;
  const { receiverId } = req.params;

  const chat = await createChat({
    ...req.body,
    sender: userId,
    receiver: receiverId,
  });

  res.status(201).json({
    message: "Chat successfully created",
    data: chat,
  });
};

export const updateController = async (req, res) => {
  const { id } = req.params;

  const { _id: userId } = req.user;

  const result = await updateChat(id, userId, req.body);

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

  const { _id: userId } = req.user;

  const data = await deleteChat({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Chat with ID ${id} not found`);
  }

  res.status(204).json({
    message: `Chat with id:${id} deleted successfully`,
  });
};
// ---------------------------------------------------------------------

export const getConversationController = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user._id;

  const conversation = await getConversation(currentUserId, userId);

  res.status(200).json({
    message: "Conversation fetched successfully",
    data: conversation,
  });
};

export const getAllUsersController = async (req, res) => {
  const { search } = req.query;

  const filter = {
    _id: { $ne: req.user._id },
  };

  if (search) {
    filter.username = { $regex: search, $options: "i" };
  }

  const users = await getAllUsers(filter);

  res.status(200).json({
    message: "Successfully found users",
    data: users,
  });
};
