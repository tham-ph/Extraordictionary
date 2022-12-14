import * as htmlparser2 from "htmlparser2";
import { default as CSSselect } from "css-select";

import {SearchResultInterface} from "../../../popup/Popup";

const cambridgeEnglish = async (search: string) => {
  const searchResults: SearchResultInterface[] = [];

  await fetch("https://dictionary.cambridge.org/dictionary/english/" + search)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      const document = htmlparser2.parseDocument(html);
      let audioURL: string = "";

      if (CSSselect("source[type=audio/mpeg]", document)[1]) {
        // @ts-ignore
        audioURL = CSSselect("source[type=audio/mpeg]", document)[1].attribs.src;
      }
      audioURL = "https://dictionary.cambridge.org" + audioURL;

      for (const dictionary of CSSselect(".pr.dictionary", document)) {

        let dictionaryName: string = "";
        if (CSSselect(".di-head.c_h.di_h .di-title.di_t .c_hh", dictionary).length > 0) {
          dictionaryName = htmlparser2.DomUtils.textContent(CSSselect(".di-head.c_h.di_h .di-title.di_t .c_hh", dictionary)).split(" | ")[1];
        }

        const extractDefinitions = (bodyClassifiedByPartsOfSpeech: any) => {
          for (const definitionBlock of CSSselect(".pr.dsense .def-block.ddef_block ", bodyClassifiedByPartsOfSpeech)) {
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
              const name: string = htmlparser2.DomUtils.textContent(CSSselect(".di-title", bodyClassifiedByPartsOfSpeech));
              let partOfSpeech: string = htmlparser2.DomUtils.textContent(CSSselect(".pos.dpos", bodyClassifiedByPartsOfSpeech));
              if (partOfSpeech === "phrasal verbverb") partOfSpeech = "phrasal verb";

              const codeDoc = CSSselect(".pos-header.dpos-h .posgram.dpos-g .gram.dgram", bodyClassifiedByPartsOfSpeech);
              let code: string = "";
              if (codeDoc.length > 0) {
                code = htmlparser2.DomUtils.textContent(codeDoc[0]);
                code = code.replaceAll(" ", "");
                if (code === "[C]") {
                  code = "countable";
                } else if (code === "[U]") {
                  code = "uncountable";
                } else if (code === "[C/U]") {
                  code = "countable/uncountable";
                } else {
                  code = "";
                }
              }

              searchResults.push({
                name,
                definition,
                examples,
                tags: [partOfSpeech, code, dictionaryName, "Cambridge"],
                audioURL,
              });
            }
          }
        }

        for (const bodyClassifiedByPartsOfSpeech of CSSselect(".entry-body__el", dictionary)) {
          extractDefinitions(bodyClassifiedByPartsOfSpeech);
        }

        //for idiom
        for (const bodyClassifiedByPartsOfSpeech of CSSselect(".idiom-block", dictionary)) {
          extractDefinitions(bodyClassifiedByPartsOfSpeech);
        }

      }
    })
    .catch((error) => {
      console.error(`The definitions of "${search}" can't be found on Cambridge English dictionary`);
    });

  return searchResults;
};

export default cambridgeEnglish;

