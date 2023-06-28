import mongoose from "mongoose";
import app from "./app.js";
import logger from "./config/logger.js";

const PORT = process.env.PORT || 5000;

let server;

// exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error : ${err}`);
  process.exit(1);
});

// mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

server = app.listen(PORT, (req, res) => {
  logger.info(`Server is running on ${PORT}`);
});

// mongodb connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  logger.info("Connected to mongoDB");
});

const exitHandler = () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedHandler);
process.on("unhandledRejection", unexpectedHandler);

// SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("server closed");
    process.exit(1);
  }
});
