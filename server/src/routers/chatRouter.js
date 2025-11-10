import { Router } from "express";
import { adminController } from "../controllers/adminController.js";
import {
  createChatController,
  deleteChatController,
  getAllUsersController,
  getChatByIdController,
  getConversationController,
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

chatRouter.get("/admin", checkAdmin, ctrlWrapper(adminController));

// --------------------------------------------------------------------------admin

chatRouter.get("/:id", validateId, ctrlWrapper(getChatByIdController));

chatRouter.post(
  "/:receiverId",
  validateBody(chatAddSchema),
  ctrlWrapper(createChatController)
);

chatRouter.patch("/:id", validateId, ctrlWrapper(updateController));

chatRouter.delete("/:id", validateId, ctrlWrapper(deleteChatController));

chatRouter.get("/users", authenticate, ctrlWrapper(getAllUsersController));

// --------------------------------------------------------------------------

chatRouter.get(
  "/conversation/:userId",
  authenticate,
  ctrlWrapper(getConversationController)
);
