import cors from "cors";
import express from "express";
import pino from "pino-http";

import { getAllChats } from "./services/chat.js";
import { env } from "./utils/env.js";

export const startServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: "pino-pretty",
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());

  // ---------------------------------------   routes
  app.get("/chatin", async (req, res) => {
    const data = await getAllChats();

    return res.json({
      status: 200,
      message: "Successfully found all chats",
      data,
    });
  });
  // -----------------------------------------

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found `,
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  const port = Number(env("PORT", 3000));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
