import React from "react";
import DefinitionCard from "./DefinitionCard";

const DefinitionsContainer = () => {
  return (
    <div className="flex flex-col p-2 gap-2 w-[400px] h-[400px] rounded-lg bg-gray-100 overflow-y-scroll">
      <DefinitionCard />
      <DefinitionCard />
    </div>
  );
};

export default DefinitionsContainer;