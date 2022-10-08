import React, { useContext, useEffect, useRef } from "react";
import Tag from "./Tag";
import {
  AppContext,
  AppContextInterface,
  SearchResultInterface,
} from "../Popup";

interface Props {
  id: string;
  data: SearchResultInterface;
}


const DefinitionCard = ({ id, data }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const checkBoxRef = useRef<SVGSVGElement>(null);
  const selectedBoxRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    selectedCardIdList,
    setSelectedCardIdList,
    isAddToAnkiButtonClicked
  } = useContext<AppContextInterface>(AppContext);

  const toggleSelectionStyle = () => {
    if (cardRef.current && checkBoxRef.current && selectedBoxRef.current) {
      cardRef.current.classList.toggle("border-white");
      cardRef.current.classList.toggle("border-teal-500");
      cardRef.current.classList.toggle("bg-white");
      cardRef.current.classList.toggle("bg-teal-400/10");

      checkBoxRef.current.classList.toggle("bg-gray-100");
      checkBoxRef.current.classList.toggle("fill-gray-400");
      checkBoxRef.current.classList.toggle("bg-teal-500");
      checkBoxRef.current.classList.toggle("fill-white");

      checkBoxRef.current.classList.toggle("hidden");
      selectedBoxRef.current.classList.toggle("hidden");
    }
  };

  const tagsList: JSX.Element[] = [];
  for (let i = 0; i < data.tags.length; i++) {
    if (data.tags[i] !== "") {
      tagsList.push(
        <Tag key={"tag" + i} text={data.tags[i]} closeButton={false} />
      );
    }
  }

  const examplesList: JSX.Element[] = [];
  for (let i = 0; i < data.examples.length; i++) {
    examplesList.push(<li key={"li" + i}>{data.examples[i]}</li>);
  }

  useEffect(() => {
    if (isAddToAnkiButtonClicked && selectedCardIdList.indexOf(id) != -1) {
      toggleSelectionStyle();
    }
  }, [isAddToAnkiButtonClicked]);

  return (
    <div
      className="flex flex-col gap-2 p-2 rounded-lg bg-white border-4 border-white cursor-pointer"
      ref={cardRef}
      id={id}
      onClick={() => {
        let tempList = [...selectedCardIdList];
        const indexOfId = tempList.indexOf(id);
        if (indexOfId !== -1) {
          tempList.splice(indexOfId, 1);
        } else {
          tempList.push(id);
        }
        setSelectedCardIdList(tempList);
        toggleSelectionStyle();
      }}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2 w-[280px] break-all">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <button
            className="rounded-full p-1 hover:bg-sky-400/10"
            onClick={(event) => {
              event.stopPropagation();
              if (audioRef.current) {
                audioRef.current.play();
              }
            }}
          >
            <svg
              className="fill-sky-400"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.38268 3.07615C9.75636 3.23093 10 3.59557 10 4.00003V16C10 16.4045 9.75636 16.7691 9.38268 16.9239C9.00901 17.0787 8.57889 16.9931 8.29289 16.7071L4.58579 13H2C1.44772 13 1 12.5523 1 12V8.00003C1 7.44774 1.44772 7.00003 2 7.00003H4.58579L8.29289 3.29292C8.57889 3.00692 9.00901 2.92137 9.38268 3.07615Z" />
              <path d="M14.6568 2.92888C15.0474 2.53836 15.6805 2.53836 16.0711 2.92888C17.8796 4.73743 19 7.2388 19 9.99995C19 12.7611 17.8796 15.2625 16.0711 17.071C15.6805 17.4615 15.0474 17.4615 14.6568 17.071C14.2663 16.6805 14.2663 16.0473 14.6568 15.6568C16.1057 14.208 17 12.2094 17 9.99995C17 7.79053 16.1057 5.7919 14.6568 4.34309C14.2663 3.95257 14.2663 3.3194 14.6568 2.92888ZM11.8284 5.75731C12.2189 5.36678 12.8521 5.36678 13.2426 5.75731C13.7685 6.28319 14.1976 6.90687 14.5003 7.59958C14.822 8.33592 15 9.14847 15 9.99995C15 11.6565 14.3273 13.1579 13.2426 14.2426C12.8521 14.6331 12.2189 14.6331 11.8284 14.2426C11.4379 13.8521 11.4379 13.2189 11.8284 12.8284C12.5534 12.1034 13 11.1048 13 9.99995C13 9.42922 12.8811 8.8889 12.6676 8.40032C12.4663 7.93958 12.1802 7.52327 11.8284 7.17152C11.4379 6.781 11.4379 6.14783 11.8284 5.75731Z" />
            </svg>
            <audio ref={audioRef} src={data.audioURL}></audio>
          </button>
        </div>
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
          className="hidden flex justify-center items-center font-bold text-xs text-white bg-teal-500 w-6 h-6 rounded-full"
          ref={selectedBoxRef}
        >
          {selectedCardIdList.indexOf(id) + 1}
        </div>
      </div>
      <div className="flex flex-wrap gap-1">{tagsList}</div>
      <p className="text-sm font-medium whitespace-pre-line">{data.definition}</p>
      <ul className="ml-6 list-disc text-xs italic">{examplesList}</ul>
    </div>
  );
};

export default DefinitionCard;
