import { Router } from "express";
import {
  createChatController,
  deleteChatController,
  getAllChatsController,
  getChatByIdController,
  updateController,
} from "../controllers/chatController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

export const chatRouter = Router();

chatRouter.get("/", ctrlWrapper(getAllChatsController));

chatRouter.get("/:id", ctrlWrapper(getChatByIdController));

chatRouter.post("/", ctrlWrapper(createChatController));

chatRouter.patch("/:id", ctrlWrapper(updateController));

chatRouter.delete("/:id", ctrlWrapper(deleteChatController));

// --------------------------------
// GET /conversation/:user1/:user2 – Get conversation between two users
// import { getConversation } from "../services/chat.js";

// chatRouter.get("/conversation/:user1/:user2", async (req, res) => {
//   try {
//     const { user1, user2 } = req.params;
//     const data = await getConversation(user1, user2);

//     res.status(200).json({
//       message: "Conversation fetched successfully",
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch conversation",
//       error: error.message,
//     });
//   }
// --------------------------------------------------------
// GET /conversation/:user1/:user2 – Get conversation between two users
// import { getConversation } from "../services/chat.js";

// chatRouter.get("/conversation/:user1/:user2", async (req, res) => {
//   try {
//     const { user1, user2 } = req.params;
//     const data = await getConversation(user1, user2);

//     res.status(200).json({
//       message: "Conversation fetched successfully",
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch conversation",
//       error: error.message,
//     });
//   }
