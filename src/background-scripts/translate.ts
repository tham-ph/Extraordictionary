import { SearchResultInterface } from "../popup/Popup";
import cambridgeEnglish from "./scrapers/dictionaries/cambridgeEnglish";
import oxfordEnglish from "./scrapers/dictionaries/oxfordEnglish";
import cambridgeEnglishThai from "./scrapers/dictionaries/cambridgeEnglishThai";

const translate = async (search: string, dictionaries: string[]) => {
  let allDictionariesSearchResults: SearchResultInterface[] = [];
  let preparedArray: SearchResultInterface[][] = [[]];

  for (const dictionary of dictionaries) {
    if (dictionary === "Cambridge English") {
      const searchResults = await cambridgeEnglish(search);
      preparedArray.push(searchResults);
    } else if (dictionary === "Oxford English") {
      const searchResults = await oxfordEnglish(search);
      preparedArray.push(searchResults);
    } else if (dictionary === "Cambridge English-Thai") {
      const searchResults = await cambridgeEnglishThai(search);
      preparedArray.push(searchResults);
    }
  }

  //mix all dictionaries
  let index = 0;
  while (true) {
    let can = false;
    for (const searchResults of preparedArray) {
      if (index < searchResults.length) {
        allDictionariesSearchResults.push(searchResults[index]);
        can = true;
      }
    }
    if (!can) break;
    index++;

  }
  return allDictionariesSearchResults;
};

export default translate;