import {
  start,
  createBoard,
  addImage,
  addUser,
  getBoard,
  getUsers,
  injectDependencies,
  removeUser,
  removeBoard,
  updateUserName,
  updateBoardName,
} from './actions';

export default () => {
  const scope = Object.seal({
    dependencies : {},
    boards       : {}, // boardId -> { ...boardData }
    ids          : {}, // Ids management
  });

  return Object.freeze({
    start              : start.bind(scope),
    createBoard        : createBoard.bind(scope),
    addImage           : addImage.bind(scope),
    addUser            : addUser.bind(scope),
    getBoard           : getBoard.bind(scope),
    getUsers           : getUsers.bind(scope),
    injectDependencies : injectDependencies.bind(scope),
    removeUser         : removeUser.bind(scope),
    removeBoard        : removeBoard.bind(scope),
    updateUserName     : updateUserName.bind(scope),
    updateBoardName    : updateBoardName.bind(scope),
  });
};
