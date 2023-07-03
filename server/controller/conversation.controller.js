import createHttpError from "http-errors";
import logger from "../config/logger.js";
import {
  createConversation,
  doesConversationExist,
  getAllConversation,
  populateConversation,
} from "../services/conversation.services.js";
import { findUser } from "../services/user.services.js";

export const create_open_conversation = async (req, res, next) => {
  try {
    const sender_id = req.user.userId;

    const { receiver_id } = req.body;

    // check if receiver id is provided
    if (!receiver_id) {
      logger.error(
        "please provide a userId you wanna start a conversation with it!"
      );

      throw createHttpError.BadGateway("Something went wrong!");
    }

    // check if chat exist
    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id
    );

    if (existed_conversation) {
      res.json(existed_conversation);
    } else {
      let receiver_user = await findUser(receiver_id);
      let convoData = {
        name: receiver_user.name,
        picture: receiver_user.picture,
        isGroup: false,
        users: [sender_id, receiver_id],
      };

      const newConvo = await createConversation(convoData);

      const getUserChatDetails = await populateConversation(
        newConvo._id,
        "users",
        "-password"
      );

      res.status(200).json(getUserChatDetails);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const user_id = req.user.userId;

    const allConversations = await getAllConversation(user_id);

    res.status(200).json(allConversations);
  } catch (error) {
    next(error);
  }
};
