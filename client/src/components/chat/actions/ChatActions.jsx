import React, { useState } from "react";
import Emoji from "./EmojiPicker";
import Attachments from "./Attachments";
import Input from "./Input";
import { CircleLoader } from "react-spinners";
import { SendIcon } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../features/chatSlice";

const ChatActions = () => {
  const diapatch = useDispatch();
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  const { activeConversation, status } = useSelector((state) => state.chat);

  const values = {
    message,
    convo_id: activeConversation._id,
    access_token: user.access_token,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await diapatch(sendMessage(values));
    setMessage("");
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      {/* container */}
      <div className="w-full flex items-center gap-x-2">
        {/* Emoji and attachments */}
        <ul className="flex gap-x-2">
          <Emoji />
          <Attachments />
        </ul>
        {/* input */}
        <Input message={message} setMessage={setMessage} />
        {/* send button */}
        <button type="submit" className="btn">
          {status === "loading" ? (
            <CircleLoader size={24} color="#eeeeee" />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatActions;
