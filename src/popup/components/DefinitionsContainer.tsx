import React, { useContext } from "react";
import DefinitionCard from "./DefinitionCard";
import { AppContext, AppContextInterface } from "../Popup";

const DefinitionsContainer = () => {
  const { searchResults } = useContext<AppContextInterface>(AppContext);
  const definitionCardList: JSX.Element[] = [];
  for (let i = 0; i < searchResults.length; i++) {
    definitionCardList.push(
      <DefinitionCard
        key={"definition" + i}
        id={"definition" + i}
        data={searchResults[i]}
      />
    );
  }

  return (
    <div className="flex flex-col p-2 gap-2 w-[400px] h-[400px] rounded-lg bg-gray-100 overflow-y-scroll">
      {definitionCardList.length === 0 ? (
        <div className="flex justify-center items-center min-h-full">
          <p className="text-2xl font-bold text-gray-400 text-center">Your search terms did not match any entries.</p>
        </div>
      ) : (
        definitionCardList
      )}
    </div>
  );
};

export default DefinitionsContainer;
