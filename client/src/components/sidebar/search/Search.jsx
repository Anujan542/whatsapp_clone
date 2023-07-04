import React, { useState } from "react";
import axios from "axios";
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";
import { useSelector } from "react-redux";

export default function Search({ searchLength, setSearchResults }) {
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  const handleChange = async (e) => {
    try {
      if (e.target.value && e.key === "Enter") {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[49px] py-1.5">
      {/* container */}
      <div className="px-[10px]">
        {/* search input container */}
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green-500 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              className="input"
              placeholder="Search or start a new chat"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={(e) => handleChange(e)}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
}
