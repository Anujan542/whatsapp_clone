import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <h2 onClick={() => dispatch(logout())}>logout</h2>
      </div>
      <h1>Hello!</h1>
    </div>
  );
};

export default Home;
