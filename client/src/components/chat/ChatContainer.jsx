import React, { useEffect } from "react";
import ChatHeader from "./header/ChatHeader";
import ChatMessage from "./messages/ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../features/chatSlice";
import ChatActions from "./actions/ChatActions";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  const values = {
    access_token: user.access_token,
    convo_id: activeConversation._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getMessages(values));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversation]);
  return (
    <div className="relative w-full h-full border-1 dark:border-dark_border_2 select-none overflow-hidden">
      {/* container */}
      <div>
        {/* header */}
        <ChatHeader />
        {/* chat message */}
        <ChatMessage />
        {/* actions */}
        <ChatActions />
      </div>
    </div>
  );
};

export default ChatContainer;
