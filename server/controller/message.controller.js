import {
  UpdateLatestMessage,
  allMessage,
  createNewMessage,
  populateMessage,
} from "../services/message.services.js";

export const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user.userId;

    const { message, convo_id, files } = req.body;

    if (!convo_id || (!message && !files)) {
      return res.sendStatus(400);
    }

    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files,
    };

    // create new msg
    let newMessage = await createNewMessage(msgData);

    // get msg details
    let populatedMessage = await populateMessage(newMessage._id);

    await UpdateLatestMessage(convo_id, newMessage);

    res.json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const convo_id = req.params.convo_id;

    if (!convo_id) {
      res.sendStatus(400);
    }

    let getAllMessage = await allMessage(convo_id);
    res.json(getAllMessage);
  } catch (error) {
    next(error);
  }
};
