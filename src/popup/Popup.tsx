import React, { createContext, useState } from "react";
import Header from "./components/Header";
import DefinitionsContainer from "./components/DefinitionsContainer";
import ImagesContainer from "./components/ImagesContainer";

export interface AppContextInterface {
  selectedCardIdList: string[];
  setSelectedCardIdList: (value: string[]) => void;
}

export const AppContext = createContext<AppContextInterface>({
  selectedCardIdList: [],
  setSelectedCardIdList: value => []
});

const Popup = () => {
  const [selectedCardIdList, setSelectedCardIdList] = useState<string[]>([]);
  return (
    <AppContext.Provider value={{ selectedCardIdList, setSelectedCardIdList }}>
      <div className="flex flex-col gap-4 p-2">
        <Header />
        <div className="flex gap-4">
          <DefinitionsContainer />
          <ImagesContainer />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default Popup;
