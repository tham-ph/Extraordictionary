import React from "react";
import ImageCard from "./ImageCard";

const ImagesContainer = () => {
  return (
    <div className="flex flex-col items-center p-2 gap-2 w-[200px] h-[400px] rounded-lg bg-gray-100 overflow-y-scroll">
      <ImageCard />
      <ImageCard />
      <ImageCard />
      <ImageCard />
      <ImageCard />
      <ImageCard />
      <ImageCard />
    </div>
  );
};

export default ImagesContainer;