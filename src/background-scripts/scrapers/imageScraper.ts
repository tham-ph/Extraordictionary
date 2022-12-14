import * as htmlparser2 from "htmlparser2";
import { default as CSSselect } from "css-select";
const imageScraper = async (search: string) => {
  const imageURLSearchResults: string[] = [];

  await fetch("https://www.google.com/search?q=" + search + "&tbm=isch").then(response => {
    return response.text();
  }).then(html => {
    const document = htmlparser2.parseDocument(html);
    for (const image of CSSselect("img", document)) {
      // @ts-ignore
      if (image.attribs["data-src"]) {
        // @ts-ignore
        imageURLSearchResults.push(image.attribs["data-src"]);
      }
    }
  }).catch(error => {
    console.error(`The images of "${search}" can't be found on Google Search Engine`);
  })

  return imageURLSearchResults;
}

export default imageScraper;
