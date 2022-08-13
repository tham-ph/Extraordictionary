import React, { useEffect, useState } from "react";
import {chooseDeck} from "../../background-scripts/ankiController";

const ChoosingDeckDropdowns = () => {
  const [deckNameList, setDeckNameList] = useState<JSX.Element[]>([]);
  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getDeckNames" }, (response) => {
      chrome.runtime.sendMessage({action: "getChosenDeck"}, chosenDeck => {
        const tempList: JSX.Element[] = [];
        for (let i = 0; i < response.length; i++) {
          tempList.push(
            <li
              id={response[i]}
              key={response[i]}
              className="p-2 rounded-lg border border-gray-100 cursor-pointer hover:bg-sky-400/10 hover:text-sky-600"
              onClick={(event) => {
                chrome.runtime.sendMessage(
                  { action: "chooseDeck", deckName: response[i] },
                  (response) => {
                    console.log(response);

                    document.getElementById(chosenDeck)?.classList.toggle("border-2");
                    document.getElementById(chosenDeck)?.classList.toggle("border-sky-400");
                    document.getElementById(chosenDeck)?.classList.toggle("bg-sky-400/10");
                    document.getElementById(chosenDeck)?.classList.toggle("text-sky-600");

                    const eventTarget = event.target as HTMLLIElement;
                    document.getElementById(eventTarget.id)?.classList.toggle("border-2");
                    document.getElementById(eventTarget.id)?.classList.toggle("border-sky-400");
                    document.getElementById(eventTarget.id)?.classList.toggle("bg-sky-400/10");
                    document.getElementById(eventTarget.id)?.classList.toggle("text-sky-600");
                    chosenDeck = eventTarget.id;

                    chrome.runtime.sendMessage({action: "chooseDeck", deckName: chosenDeck}, () => {});

                    document.getElementById("choosing-deck-dropdown")?.classList.toggle("hidden");

                  }
                );
              }}
            >
              {response[i]}
            </li>
          );
        }
        document.getElementById(chosenDeck)?.classList.toggle("border-2");
        document.getElementById(chosenDeck)?.classList.toggle("border-sky-400");
        document.getElementById(chosenDeck)?.classList.toggle("bg-sky-400/10");
        document.getElementById(chosenDeck)?.classList.toggle("text-sky-600");
        setDeckNameList(tempList);
      });
    });
  }, []);

  return (
    <div
      id="choosing-deck-dropdown"
      className="hidden fixed right-3 mt-1 drop-shadow-lg bg-white h-[200px] w-[300px] whitespace-nowrap overflow-y-auto overflow-x-auto"
      style={{ zIndex: "2020" }}
    >
      <ul className="min-w-fit border border-gray-100">{deckNameList}</ul>
    </div>
  );
};

export default ChoosingDeckDropdowns;
