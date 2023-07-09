import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversation } from "../features/chatSlice";
import WhatsappHome from "../components/chat/WhatsappHome/WhatsappHome";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  useEffect(() => {
    if (user) {
      dispatch(getConversation(user.access_token));
    }
  }, [user]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="container h-screen flex">
        <Sidebar />
        {activeConversation._id ? "home" : <WhatsappHome />}
      </div>
    </div>
  );
};

export default Home;
