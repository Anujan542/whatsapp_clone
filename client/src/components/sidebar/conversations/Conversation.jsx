import React from "react";
import { dateHandler } from "../../../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { getConversationId } from "../../../utils/chat";
import { open_create_conversation } from "../../../features/chatSlice";
import { Capitalize } from "../../../utils/string";

const Conversation = ({ convo }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const values = {
    receiver_id: getConversationId(user, convo.users),
    access_token: user.access_token,
  };
  const handleOpenConversation = async () => {
    dispatch(open_create_conversation(values));
  };

  return (
    <li
      onClick={() => handleOpenConversation()}
      className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      {/* container */}
      <div className="relative w-full flex items-center justify-between py-[10px] ">
        {/* left */}
        <div className="flex items-center gap-x-3 ">
          {/* conversation user pic */}
          <div className="relative min-w-[50px] max-h-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={convo.picture}
              alt="picname"
              className="w-full h-full object-cover"
            />
          </div>
          {/* convo name and msg */}
          <div className="w-full flex flex-col">
            {/* name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {Capitalize(convo.name)}
            </h1>
            {/* message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>
                    {convo.latestMessage?.message.length > 25
                      ? `${convo.latestMessage?.message.subString(0, 25)}...`
                      : convo.latestMessage?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {convo.latestMessage?.createdAt
              ? dateHandler(convo.latestMessage.createdAt)
              : ""}
          </span>
        </div>
      </div>
      {/* border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default Conversation;
