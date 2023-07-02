import createHttpError from "http-errors";
import { ConversationModel, MessageModel } from "../model/index.js";

export const createNewMessage = async (data) => {
  const msg = await MessageModel.create(data);

  if (!msg) {
    return createHttpError.BadRequest("oops..!something went wrong!");
  }

  return msg;
};

export const populateMessage = async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });

  if (!msg) {
    return createHttpError.BadRequest("oops..!something went wrong!");
  }

  return msg;
};

export const UpdateLatestMessage = async (convo_id, msg) => {
  let latestMsg = await ConversationModel.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  });
  if (!latestMsg) {
    return createHttpError.BadRequest("oops..!something went wrong!");
  }

  return latestMsg;
};

export const allMessage = async (convo_id) => {
  let messages = await MessageModel.find({
    conversation: convo_id,
  })
    .populate("sender", "name picture email status")
    .populate("conversation");

  if (!messages) {
    return createHttpError.BadRequest("oops..!something went wrong!");
  }

  return messages;
};
