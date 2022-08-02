import * as htmlparser2 from "htmlparser2";
import { default as CSSselect } from "css-select";

import {SearchResultInterface} from "../../../popup/Popup";

const CambridgeEnglish = async (search: string) => {
  const searchResults: SearchResultInterface[] = [];

  await fetch("https://dictionary.cambridge.org/dictionary/english/" + search)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      const document = htmlparser2.parseDocument(html);

      // @ts-ignore
      let audioURL: string = CSSselect("source[type=audio/mpeg]", document)[1].attribs.src;
      audioURL = "https://dictionary.cambridge.org" + audioURL;

      for (const dictionary of CSSselect(".pr.dictionary", document)) {

        let dictionaryName: string = "";
        if (CSSselect(".di-head.c_h.di_h .di-title.di_t .c_hh", dictionary).length > 0) {
          dictionaryName = htmlparser2.DomUtils.textContent(CSSselect(".di-head.c_h.di_h .di-title.di_t .c_hh", dictionary)).split(" | ")[1];
        }

        for (const bodyClassifiedByPartsOfSpeech of CSSselect(".pr.entry-body__el", dictionary)) {
          for (const definitionBlock of CSSselect(".pos-body .pr.dsense .def-block.ddef_block ", bodyClassifiedByPartsOfSpeech)) {

            let definition: string = htmlparser2.DomUtils.textContent(CSSselect(".def.ddef_d.db", definitionBlock));
            definition = definition.replaceAll("\n", "");
            definition = definition.replaceAll("  ", "");

            const examples: string[] = [];
            for (const example of CSSselect(".examp.dexamp", definitionBlock)) {
              examples.push(htmlparser2.DomUtils.textContent(example));
            }

            // @ts-ignore
            if (definitionBlock.parentNode.attribs.class === "phrase-body dphrase_b") {
              // @ts-ignore
              const name: string = htmlparser2.DomUtils.textContent(CSSselect(".phrase-title.dphrase-title", definitionBlock.parentNode.prev));

              searchResults.push({
                name,
                definition,
                examples,
                tags: ["phrase", dictionaryName, "Cambridge"],
                audioURL,
              });
            } else {
              const name: string = htmlparser2.DomUtils.textContent(CSSselect(".pos-header.dpos-h .di-title .hw.dhw", bodyClassifiedByPartsOfSpeech));
              const partOfSpeech: string = htmlparser2.DomUtils.textContent(CSSselect(".pos-header.dpos-h .posgram.dpos-g .pos.dpos", bodyClassifiedByPartsOfSpeech));

              searchResults.push({
                name,
                definition,
                examples,
                tags: [partOfSpeech, dictionaryName, "Cambridge"],
                audioURL,
              });
            }
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return searchResults;
};

export default CambridgeEnglish;

