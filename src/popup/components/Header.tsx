import React from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

const Header = () => {
  return (
    <div className="flex">
      <div className="flex gap-4 justify-center items-center">
        <img className="w-7" src="/assets/icon.svg" alt="icon"></img>
        <SearchBar />
        <Filter />
      </div>
    </div>
  );
};

export default Header;
