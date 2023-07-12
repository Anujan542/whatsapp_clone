import React, { useState } from "react";
import { EmojiIcon } from "../../../svg";
import EmojiPicker from "emoji-picker-react";

const Emoji = () => {
  const [showPicker, setShowPicker] = useState(false);
  return (
    <li>
      <button
        className="btn"
        type="button"
        onClick={() => setShowPicker((prev) => !prev)}
      >
        <EmojiIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* emoji picker */}
      {showPicker && (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" />
        </div>
      )}
    </li>
  );
};

export default Emoji;
