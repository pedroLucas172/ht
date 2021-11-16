import httpStatus from "http-status";
import { Request, Response } from "express";
import { fullUrl } from "../lib/tools/fullUrl";

/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();

// * Acording to file names, create a route schema
const routeNames = [
  // everything here is a file name
  "posts",
  "galleries",
];

routeNames.forEach((routeName) => {
  const routeFile = require(`./${routeName}/${routeName}.ts`);
  try {
    router.use(`/${routeName}`, routeFile);
  } catch (err) {
    console.log("Deu erro");
  }
});

router.get("/", (req: Request, res: Response) => {
  let routesDocumentation:any = {};
  routeNames.forEach((e) => {
    routesDocumentation[e] = fullUrl(req) + e;
  });

  res.status(httpStatus.OK).send(JSON.stringify(routesDocumentation));
});

module.exports = router;
