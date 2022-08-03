import React, {useContext} from "react";
import ImageCard from "./ImageCard";
import {AppContext, AppContextInterface} from "../Popup";

const ImagesContainer = () => {
  const { imageURLSearchResults } = useContext<AppContextInterface>(AppContext);

  const imageCardList: JSX.Element[] = [];
  for (let i = 0; i < imageURLSearchResults.length; i++) {
    imageCardList.push(<ImageCard key={i} id={"image-" + i} imageURL={imageURLSearchResults[i]}/>)
  }

  return (
    <div className="flex flex-col items-center p-2 gap-2 w-[200px] h-[400px] rounded-lg bg-gray-100 overflow-y-scroll">
      {imageCardList}
    </div>
  );
};

export default ImagesContainer;