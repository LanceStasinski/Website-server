import { NextFunction } from "express";
import { ContentObj, ImageData } from "../../controllers/blog-controller";
import HttpError from "../../models/http-error";

const parseContent = (
  numContent: number | string,
  reqKeys: string[],
  filesArr: any | Express.Multer.File[],
  body: any,
  next: NextFunction
) => {
  const content: ContentObj[] = [];
  for (let i = 1; i <= Number(numContent); i++) {
    const contentObj: ContentObj = <ContentObj>{};
    const imgData = <ImageData>{};
    for (const key of reqKeys) {
      const matchedNumber = key.match(/\d+/);
      if (matchedNumber && matchedNumber[0] === i.toString()) {
        if (/types/.test(key)) {
          contentObj.type = body[key];
        }
        if (/text/.test(key)) {
          contentObj.text = body[key];
        }
        if (/alt/.test(key)) {
          contentObj.alt = body[key];
        }
        if (/caption/.test(key)) {
          contentObj.caption = body[key];
        }
        if (/language/.test(key)) {
          contentObj.language = body[key];
        }
      }
    }

    for (const file of filesArr) {
      const matchedNumber = file.fieldname.match(/\d+/);
      if (matchedNumber && matchedNumber[0] === i.toString()) {
        imgData.key = file.key;
        imgData.bucket = file.bucket;
        contentObj.image = imgData;
      }
    }

    if (contentObj.type === "image" || contentObj.type === "imageUrl") {
      if (contentObj.alt === "") {
        const err = new HttpError("Alternative text needed.", 422);
        next(err);
        return err;
      }
      if (contentObj.caption === "") {
        const err = new HttpError("Image caption needed.", 422);
        next(err);
        return err;
      }
    }

    if (
      contentObj.type === "code" ||
      contentObj.type === "heading" ||
      contentObj.type === "paragraph" ||
      contentObj.type === "imageUrl"
    ) {
      if (contentObj.text === "") {
        const err = new HttpError("Text content missing.", 422);
        next(err);
        return err;
      }
    }

    if (contentObj.type === "code" && contentObj.language === "") {
      const err = new HttpError("Code language missing.", 422);
      next(err);
      return err;
    }

    if (contentObj.type === "image" && Object.keys(imgData).length === 0) {
      const err = new HttpError("Image specified but not provided.", 422);
      next(err);
      return err;
    }

    if (Object.keys(contentObj).length > 0) {
      content.push(contentObj);
    }
  }
  return content;
};

export default parseContent;
