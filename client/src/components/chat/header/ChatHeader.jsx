import React from "react";
import { useSelector } from "react-redux";
import { SearchLargeIcon, DotsIcon } from "../../../svg";
import { Capitalize } from "../../../utils/string";

const ChatHeader = () => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-x-4">
          {/* conversation image */}
          <button className="btn">
            <img
              src={picture}
              alt={`${name}`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/* converstioan name and online not */}
          <div className="flex flex-col">
            <h1 className="text-md font-bold text-dark_text_1">
              {Capitalize(name.split(" ")[0])}
            </h1>
            <span className="text-sm dark:text-dark_svg_2">online</span>
          </div>
        </div>
        {/* right */}
        <ul className="flex items-center gap-x-4">
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
