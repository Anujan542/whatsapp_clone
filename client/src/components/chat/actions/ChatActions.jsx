import React from "react";
import EmojiPicker from "./EmojiPicker";
import Attachments from "./Attachments";
import Input from "./Input";
import { SendIcon } from "../../../svg";

const ChatActions = () => {
  return (
    <div className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none">
      {/* container */}
      <div className="w-full flex items-center gap-x-2">
        {/* Emoji and attachments */}
        <ul className="flex gap-x-2">
          <EmojiPicker />
          <Attachments />
        </ul>
        {/* input */}
        <Input />
        {/* send button */}
        <button className="btn">
          <SendIcon className="dark:fill-dark_svg_1" />
        </button>
      </div>
    </div>
  );
};

export default ChatActions;
