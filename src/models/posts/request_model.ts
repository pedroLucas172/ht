import {Request} from 'express';
import Post, {Source} from './post_model';
/**
 * This is the source of the images/videos
 */
export default class SearchQuery implements SearchQuery_Interface {
  tags: string[];
  score: Number;
  sort: Sort;
  rating: Rating;
  limit: number;
  page: number;

  /**
   * @param  {Array} tags
   * @param  {Number} score
   * @param  {'recent'} sort
   * @param  {'safe'} rating
   * @param  {number} limit
   * @param  {number} page
   */
  constructor(
      tags: Array<string> = [],
      score: Number = 0,
      sort: Sort = 'recent',
      rating: Rating = 'safe',
      limit: number = 10,
      page: number = 1,
  ) {
    this.tags = tags;
    this.score = score;
    this.sort = sort;
    this.rating = rating;
    this.limit = limit;
    this.page = page;
  }

  /**
   * @param  {Array} jsonData
   * @return {Post} Post
   */
  static transformJsonIntoPosts(jsonData: Array<any>): Post[] {
    const posts: Post[] = [];
    jsonData.forEach((element: any) => {
      const atributes = element._attributes;

      const previewSource = new Source(
          atributes.preview_url,
          atributes.preview_width,
          atributes.preview_height,
          ''
      );
      const sampleSource = new Source(
          atributes.sample_url,
          atributes.sample_width,
          atributes.sample_height,
          ''
      );
      const fileSource = new Source(
          atributes.file_url,
          atributes.width,
          atributes.height,
          ''
      );
      posts.push(
          new Post(
              atributes.id,
              atributes.score,
              atributes.parent_id,
              atributes.has_children,
              atributes.has_notes,
              atributes.has_comments,
              atributes.created_at,
              atributes.source,
              atributes.rating,
              previewSource,
              sampleSource,
              fileSource,
              atributes.tags.trim().split(' '),
          ),
      );
    });
    return posts;
  }

  /**
   * @param  {string} url
   * @return {string}
   */
  appendParamsToUrl(url: string): string {
    // ! Tags
    let query = '&tags=';
    this.tags.forEach((tag) => {
      query = query + `+${tag}`;
    });

    //* Score
    query = query + `+score:>=${this.score}`;

    // * Sort
    if (this.sort == 'best') {
      query = query + `+sort:score:desc`;
    }

    // * Rating
    if (this.rating == 'explicit') {
      query = query + `+-rating:safe`;
    }


    // ! Params
    query += `&pid=${this.page}`;
    query += `&limit=${this.limit}`;

    return url + query;
  }
  /**
   * @param  {Request} req
   * @return {SearchQuery}
   */
  static transformRequestIntoSearchQuery(req: Request) {
    const tags = (req.query['tags'] as string);
    let tagList: string[];
    if (tags != undefined) {
      tagList = tags.split(' ');
    } else {
      tagList = [''];
    }
    const score = parseInt(req.query['score'] as string) | 0;
    const sort = (req.query['sort'] as Sort);
    const rating = (req.query['rating'] as Rating);
    const limit = parseInt(req.query['limit'] as string) | 10;
    const page = parseInt(req.query['page'] as string) | 1;
    return new SearchQuery(
        tagList,
        score,
        sort,
        rating,
        limit,
        page,
    );
  }
}

interface SearchQuery_Interface {
    tags: Array<string>
    score: Number
    sort: Sort
    rating: Rating
    limit: number,
    page: number

}
export type Sort = 'recent' | 'best'
export type Rating = 'safe' | 'explicit'
