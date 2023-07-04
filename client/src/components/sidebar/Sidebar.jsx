import React, { useState } from "react";
import SidebarHeader from "./header/SidebarHeader";
import { Notifications } from "./notifications";
import Search from "./search/Search";
import Conversations from "./conversations/Conversations";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="w-[40%] h-full select-none">
      {/* header */}
      <SidebarHeader />
      {/* notification */}
      <Notifications />
      {/* search bar */}
      <Search searchLength={searchResults.length} />
      {/* conversations */}
      <Conversations />
    </div>
  );
};

export default Sidebar;
