import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversation } from "../features/chatSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  console.log(user);
  useEffect(() => {
    if (user) {
      dispatch(getConversation(user.access_token));
    }
  }, []);

  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="container min-h-screen flex">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
