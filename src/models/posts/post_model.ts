import { Request } from "express";
import { semiFullUrl } from "../../lib/tools/fullUrl";

/**
 * This object represents any kind of picture/video/gif
 * from almost any booru source
 */
export default class Post implements Post_Interface {
  name: string;
  score: number;
  parent_id: string;
  has_children: boolean;
  has_notes: boolean;
  has_comments: boolean;
  created_at: Date;
  source: string;
  rating: "safe" | "explicit";
  preview: iSource;
  sample: iSource;
  file: iSource;
  tags: string[];
  /**
   * @param  {string} name
   * @param  {number} score
   * @param  {string} parentId
   * @param  {boolean} hasChildren
   * @param  {boolean} hasNotes
   * @param  {boolean} hasComments
   * @param  {Date} createdAt
   * @param  {string} source
   * @param  {'safe'|'explicit'} rating
   * @param  {iSource} preview
   * @param  {iSource} sample
   * @param  {iSource} file
   * @param  {string[]} tags
   */
  constructor(
    name: string,
    score: number,
    parentId: string,
    hasChildren: boolean,
    hasNotes: boolean,
    hasComments: boolean,
    createdAt: Date,
    source: string,
    rating: "safe" | "explicit",
    preview: iSource,
    sample: iSource,
    file: iSource,
    tags: string[]
  ) {
    this.name = name;
    this.score = score;
    this.parent_id = parentId;
    this.has_children = hasChildren;
    this.has_notes = hasNotes;
    this.has_comments = hasComments;
    this.created_at = createdAt;
    this.source = source;
    this.rating = rating;
    this.preview = preview;
    this.sample = sample;
    this.file = file;
    this.tags = tags;
  }
}

/**
 * This is the source of the images/videos
 */
export class Source implements iSource {
  url: string;
  width: number;
  height: number;
  /**
   * @param  {string} url
   * @param  {number} width
   * @param  {number} height
   */
  constructor(url: string, width: number, height: number, req: any) {
    if (req == "") {
      this.url = url;
    } else {
      this.url = semiFullUrl(req) + "galleries/gallery?url=" + url;
    }
    this.width = width;
    this.height = height;
  }
}

export interface Post_Interface {
  name: string;
  score: number;
  parent_id: string;
  has_children: boolean;
  has_notes: boolean;
  has_comments: boolean;
  created_at: Date;
  source: string;
  rating: "safe" | "explicit";
  preview: iSource;
  sample: iSource;
  file: iSource;
  tags: Array<string>;
}

export interface iSource {
  url: string;
  width: number;
  height: number;
}
