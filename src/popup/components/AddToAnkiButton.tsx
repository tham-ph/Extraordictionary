import React, {useContext, useEffect, useRef, useState} from "react";
import {
  AppContext,
  AppContextInterface,
  SearchResultInterface,
} from "../Popup";
import ChoosingDeckDropdowns from "./ChoosingDeckDropdowns";

const convertDefinitionCardToHTML = (data: SearchResultInterface) => {
  let html = "";

  html += `
    <div class="flex flex-col gap-2 p-2 rounded-lg bg-white border-4 border-white">
      <div class="flex items-center gap-2 break-all" style="width: 280px">
        <h2 class="text-2xl font-bold">${data.name}</h2>
      </div>
      `;

  html += '<div class="flex flex-wrap gap-1">';
  for (const tag of data.tags) {
    if (tag != "") {
      html += `<div class="flex gap-1 h-4 py-2 p-1 rounded-lg justify-center items-center bg-sky-400/20 text-xs text-sky-600 font-medium">${tag}</div>`;
    }
  }
  html += "</div>";

  html += `<p class="text-sm font-medium">${data.definition}</p>`;

  html += '<ul class="ml-6 list-disc text-xs italic">';
  for (const example of data.examples) {
    html += `<li>${example}</li>`;
  }
  html += "</ul>";

  html += "</div>";

  return html;
};

const convertImageCardToHTML = (imageURL: string) => {
  let html = "";
  html += `<div class="rounded-lg border-4 border-white" style="text-align: center; margin: auto;"><img style="width: 200px" src="${imageURL}" alt="picture"></div>`;
  return html;
};

const AddToAnkiButton = () => {
  const {
    selectedCardIdList,
    setAddToAnkiButtonClicked,
    setSelectedCardIdList,
    searchResults,
    imageURLSearchResults,
    searchInput,
  } = useContext<AppContextInterface>(AppContext);

  const selectedCardCounterRef = useRef<HTMLDivElement>(null);
  const [isAnkiConnect, setAnkiConnect] = useState<boolean>(false);

  useEffect(() => {
    chrome.runtime.sendMessage({action: "checkAnkiConnectStatus"}, response => {
      if (response == "CONNECTED") {
        setAnkiConnect(true);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedCardCounterRef.current) {
      if (selectedCardIdList.length > 0) {
        selectedCardCounterRef.current.style.display = "block";
      } else {
        selectedCardCounterRef.current.style.display = "none";
        setAddToAnkiButtonClicked(false);
      }
    }
  }, [selectedCardIdList]);

  return (
    <div>
      <div className="flex divide-x-2">
        <button
          disabled={!isAnkiConnect}
          className="flex justify-center items-center gap-2 p-2  bg-sky-400 rounded-l-lg text-sm font-bold text-white hover:bg-sky-600 disabled:bg-gray-300"
          onClick={() => {
            setAddToAnkiButtonClicked(true);

            const cardHTMLGathering: string[] = [];
            for (const id of selectedCardIdList) {
              const index = parseInt(id.split(" ")[1]);
              if (id.split(" ")[0] === "definition") {
                cardHTMLGathering.push(
                  convertDefinitionCardToHTML(searchResults[index])
                );
              } else {
                cardHTMLGathering.push(
                  convertImageCardToHTML(imageURLSearchResults[index])
                );
              }
            }

            let backCardHTML =
              "<div class='flex flex-col p-2 gap-2 rounded-lg bg-gray-100' style='width: 350px; margin: auto;'>";
            for (const cardHTML of cardHTMLGathering) {
              backCardHTML += cardHTML;
            }
            backCardHTML += "</div>";

            let frontCardHTML = `<p class="font-regular text-2xl text-center p-2">${searchInput}</p>`;

            chrome.runtime.sendMessage(
              { action: "addCardToAnki", frontCardHTML, backCardHTML },
              (response) => {
                console.log(response);
                setAddToAnkiButtonClicked(false);
                setSelectedCardIdList([]);
              }
            );
          }}
        >
          <p>ADD TO ANKI</p>
          <div
            className="flex justify-center items-center text-xs text-sky-500 bg-white p-1 w-6 h-6 rounded-full"
            ref={selectedCardCounterRef}
          >
            {selectedCardIdList.length}
          </div>
        </button>
        <button
          disabled={!isAnkiConnect}
          className="bg-sky-400 rounded-r-lg hover:bg-sky-600 disabled:bg-gray-300"
          onClick={() => {
            document.getElementById("choosing-deck-dropdown")?.classList.toggle("hidden");
          }}
        >
          <svg
            className="fill-white"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z" />
          </svg>
        </button>
      </div>
      <ChoosingDeckDropdowns />
    </div>
  );
};

export default AddToAnkiButton;
