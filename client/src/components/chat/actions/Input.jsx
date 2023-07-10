import React from "react";

const Input = () => {
  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_text_3 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Type a message"
      />
    </div>
  );
};

export default Input;
