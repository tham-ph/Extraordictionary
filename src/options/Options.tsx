import React, { useEffect, useState } from "react";

const Options = () => {
  const [ankiConnectStatus, setAnkiConnectStatus] = useState<string>("CHECKING...");
  useEffect(() => {
    chrome.runtime.sendMessage({action: "getPopupOption"}, response => {
      console.log(response);
      const radios = document.getElementsByName("popup-option") as NodeListOf<HTMLInputElement> | null;
      if (radios) {
        for (let i = 0; i < radios.length; i++) {
          if (radios[i].value == response) {
            radios[i].checked = true;
          }
        }
      }
    });
    chrome.runtime.sendMessage(
      { action: "checkAnkiConnectStatus" },
      (response) => {
        setAnkiConnectStatus(response);
      }
    );
  }, []);
  let ankiConnectStatusWithStyles: JSX.Element;
  if (ankiConnectStatus === "CONNECTED") {
    ankiConnectStatusWithStyles = (
      <div className="text-center rounded-lg p-1 bg-teal-400/30 text-teal-600">
        CONNECTED
      </div>
    );
  } else if (ankiConnectStatus === "UNCONNECTED") {
    ankiConnectStatusWithStyles = (
      <div className="text-center rounded-lg p-1 bg-red-400/30 text-red-600">
        UNCONNECTED
      </div>
    );
  } else {
    ankiConnectStatusWithStyles = (
      <div className="text-center rounded-lg p-1 bg-yellow-400/30 text-yellow-600">
        CHECKING...
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <form className="flex flex-col justify-center items-center gap-8 p-4 bg-white rounded-lg w-[600px]">
        <div className="flex justify-center items-center gap-2">
          <img className="w-10" src="/assets/icon.svg" alt="icon" />
          <img
            className="h-6"
            src="/assets/Extraordictionary.svg"
            alt="Extradictionary"
          />
        </div>
        <h2 className="text-xl font-bold">Extension Options</h2>
        <div className="flex flex-col px-16 items-start w-full">
          <div className="flex font-medium justify-center items-center gap-2">
            <p className="text-base"> AnkiConnect status : </p>
            <div className="text-sm">{ankiConnectStatusWithStyles}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <p className="text-base font-medium">
                Popup translation when you select a word or phrase :
              </p>
            </div>
            <div className="flex flex-col items-start px-4 gap-1">
              <div className="flex justify-center items-center gap-2">
                <input type="radio" name="popup-option" value={1} />
                <label className="text-sm">Immediately display popup although searching is not found</label>
              </div>
              <div className="flex justify-center items-center gap-2">
                <input type="radio" name="popup-option" value={2} />
                <label className="text-sm">
                  Immediately display popup only if searching is found
                </label>
              </div>
              <div className="flex justify-center items-center gap-2">
                <input type="radio" name="popup-option" value={3} />
                <label className="text-sm">Don't display popup</label>
              </div>
            </div>
          </div>
        </div>
        <input
          className="px-4 py-2 text-base font-medium rounded-md bg-sky-400 text-white"
          type="submit"
          value="Save"
          onClick={() => {
            const radios = document.getElementsByName("popup-option") as NodeListOf<HTMLInputElement> | null;
            if (radios) {
              for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                  chrome.runtime.sendMessage({action: "setPopupOption", option: radios[i].value});
                }
              }
            }
          }}
        />
      </form>
    </div>
  );
};

export default Options;
