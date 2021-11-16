/* eslint-disable max-len */
import { Request, Response } from 'express';
import http from 'axios';
import httpStatus from 'http-status';
import SearchQuery from '../../../../models/posts/request_model';
import Post from '../../../../models/posts/post_model';
const convert = require('xml-js');

/**
 * Returns a router that handles the booru api
 * @param {string} booruUrl The Booru url
 * @param {string} sourceName The booru name
 * @return {Router} the router
 */
export default function createGenericHandler(booruUrl: string, sourceName: string) {
  const urlOutOfScope = booruUrl; // i hate this
  return async function genericHandler(req: Request, res: Response) {
    // * transform the query into something easy to handle

    try {
      const query = SearchQuery.transformRequestIntoSearchQuery(req);
      const url = query.appendParamsToUrl(urlOutOfScope); // ! :)
      const queryResponse = await http.get(url)

      const xmlData = convert.xml2json(queryResponse.data, { compact: true, spaces: 0 });
      const jsonData = await JSON.parse(xmlData).posts.post;
      const posts: Post[] = SearchQuery.transformJsonIntoPosts(jsonData);

      res.status(httpStatus.OK).send(
        {
          'Source': sourceName,
          'Your_Query': query,
          'Search_Url': url,
          'Amount_Found': posts.length,
          'Result': posts,
        },
      );
    } catch (e) {
      res.status(200).send('error')
    }
  }

}
