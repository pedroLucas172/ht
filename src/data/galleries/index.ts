/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
import axios from "axios";
import cheerio from "cheerio";

/**
 * Adds two numbers together.
 * @param {int} pageNumber first number.
 * @param {int} searchQuery The second number.
 * @param {int} baseUrl this thing depends on wich kind of content you want
 * @param {int} selection this thing depends on wich kind of content you want
 * @return {int} The sum of the two numbers.
 */
export async function searchEHentai({
  pageNumber = 0,
  searchQuery = "",
  baseUrl = `https://e-hentai.org/?advsearch=1&f_sname=on&f_stags=on&f_sdesc=on&f_storr=on&f_sto=on&f_sdt2=on&f_sh=on&f_sr=on&f_srdd=4&f_spf=&f_spt=&f_sfl=on&f_sfu=on&f_sft=on`,
  selection = 0,
}: {
  pageNumber?: number;
  searchQuery?: string;
  baseUrl?: string;
  selection?: number;
} = {}): Promise<{ url: string; page: number; tags: string; posts: any }> {
  if (isNaN(pageNumber)) {
    pageNumber = 0;
  }
  const url = `${baseUrl}&page=${pageNumber}&f_cats=${selection}&f_search=${searchQuery}`;
  const response = await axios.get(url, {
    headers: {
      Cookie: "nw=1",
    },
  });
  const rawHtml = response.data;
  const $ = cheerio.load(rawHtml as string);
  const info: any = [];
  const thumbs = $(".glthumb");

  let first = true;
  /**
   * @constructor
   * @this any
   */
  thumbs.each(function (): void {
    const ovo: any = this as any;
    const things = $(ovo as any)["0"].children[0].children[0].attribs;
    let thumbnail: any;
    if (first) {
      first = false;
      thumbnail = things["src"];
    } else {
      thumbnail = things["data-src"];
    }
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
  let c = 0;
  links.forEach(function (element: any): void {
    if (element.children[2] != undefined) {
      const tableRow = element;
      let divAddress = tableRow.children[2].children[0].attribs;
      if (divAddress != undefined) {
        divAddress = JSON.stringify(divAddress);
        divAddress = divAddress.split(":");
        const type = tableRow.children[0].children[0].children[0].data;
        const date = tableRow.children[1].children[2].children[0].children[0];
        const pages = tableRow.children[3].children[1].children[0].data;
        const url = divAddress[2].slice(0, divAddress[2].length - 3);
        const address = "http:" + url;
        info[c]["address"] = address;
        info[c]["type"] = type;
        info[c]["date"] = date.data;
        info[c]["pages"] = pages.replace(" pages", "");
        c++;
      }
    }
  });

  const result = {
    url: url,
    page: pageNumber,
    tags: searchQuery,
    posts: info,
  };

  return result;
}
