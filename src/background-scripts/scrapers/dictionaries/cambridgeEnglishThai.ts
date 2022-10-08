import * as htmlparser2 from "htmlparser2";
import { default as CSSselect } from "css-select";

import {SearchResultInterface} from "../../../popup/Popup";

const cambridgeEnglishThai = async (search: string) => {
  const searchResults: SearchResultInterface[] = [];

  await fetch("https://dictionary.cambridge.org/dictionary/english-thai/" + search)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      const document = htmlparser2.parseDocument(html);
      let audioURL: string = "";
      for (const dictionary of CSSselect(".pr.dictionary", document)) {

        let dictionaryName = "English-Thai";
        const extractDefinitions = (bodyClassifiedByPartsOfSpeech: any) => {
          for (const definitionBlock of CSSselect(".pr.dsense .def-block.ddef_block ", bodyClassifiedByPartsOfSpeech)) {
            let definition: string =  htmlparser2.DomUtils.textContent(CSSselect(".trans.dtrans", definitionBlock));
            definition = definition.replaceAll("\n", "");
            definition = definition.replaceAll("  ", "");
            definition += "\n";
            definition += htmlparser2.DomUtils.textContent(CSSselect(".def.ddef_d.db", definitionBlock));

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

        for (const bodyClassifiedByPartsOfSpeech of CSSselect(".link.dlink", dictionary)) {
          extractDefinitions(bodyClassifiedByPartsOfSpeech);
        }

      }
    })
    .catch((error) => {
      console.error(`The definitions of "${search}" can't be found on Cambridge English-Thai dictionary`);
    });

  return searchResults;
};

export default cambridgeEnglishThai;

