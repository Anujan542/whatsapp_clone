import React from "react";

const Input = ({ message, setMessage }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_text_3 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Input;
