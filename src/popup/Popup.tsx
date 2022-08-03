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

  imageURLSearchResults: string[];
  setImageURLSearchResults: (value: string[]) => void;

  isDefinitionsReady: boolean;
  setDefinitionsReady: (value: boolean) => void;

  isImagesReady: boolean;
  setImagesReady: (value: boolean) => void;
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
  imageURLSearchResults: [],
  setImageURLSearchResults: (value) => [],
  isDefinitionsReady: true,
  setDefinitionsReady: (value) => true,
  isImagesReady: true,
  setImagesReady: value => true
});

const Popup = () => {
  const [selectedCardIdList, setSelectedCardIdList] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResultInterface[]>([]);
  const [imageURLSearchResults, setImageURLSearchResults] = useState<string[]>([]);
  const [isDefinitionsReady, setDefinitionsReady] = useState<boolean>(true);
  const [isImagesReady, setImagesReady] = useState<boolean>(true);
  return (
    <AppContext.Provider
      value={{
        selectedCardIdList,
        setSelectedCardIdList,
        searchResults,
        setSearchResults,
        imageURLSearchResults,
        setImageURLSearchResults,
        isDefinitionsReady,
        setDefinitionsReady,
        isImagesReady,
        setImagesReady
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
