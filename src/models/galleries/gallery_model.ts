/**
 * This object represents any kind of picture/video/gif
 * from almost any booru source
 */
export default class Gallery implements Gallery_Interface {
  url: string;
  maxPage: number;
  rating: iRating;
  metaData: iMetaData;
  tagList: any;
  thumbs: string[];
  pages: string[];
  /**
   * @param  {string} url
   * @param  {number} maxPage
   * @param  {iRating} rating
   * @param  {iMetaData} metaData
   * @param  {any} tagList
   * @param  {Array<string>} thumbs
   * @param  {Array<string>} pages
   */
  constructor({
    url,
    maxPage,
    rating,
    metaData,
    tagList,
    thumbs,
    pages,
  }: {
    url: string;
    maxPage: number;
    rating: iRating;
    metaData: iMetaData;
    tagList: any;
    thumbs: Array<string>;
    pages: Array<string>;
  }) {
    this.url = url;
    this.maxPage = maxPage;
    this.rating = rating;
    this.metaData = metaData;
    this.tagList = tagList;
    this.thumbs = thumbs;
    this.pages = pages;
  }
}

export interface Gallery_Interface {
  url: string;
  maxPage: number;
  rating: iRating;
  metaData: iMetaData;
  tagList: any;
  thumbs: Array<string>;
  pages: Array<string>;
}

export interface iRating {
  rateNumber: number;
  rateAverage: number;
}

export interface iMetaData {
  posted: string;
  parent: string;
  visible: boolean;
  language: string;
  fileSize: string;
  length: number;
  favorited: number;
}
