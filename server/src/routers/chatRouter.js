import { Router } from "express";
import {
  getAllChatsController,
  getChatByIdController,
} from "../controllers/chatController.js";

export const chatRouter = Router();

chatRouter.get("/", getAllChatsController);

chatRouter.get("/:id", getChatByIdController);

// Post create

// --------------------------------------------------
// get user:id

// import { getUserChats } from "../services/chat.js";

// chatRouter.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const data = await getUserChats(userId);

//     res.status(200).json({
//       message: "Chats for user found successfully",
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch user's chats",
//       error: error.message,
//     });
//   }
// });

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
