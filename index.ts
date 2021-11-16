import { Request, Response } from 'express';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const morgan = require('morgan');
const request = require("request")

const app = express();
require('dotenv').config();

// ! Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(morgan('tiny'));

// ! Image Router
app.all("/image", async (req: Request, res: Response) => {
  try {
    let url = req.query.url;
    if (!url || req.query.url === "") {
      res.sendStatus(404);
    }
    if (url == undefined || url == "undefined" || url == "undefined?undefined") {
      url = "https://www.google.com.br"
    }
    var response = await request(url);
    response.pipe(res);
  }catch{
    res.statusCode = 404
    res.send('')
  }
})

// ! Routes
app.use('/', require('./src/routes/router.ts'));
app.use('*', (req: Request, res: Response) => {
  res.send('Where are you going?');
});

var port = process.env.PORT
port == undefined ? port = "8000" : 0xff
app.listen(port, function () {
  console.clear();
  console.log(`Server running on port ${port}`);
},
);
