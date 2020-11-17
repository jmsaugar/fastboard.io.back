import {
  start,
  createBoard,
  addUser,
  getBoard,
  getUsers,
  removeUser,
  removeBoard,
  updateUserName,
  updateBoardName,
} from './actions';

export default () => {
  const scope = Object.freeze({
    boards : {}, // boardId -> { ...boardData }
    ids    : {}, // Ids management
  });

  return Object.freeze({
    start           : start.bind(scope),
    createBoard     : createBoard.bind(scope),
    addUser         : addUser.bind(scope),
    getBoard        : getBoard.bind(scope),
    getUsers        : getUsers.bind(scope),
    removeUser      : removeUser.bind(scope),
    removeBoard     : removeBoard.bind(scope),
    updateUserName  : updateUserName.bind(scope),
    updateBoardName : updateBoardName.bind(scope),
  });
};
