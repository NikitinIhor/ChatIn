import { Router } from "express";
import { adminController } from "../controllers/adminController.js";
import {
  createChatController,
  deleteChatController,
  getAllChatsController,
  getChatByIdController,
  updateController,
} from "../controllers/chatController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { validateId } from "../utils/validateId.js";
import { chatAddSchema } from "../validation/Chat.js";

export const chatRouter = Router();

chatRouter.use(authenticate);

chatRouter.get("/", ctrlWrapper(getAllChatsController));

chatRouter.get("/admin", checkAdmin, ctrlWrapper(adminController));

chatRouter.get("/:id", validateId, ctrlWrapper(getChatByIdController));

chatRouter.post(
  "/",
  validateBody(chatAddSchema),
  ctrlWrapper(createChatController)
);

chatRouter.patch("/:id", validateId, ctrlWrapper(updateController));

chatRouter.delete("/:id", validateId, ctrlWrapper(deleteChatController));

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
