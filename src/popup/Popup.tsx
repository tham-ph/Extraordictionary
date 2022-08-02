import React, { createContext, useState } from "react";
import Header from "./components/Header";
import DefinitionsContainer from "./components/DefinitionsContainer";
import ImagesContainer from "./components/ImagesContainer";

export interface SearchResultInterface {
  name: string;
  definition: string;
  examples: string[];
  tags: string[];
  audioURL: string;
}

export interface AppContextInterface {
  selectedCardIdList: string[];
  setSelectedCardIdList: (value: string[]) => void;
  searchResults: SearchResultInterface[];
  setSearchResults: (value: SearchResultInterface[]) => void;
}

export const AppContext = createContext<AppContextInterface>({
  selectedCardIdList: [],
  setSelectedCardIdList: (value) => [],
  searchResults: [
    {
      name: "",
      definition: "",
      examples: [],
      tags: [],
      audioURL: "",
    },
  ],
  setSearchResults: (value) => [],
});

const Popup = () => {
  const [selectedCardIdList, setSelectedCardIdList] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResultInterface[]>([]);
  return (
    <AppContext.Provider
      value={{
        selectedCardIdList,
        setSelectedCardIdList,
        searchResults,
        setSearchResults,
      }}
    >
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
