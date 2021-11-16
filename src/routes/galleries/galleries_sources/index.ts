/* eslint-disable new-cap */
import { Request, Response } from "express";
import { searchEHentai } from "../../../data/galleries";
import Gallery, {
  Gallery_post,
  Gallery_Post_Interface,
} from "../../../models/galleries/galleries_model";
import { Source } from "../../../models/posts/post_model";

const eHentaiRouter = async (req: Request, res: Response) => {
  const { tags } = req.query;
  const result = await searchEHentai({ searchQuery: tags as string });

  let posts: Array<Gallery_Post_Interface> = [];
  result.posts.forEach((element: any) => {
    let source = new Source(element.address,element.width, element.height, req );
    let post: Gallery_post = new Gallery_post(
      { title: element.title, source, thumbnail: element.thumbnail, type: element.type, date: element.date, pages: element.pages }    );
    posts.push(post);
  });
  const newResult: Gallery = new Gallery(
    { page: result.page, source: result.url, tags: result.tags.split(" "), posts }  );

  res.send(newResult);
};

export default eHentaiRouter;
