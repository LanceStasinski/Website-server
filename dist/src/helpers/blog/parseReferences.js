"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseReferences = (numReferences, reqKeys, body) => {
    const references = [];
    for (let i = 1; i <= Number(numReferences); i++) {
        const refObj = {};
        for (const key of reqKeys) {
            const matchedNumber = key.match(/\d+/);
            if (matchedNumber && matchedNumber[0] === i.toString()) {
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
exports.default = parseReferences;
