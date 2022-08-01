import * as htmlparser2 from "htmlparser2";
import {default as CSSselect} from "css-select";
import {default as render} from "dom-serializer";
const CambridgeEnglish = (search: string) => {
 fetch("https://dictionary.cambridge.org/dictionary/english/" + search).then(response => {
  return response.text();
 }).then((html) => {
  const document = htmlparser2.parseDocument(html);
  const generalDictionary = CSSselect(".pr.dictionary", document)[0];
  for (let definition of CSSselect(".def-block.ddef_block .ddef_h .def", generalDictionary)) {
   console.log(htmlparser2.DomUtils.textContent(definition));
  }
 }).catch(error => {
  console.log(error);
 });
}

export default CambridgeEnglish;

