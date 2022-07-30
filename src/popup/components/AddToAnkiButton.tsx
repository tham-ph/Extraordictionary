import React, {useContext, useEffect, useRef} from "react";
import {AppContext, AppContextInterface} from "../Popup";

const AddToAnkiButton = () => {
  const { selectedCardIdList, setSelectedCardIdList } = useContext<AppContextInterface>(AppContext);
  const selectedCardCounterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedCardCounterRef.current) {
      if (selectedCardIdList.length > 0) {
        selectedCardCounterRef.current.style.display = "block";
      } else {
        selectedCardCounterRef.current.style.display = "none";
      }
    }
  }, [selectedCardIdList]);
  return (
    <div className="flex divide-x-2">
      <button className="flex justify-center items-center gap-2 p-2  bg-sky-400 rounded-l-lg text-sm font-bold text-white hover:bg-sky-600">
        <p>ADD TO ANKI</p>
        <div
          className="flex justify-center items-center text-xs text-sky-500 bg-white p-1 w-6 h-6 rounded-full"
          ref={selectedCardCounterRef}
        >
          {selectedCardIdList.length}
        </div>
      </button>
      <button className="bg-sky-400 rounded-r-lg hover:bg-sky-600" >
        <svg
          className="fill-white"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default AddToAnkiButton;
