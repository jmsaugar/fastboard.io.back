import express from 'express';
import { createServer } from 'http';
import multer from 'multer';
import cors from 'cors';

import { Log } from '#utils';
import { httpRoutes } from '#constants';

import onImageCreate from '../handlers';

/**
 * Start http service.
 */
export default function start() {
  Log.info('Service : Http : start');

  this.app = express();

  const upload = multer();

  this.app.use(cors({ origin : process.env.FRONT_HOST }));

  this.app[httpRoutes.createImage.method](
    httpRoutes.createImage.path,
    upload.single('image'),
    onImageCreate.bind(this),
  );

  this.server = createServer(this.app);
  this.server.listen(process.env.SERVER_PORT);

  Log.info('Service : Http : start : listening', process.env.SERVER_PORT);
}
