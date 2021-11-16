/* eslint-disable new-cap */
import { Request, Response } from "express";
import searchEHentaiGallery from "../../../data/galleries/galleryDetails";
function Set_toJSON(key: any, value: any) {
  key = key;
  if (typeof value === 'object' && value instanceof Set) {
    return [...value];
  }
  return value;
}

const eHentaiRouter = async (req: Request, res: Response) => {
  const { url } = req.query;
  if (url == undefined){
      return res.send(":( bad url");
  }
  console.log(url)
  const result = await searchEHentaiGallery(url as string);

  result.thumbs = [...result.thumbs]
  result.urls = [...result.urls]

  res.send(JSON.stringify({result}));
};

export default eHentaiRouter;
