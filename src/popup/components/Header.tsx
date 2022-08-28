import React from "react";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import AddToAnkiButton from "./AddToAnkiButton";

const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 justify-center items-center">
        <img className="w-7" src="/assets/icon.svg" alt="icon"></img>
        <SearchBar />
        <FilterButton />
      </div>
      <AddToAnkiButton />
    </div>
  );
};

export default Header;
