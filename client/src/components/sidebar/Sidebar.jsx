import React, { useState } from "react";
import SidebarHeader from "./header/SidebarHeader";
import { Notifications } from "./notifications";
import Search from "./search/Search";
import Conversations from "./conversations/Conversations";
import SearchResults from "./search/SearchResults";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="w-[40%] h-full select-none">
      {/* header */}
      <SidebarHeader />
      {/* notification */}
      <Notifications />
      {/* search bar */}
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <SearchResults searchResults={searchResults} />
      ) : (
        <>
          {/* conversations */}
          <Conversations />
        </>
      )}
    </div>
  );
};

export default Sidebar;
