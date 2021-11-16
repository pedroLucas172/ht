/* eslint-disable new-cap */
import { Request, Response } from "express";
import { Toplist } from "../../../data/galleries/topList";
import { fullUrl, semiFullUrl } from "../../../lib/tools/fullUrl";
import Gallery, {
  Gallery_post,
  Gallery_Post_Interface,
} from "../../../models/galleries/galleries_model";
import { Source } from "../../../models/posts/post_model";

const eHentaiRouter = async (req: Request, res: Response) => {
  var { tags, type } = req.query || "";
  tags = tags as string;
  if (tags == undefined) {
    tags = "";
  }

  if (type == undefined) {
    type = "allTime";
  }

  var result;
  switch (type) {
    case "alltime":
      result = await Toplist.getAllTime();
      break;
    case "pastYear":
      result = await Toplist.getPastYear();
      break;
    case "pastMonth":
      result = await Toplist.getPastMonth();
      break;
    case "yesterday":
      result = await Toplist.getYesterday();
      break;
    default:
      result = await Toplist.getAllTime();
      break;
  }

  let posts: Array<Gallery_Post_Interface> = [];
  result.posts.forEach((element: any) => {
    let source = new Source(element.address, element.width, element.height, req);
    let post: Gallery_post = new Gallery_post({
      title: element.title,
      source,
      thumbnail: element.thumbnail,
      type: element.type,
      date: element.date,
      pages: element.pages,
    });
    posts.push(post);
  });
  const newResult: Gallery = new Gallery({
    page: result.page,
    source: result.url,
    tags: tags.split(" "),
    posts,
  });

  function _generateUrl(a: string): string {
    return `${semiFullUrl(req)}galleries/best?type=${a}`;
  }
  res.send({
    availableTypes: [
      _generateUrl("allTime"),
      _generateUrl("pastYear"),
      _generateUrl("pastMonth"),
      _generateUrl("yesterday"),
    ],
    selectedType: type,
    result: newResult,
  });
};

export default eHentaiRouter;
