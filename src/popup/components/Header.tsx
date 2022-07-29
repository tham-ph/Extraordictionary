import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="flex">
      <div className="flex gap-2 justify-center items-center">
        <img className="w-7" src="/assets/icon.svg" alt="icon"></img>
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;