import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations } = useSelector((state) => state.chat);
  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations.map((convo, i) => (
            <Conversation convo={convo} key={i} />
          ))}
      </ul>
    </div>
  );
};

export default Conversations;
