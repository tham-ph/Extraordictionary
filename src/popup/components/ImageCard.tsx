import React, {useContext, useRef} from "react";
import {AppContext, AppContextInterface} from "../Popup";

interface Props {
  id: string;
  imageURL: string;
}
const ImageCard = ({id, imageURL}: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const checkBoxRef = useRef<SVGSVGElement>(null);
  const selectedBoxRef = useRef<HTMLDivElement>(null);
  const { selectedCardIdList, setSelectedCardIdList } = useContext<AppContextInterface>(AppContext);

  return (
    <div
      className="flex justify-end p-2 gap-2 w-[170px] min-h-[170px] rounded-lg bg-white border-4 border-white cursor-pointer bg-center bg-contain bg-no-repeat"
      style={{
        backgroundImage:
          `url(${imageURL})`,
      }}
      ref={cardRef}
      id={id}
      onClick={() => {
        if (cardRef.current && checkBoxRef.current && selectedBoxRef.current) {
          let tempList: string[] = [...selectedCardIdList];
          const indexOfId = tempList.indexOf(id);
          if (indexOfId !== -1) {
            tempList.splice(indexOfId, 1);
          } else {
            tempList.push(id);
          }
          setSelectedCardIdList(tempList);

          cardRef.current.classList.toggle("border-white");
          cardRef.current.classList.toggle("border-teal-500");
          cardRef.current.classList.toggle("bg-white");
          cardRef.current.classList.toggle("bg-teal-400/10");

          checkBoxRef.current.classList.toggle("bg-gray-100");
          checkBoxRef.current.classList.toggle("fill-gray-400");
          checkBoxRef.current.classList.toggle("bg-teal-400/30");
          checkBoxRef.current.classList.toggle("fill-teal-600");

          checkBoxRef.current.classList.toggle("hidden");
          selectedBoxRef.current.classList.toggle("hidden");
        }
      }}
    >
      <svg
        className="p-1 rounded-full bg-gray-100 fill-gray-400"
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        ref={checkBoxRef}
      >
        <path d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z" />
      </svg>
      <div
        className="hidden flex justify-center items-center text-xs text-teal-600 bg-teal-400/30 w-6 h-6 rounded-full"
        ref={selectedBoxRef}
      >
        {selectedCardIdList.indexOf(id) + 1}
      </div>
    </div>

  );
};

export default ImageCard;
