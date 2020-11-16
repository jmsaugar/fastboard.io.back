import { Log } from '#utils';

import {
  createBoard,
  addUser,
  getBoard,
  getUsers,
  removeUser,
  removeBoard,
  updateUserName,
  updateBoardName,
} from './actions';

const maxId = 999999; // End limit for the ids range

const serviceScope = Object.freeze({
  boards : {}, // boardId -> { ...boardData }
  ids    : {},
});

const init = () => {
  Log.info('Service : Boards : init');

  // @todo rework this
  serviceScope.ids.all = [];
  serviceScope.ids.next = 0;

  // Initial values
  for (let i = 0; i <= maxId; i += 1) {
    serviceScope.ids.all.push(i);
  }

  // Shuffle
  for (let i = serviceScope.ids.all.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [serviceScope.ids.all[i], serviceScope.ids.all[j]] = [serviceScope.ids.all[j], serviceScope.ids.all[i]];
  }
};

export default {
  init,
  addUser         : addUser.bind(serviceScope),
  createBoard     : createBoard.bind(serviceScope),
  getBoard        : getBoard.bind(serviceScope),
  getUsers        : getUsers.bind(serviceScope),
  removeBoard     : removeBoard.bind(serviceScope),
  removeUser      : removeUser.bind(serviceScope),
  updateBoardName : updateBoardName.bind(serviceScope),
  updateUserName  : updateUserName.bind(serviceScope),
};
