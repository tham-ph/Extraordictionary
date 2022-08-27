import { SearchResultInterface } from "../popup/Popup";
import cambridgeEnglish from "./scrapers/dictionaries/cambridgeEnglish";
import oxfordEnglish from "./scrapers/dictionaries/oxfordEnglish";

const translate = async (search: string, dictionaries: string[]) => {
  let allDictionariesSearchResults: SearchResultInterface[] = [];
  for (const dictionary of dictionaries) {
    if (dictionary === "cambridgeEnglish") {
      const searchResults = await cambridgeEnglish(search);
      for (const searchResult of searchResults) {
        allDictionariesSearchResults.push(searchResult);
      }
    }
    if (dictionary === "oxfordEnglish") {
      const searchResults = await oxfordEnglish(search);
      for (const searchResult of searchResults) {
        allDictionariesSearchResults.push(searchResult);
      }
    }
  }
  return allDictionariesSearchResults;
};

export default translate;