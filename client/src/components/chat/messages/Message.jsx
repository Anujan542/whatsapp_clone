import React from "react";
import moment from "moment";
// import {Tri} from '../../../svg/'

const Message = ({ message, me }) => {
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      {/* message container */}
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
            me ? "bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >
          {/* message */}
          <p className="float-left h-full text-sm pb-5 pr-8">
            {message.message}
          </p>
          <span className="absolute right-1.5 bottom-1.5 text-xs leading-none text-dark_text_5">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          {/* traingle */}
          {/* {!me ? <span></span>:null} */}
        </div>
      </div>
    </div>
  );
};

export default Message;
