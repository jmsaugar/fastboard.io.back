import { validate as validateUUID } from 'uuid';

import { Log } from '#utils';
import { statusCodes } from '#constants';

/**
 * Handler for image creation request.
 *
 * @param {Object} req Express.js request object.
 * @param {Object} res Express.js response object.
 */
export default function onImageCreate(req, res) {
  Log.info('Service : Http : onImageCreate', req);

  // @todo check size?
  if (!req.file
    || !req?.body?.itemName
    || !req?.body?.boardId
    || !validateUUID(req.body.itemName
    || !this.dependencies.boardsService.getBoard(req.body.boardId))) {
    res.status(statusCodes.badRequest);
    return Promise.reject();
  }

  return this.dependencies.storageService
    .write(req.body.itemName, req.file.buffer)
    .then((data) => {
      // Associate image & board
      if (this.dependencies.boardsService.addImage(req.body.boardId, req.body.itemName)) {
        res.status(statusCodes.created).json({ location : data.Location });
      } else {
        this.dependencies.storageService.remove([req.body.itemName]);
        res.status(statusCodes.internalError);
      }
    })
    .catch(() => res.status(statusCodes.badRequest));
}
