import React, { useEffect, useState } from "react";

const Filter = () => {
  const [selectedDictionaries, setSelectedDictionaries] = useState<string[]>([]);
  const [allDictionaries, setAllDictionaries] = useState<string[]>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getAllDictionaries" }, (response) => {
      setAllDictionaries(response);
    });
    chrome.runtime.sendMessage(
      { action: "getSelectedDictionaries" },
      (response) => {
        setSelectedDictionaries(response);
      }
    );
  }, []);

  const checkBoxes: JSX.Element[] = [];
  for (let i = 0; i < allDictionaries.length; i++) {
    const checkbox = (
      <input
        type="checkbox"
        value={allDictionaries[i]}
        checked={selectedDictionaries.includes(allDictionaries[i])}
        onChange={(event) => {
          if (selectedDictionaries.includes(event.target.value)) {
            const temp = selectedDictionaries;
            temp.splice(temp.indexOf(event.target.value), 1);
            chrome.runtime.sendMessage(
              {
                action: "setSelectedDictionaries",
                dictionaries: temp,
              },
              () => {
                setSelectedDictionaries([...temp]);
              }
            );
          } else {
            chrome.runtime.sendMessage(
              {
                action: "setSelectedDictionaries",
                dictionaries: [...selectedDictionaries, event.target.value]
              },
              () => {
                setSelectedDictionaries([
                  ...selectedDictionaries,
                  event.target.value,
                ]);
              }
            );
          }
        }}
      />
    );
    const label = <label>{allDictionaries[i]}</label>;
    checkBoxes.push(
      <div
        key={"dictionary-checkbox " + i}
        className="flex items-center gap-2 text-sm font-normal"
      >
        {checkbox}
        {label}
      </div>
    );
  }

  return (
    <form
      id="filter"
      className="flex flex-col p-2 gap-2 fixed hidden right-16 drop-shadow-lg bg-white w-[200px] max-h-[300px] overflow-y-auto"
    >
      {checkBoxes}
    </form>
  );
};

export default Filter;
