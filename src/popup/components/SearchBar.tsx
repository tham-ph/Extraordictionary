import React from "react";

const SearchBar = () => {
  return (
    <form className="flex w-[300px] gap-2 p-1 rounded-lg bg-gray-100">
      <input
        className="w-[250px] px-2 text-sm bg-gray-100 placeholder-sky-500/50 focus:outline-none"
        type="text"
        placeholder="search definitions and images"
      />
      <button className="p-1 rounded-full hover:bg-sky-400/10">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-sky-400"
            d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
