import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../features/chatSlice";

const Contacts = ({ contact, setSearchResults }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const values = {
    receiver_id: contact._id,
    access_token: user.access_token,
  };
  const handleOpenConversation = async () => {
    await dispatch(open_create_conversation(values));
    setSearchResults([]);
  };
  return (
    <li
      onClick={() => handleOpenConversation()}
      className="list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      {/* container */}
      <div className="flex items gap-x-3 py-[10px]">
        {/* COntact info */}
        <div className="flex items-center gap-x-3 ">
          {/* conversation user pic */}
          <div className="relative min-w-[50px] max-h-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={contact.picture}
              alt="picname"
              className="w-full h-full object-cover"
            />
          </div>
          {/* convo name and msg */}
          <div className="w-full flex flex-col">
            {/* name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {contact.name}
            </h1>
            {/* message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{contact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default Contacts;
