import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./.vscode/src/config/config";
import Logging from "./.vscode/src/library/logging";

const router = express();

/* connect to mongoose */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("connected to mongoDB");
    StartServer();
  })
  .catch((error) => {
    Logging.error("Unable to connect: ");
    Logging.error(error);
  });

/* Only start the server if Mongo Connects */

const StartServer = () => {
  router.use((req, res, next) => {
    /* Log the Request */
    Logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP:[${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /* Log the Response */
      Logging.info(
        `Incoming -> Method: [$req.method] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  /* Routes */

  /* healthcheck */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  /* Error handling */
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`)
    );
};
