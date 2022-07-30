import React from "react";
import ImageCard from "./ImageCard";

const ImagesContainer = () => {
  const imageCardList: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    imageCardList.push(<ImageCard key={i} id={"image-" + i}/>)
  }

  return (
    <div className="flex flex-col items-center p-2 gap-2 w-[200px] h-[400px] rounded-lg bg-gray-100 overflow-y-scroll">
      {imageCardList}
    </div>
  );
};

export default ImagesContainer;