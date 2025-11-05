import cors from "cors";
import express from "express";

import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";
import { notFouundHandler } from "./middlewares/notFouundHandler.js";
import authRouter from "./routers/authRouter.js";
import { chatRouter } from "./routers/chatRouter.js";
import { env } from "./utils/env.js";

export const startServer = () => {
  const app = express();

  app.use(logger);
  app.use(cors());
  app.use(express.json());

  // ---------------------------------------   routes

  app.use("/auth", authRouter);

  app.use("/chat", chatRouter);

  // -----------------------------------------

  app.use(notFouundHandler);

  app.use(errorHandler);

  const port = Number(env("PORT", 3000));

  app.listen(port, () =>
    console.log(`Server is running on port http://localhost:${port}`)
  );
};
