import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Conversation is required"],
      trim: true,
    },
    picture: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageModel",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    collection: "Conversations",
    timestamps: true,
  }
);

const ConversationModel =
  mongoose.model.ConversationModel ||
  mongoose.model("ConversationModel", ConversationSchema);

export default ConversationModel;
