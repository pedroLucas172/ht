import {Request} from 'express';
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
    const quality = parseInt(req.query['quality'] as string) | 0;
    const sort = (req.query['sort'] as Sort);
    const rating = (req.query['rating'] as Rating);
    const limit = parseInt(req.query['limit'] as string) | 10;
    const page = parseInt(req.query['page'] as string) | 1;
    return new SearchQuery(
        tagList,
        quality,
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
