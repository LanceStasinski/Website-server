import { RefObj } from "../controllers/blog-controller";

const parseReferences = (
  numReferences: number | string,
  reqKeys: string[],
  body: any
) => {
  const references: RefObj[] = [];
  for (let i = 1; i <= Number(numReferences); i++) {
    const refObj: RefObj = <RefObj>{};
    const regex = new RegExp(i.toString());
    for (const key of reqKeys) {
      if (regex.test(key)) {
        if (/authors/.test(key)) {
          refObj.authors = body[key];
        }
        if (/date/.test(key)) {
          refObj.date = body[key];
        }
        if (/title/.test(key)) {
          refObj.title = body[key];
        }
        if (/url/.test(key)) {
          refObj.url = body[key];
        }
      }
    }
    if (Object.keys(refObj).length > 0) {
      references.push(refObj);
    }
  }
  return references;
};

export default parseReferences;