import * as htmlparser2 from "htmlparser2";
import { default as CSSselect } from "css-select";

import {SearchResultInterface} from "../../../popup/Popup";

const oxfordEnglish = async (search: string) => {
  search = search.toLowerCase();

  const searchResults: SearchResultInterface[] = [];

  await fetch("https://www.oxfordlearnersdictionaries.com/definition/english/" + search)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      const document = htmlparser2.parseDocument(html);

      const mainContainer = CSSselect(".main-container", document);
      let audioURL: string = "";
      if (CSSselect(".phons_n_am .sound", mainContainer)) {
        // @ts-ignore
        audioURL = CSSselect(".phons_n_am .sound", mainContainer)[0].attribs["data-src-mp3"];
      }

      const name = htmlparser2.DomUtils.textContent(CSSselect(".headword", mainContainer));
      const partOfSpeech = htmlparser2.DomUtils.textContent(CSSselect(".pos", mainContainer));

      for (const definitionBlock of CSSselect(".sense", mainContainer)) {
        const definition = htmlparser2.DomUtils.textContent(CSSselect(".def", definitionBlock));

        const examples: string[] = [];
        const examplesList = CSSselect(".examples", definitionBlock);
        if (examplesList.length > 0) {
          for (const example of CSSselect("li", examplesList[0])) {
            examples.push(htmlparser2.DomUtils.textContent(example));
          }
        }

        searchResults.push({
          name,
          definition,
          examples,
          tags: [partOfSpeech, "Oxford"],
          audioURL,
        });
      }

    })
    .catch((error) => {
      console.log(error);
    });

  return searchResults;
};

export default oxfordEnglish;

