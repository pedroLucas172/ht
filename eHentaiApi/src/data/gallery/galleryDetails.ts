import axios from "axios";
const cheerio = require("cheerio");
import { promisify } from "util";
import * as redis from "redis";
const client = redis.createClient({
  host: "redis-17499.c259.us-central1-2.gce.cloud.redislabs.com",
  port: 17499,
  password: "GqYBuITLi9NCmLo33lxym40d6vawZZFC",
});

const getAsync = promisify(client.get).bind(client);
getAsync("url"); // placeholder

/**
 * Adds two numbers together.
 * @param {string} _url
 * @param {int} _page
 */
export default async function searchEHentaiGallery(
  _url: string,
  _page: number = 1
): Promise<any> {
  const url = `${_url}?p=${_page - 1}`;

  // * the essential
  try {
    const response = await axios.get(url, {
      headers: {
        Cookie: "nw=1",
      },
    });

    const rawHtml = response.data;
    const $ = cheerio.load(rawHtml);

    // ! do not bother with this awful code, i'm just searching
    // ! things in a html file :/
    const metaDataHTML = $("#gdd").children().children().children();
    const todos = [
      metaDataHTML["0"],
      metaDataHTML["1"],
      metaDataHTML["2"],
      metaDataHTML["3"],
      metaDataHTML["4"],
      metaDataHTML["5"],
      metaDataHTML["6"],
    ];

    // ! Metadata
    const metaData = {};
    todos.forEach((e) => {
      try {
        const key = e.children["0"].children["0"].data;
        const value = e.children["1"].children["0"].data;
        metaData[key.substring(0, key.length - 1)] = value;
      } catch (e) {}
    });

    // ! TagList
    const ratingHTML = $("#taglist").children().children()["0"];
    const tagList = {};
    ratingHTML.children.forEach((element) => {
      const key = element.children[0].children[0].data;
      let value = "";
      element.children[1].children.forEach((element) => {
        value += element.children[0].children[0].data + "|";
      });
      tagList[key] = value;
    });

    // ! Images
    const postsHTML = $("#gdt").children();

    const thumbs = new Set();
    const urls = new Set();
    Object.entries<object>(postsHTML).forEach((element) => {
      try {
        const post: object = element[1];
        if (post["attribs"]["class"] == "gdtm") {
          const style = post["children"][0]["attribs"]["style"];
          const url = post["children"][0]["children"][0]["attribs"]["href"];
          thumbs.add(style.split("(")[1].split(")")[0]);
          urls.add(url);
        }
      } catch (e) {}
    });

    // ! Page quantity
    const pagesHTML = $(".ptt")["0"]["children"]["0"]["children"]["0"];

    const pages = [];
    pagesHTML["children"].forEach((element) => {
      try {
        let page = element["children"][0]["children"][0]["data"];
        page = Number.parseInt(page);
        pages.push(page);
      } catch {}
    });
    let maxPage = pages[pages.length - 2];
    if (maxPage == undefined) {
      maxPage = 1;
    }
    const rateCount = $("#rating_count")["0"]["children"][0].data;
    const rateAverage =
      $("#rating_label")["0"]["children"][0].data.split(" ")[1];

    return {
      url,
      maxPage,
      rating: {
        rateCount: rateCount,
        rateAverage: rateAverage,
      },
      metaData,
      tagList,
      thumbs,
      urls,
    };
  } catch (e) {
    return {
      url: 'error',
      maxPage: 'error',
      rating: {
        rateCount: 'error',
        rateAverage: 'error',
      },
      metaData: 'error',
      tagList: 'error',
      thumbs: 'error',
      urls: 'error',
    };
  }
}
