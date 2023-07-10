import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const ChatMessage = () => {
  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);

  return (
    <div
      className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
    bg-cover bg-no-repeat"
    >
      {/* container */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/* messages */}
        {messages &&
          messages.map((item) => (
            <Message
              message={item}
              key={item._id}
              me={user._id === item.sender._id}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatMessage;
