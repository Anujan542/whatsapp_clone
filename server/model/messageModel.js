import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConversationModel",
    },
    files: [],
  },
  {
    collection: "Messages",
    timestamps: true,
  }
);

const MessageModel =
  mongoose.model.MessageModel || mongoose.model("MessageModel", MessageSchema);

export default MessageModel;
