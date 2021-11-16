import { iSource } from "../posts/post_model";

/**
 * This object represents any kind of picture/video/gif
 * from almost any booru source
 */
export default class Gallery implements Galleries_Interface {
  page: number;
  source: string;
  tags: string[];
  posts: Gallery_Post_Interface[];
  /**
   * @param  {number} page
   * @param  {string} source
   * @param  {Gallery_Post_Interface[]} posts
   * @param  {string[]} tags
   *
   */
  constructor({
    page,
    source,
    tags,
    posts,
  }: {
    page: number;
    source: string;
    tags: string[];
    posts: Gallery_Post_Interface[];
  }) {
    this.page = page;
    this.source = source;
    this.tags = tags;
    this.posts = posts;
  }
}

export class Gallery_post implements Gallery_Post_Interface {
  title: string;
  source: iSource;
  thumbnail: string;
  type: string;
  date: string;
  pages: number;

  constructor({
    title,
    source,
    thumbnail,
    type,
    date,
    pages,
  }: {
    title: string;
    source: iSource;
    thumbnail: string;
    type: string;
    date: string;
    pages: number;
  }) {
    this.title = title;
    this.source = source;
    this.thumbnail = thumbnail;
    this.type = type;
    this.date = date;
    this.pages = pages;
  }
}

export interface Galleries_Interface {
  page: number;
  source: string;
  tags: string[];
  posts: Array<Gallery_Post_Interface>;
}

export interface Gallery_Post_Interface {
  title: string;
  source: iSource; // width height address
  thumbnail: string;
  type: string;
  date: string;
  pages: number;
}
