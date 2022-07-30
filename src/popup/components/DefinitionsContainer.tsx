import React from "react";
import DefinitionCard from "./DefinitionCard";

const DefinitionsContainer = () => {
  const definitionCardList: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    definitionCardList.push(<DefinitionCard key={i} id={"definition-" + i}/>)
  }
  return (
    <div className="flex flex-col p-2 gap-2 w-[400px] h-[400px] rounded-lg bg-gray-100 overflow-y-scroll">
      {definitionCardList}
    </div>
  );
};

export default DefinitionsContainer;