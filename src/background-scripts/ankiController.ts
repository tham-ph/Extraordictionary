const ankiInvoke = async (action: string, params: object) => {
  const version = 6;
  let result: any = {};
  fetch("http://127.0.0.1:8765", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action, version, params }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      result = data.result;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

const getDeckNames = async () => {
  return await ankiInvoke("deckNames", {});
};

const addCard = async (frontCardHTML: string, backCardHTML: string) => {
  return await ankiInvoke("addNote", {
    "note": {
      "deckName": "test1",
      "modelName": "Basic",
      "fields": {
        "Front": frontCardHTML,
        "Back": backCardHTML
      },
      "tags": [
        "Extraordictionary"
      ],
      "options": {
        "allowDuplicate": false,
        "duplicateScope": "deck",
        "duplicateScopeOptions": {
          "deckName": "test1",
          "checkChildren": false,
          "checkAllModels": false
        }
      },
    }
  })
}

export { ankiInvoke, getDeckNames, addCard};
