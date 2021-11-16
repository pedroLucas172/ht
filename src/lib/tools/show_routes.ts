import {Request, Response} from 'express';
import { fullUrl } from './fullUrl';

const fs = require('fs');

// ! ignore this code, it only serves for documentation
/**
 * Automaticaly creates a documentation route
 * @param {string} path Where the function should search
 * @return {Route} The documentation route
 */
export default function showRoutes(path: string) {
  return (req: Request, res: Response) => {
    const routes:any = {};
    fs.readdirSync(path).forEach((file: string) => {
      if (file.endsWith('.ts') && file != 'router.ts') {
        const name = file.replace('.ts', '');
        const path = fullUrl(req) + name;
        routes[name] = path;
      }
    });
    res.send(routes);
  };
}

