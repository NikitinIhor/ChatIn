import { getAllChatsAdmin } from "../services/admin.js";

export const adminController = async (req, res) => {
  const data = await getAllChatsAdmin();

  res.status(200).json({
    message: "Successfully found all chats (admin)",
    data,
  });
};
