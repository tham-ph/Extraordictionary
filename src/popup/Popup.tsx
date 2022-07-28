import React from 'react';
import Header from "./components/Header";
import DefinitionsContainer from "./components/DefinitionsContainer";
import ImagesContainer from "./components/ImagesContainer";

const Popup = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Header/>
      <div className="flex gap-2">
        <DefinitionsContainer/>
        <ImagesContainer/>
      </div>
    </div>
  );
}

export default Popup;

