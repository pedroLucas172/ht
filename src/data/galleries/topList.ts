/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
import axios from "axios";
import cheerio from "cheerio";


/**
 * Adds two numbers together.
 * @param {int} pageNumber first number.
 * @param {int} selection this thing depends on wich kind of content you want
 * @return {int} The sum of the two numbers.
 */
export async function searchEHentaiTopLists({
  pageNumber = 1,
  baseUrl = ``,
}: { pageNumber?: number; baseUrl?: string } = {}): Promise<{
  url: string;
  page: number;
  posts: any;
}> {
  if (isNaN(pageNumber)) {
    pageNumber = 0;
  }
  const url = `${baseUrl}&p=${pageNumber - 1}`;

  const response = await axios.get(url, {
    headers: {
      Cookie: "nw=1",
    },
  });
  const rawHtml = response.data;
  const $ = cheerio.load(rawHtml as string);
  const info: any = [];
  const thumbs = $(".glthumb");

  /**
   * @constructor
   * @this any
   */
  thumbs.each(function (): void {
    const ovo: any = this as any;
    const things = $(ovo as any)["0"].children[0].children[0].attribs;
    let thumbnail: any;
    thumbnail = things["src"];
    info.push({
      width: things.style.split(":")[2].split(";")[0].replace("px", ""),
      height: things.style.split(":")[1].split(";")[0].replace("px", ""),
      title: things.title,
      thumbnail: thumbnail,
    });
  });

  let links = ($(".itg")[0].children[0] as any).children;
  if (links == undefined) {
    links = ($(".itg")[0].children[1] as any).children;
  }
  links = links.filter((e: any) => e.type != "text");
  let c = 0;
  links.forEach(function (element: any): void {
    try {
      const pages = element.children[4].children[1].children[0].data;
      const address = element.children[3].children[0].attribs["href"];
      const type = element.children[1].children[0].children[0].data;
      const date = element.children[2].children[2].children[0].children[0].data;
      info[c]["address"] = address;
      info[c]["type"] = type;
      info[c]["date"] = date;
      info[c]["pages"] = pages.replace(" pages", "");
      c++;
    } catch (e) {}
  });

  const result = {
    url: url,
    page: pageNumber,
    posts: info,
  };

  return result;
}

export class Toplist {
  static async getAllTime(
    pageNumber: number = 0
  ): Promise<{ url: string; page: number; posts: any }> {
    return await searchEHentaiTopLists({
      pageNumber: pageNumber,
      baseUrl: "https://e-hentai.org/toplist.php?tl=11",
    });
  }

  static async getPastYear(
    pageNumber: number = 0
  ): Promise<{ url: string; page: number; posts: any }> {
    return await searchEHentaiTopLists({
      pageNumber: pageNumber,
      baseUrl: "https://e-hentai.org/toplist.php?tl=12",
    });
  }

  static async getPastMonth(
    pageNumber: number = 0
  ): Promise<{ url: string; page: number; posts: any }> {
    return await searchEHentaiTopLists({
      pageNumber: pageNumber,
      baseUrl: "https://e-hentai.org/toplist.php?tl=13",
    });
  }

  static async getYesterday(
    pageNumber: number = 0
  ): Promise<{ url: string; page: number; posts: any }> {
    return await searchEHentaiTopLists({
      pageNumber: pageNumber,
      baseUrl: "https://e-hentai.org/toplist.php?tl=15",
    });
  }
}
