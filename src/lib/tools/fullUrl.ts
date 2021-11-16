import { Request } from "express";

/**
 * Creates a url based on the request
 * @param {Request} req The request
 * @return {string} The full url
 */
export function fullUrl(req: Request): string {
  let url = req.protocol + "://" + req.get("host") + req.originalUrl;
  if (!url.endsWith("/")) {
    url += "/";
  }
  return url;
}

/**
 * Creates a url based on the request
 * @param {Request} req The request
 * @return {string} The full url
 */
export function semiFullUrl(req: Request | string): string {
  if (req == "") {
    return "";
  }
  if (req as Request) {
    req = req as Request;
    let url = req.protocol + "://" + req.get("host");
    if (!url.endsWith("/")) {
      url += "/";
    }
    return url;
  }
  return ''
}
