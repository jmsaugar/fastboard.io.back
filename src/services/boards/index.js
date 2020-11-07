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

const serviceScope = Object.freeze({
  boards : {}, // boardId -> { ...boardData }
});

export default {
  addUser         : addUser.bind(serviceScope),
  createBoard     : createBoard.bind(serviceScope),
  getBoard        : getBoard.bind(serviceScope),
  getUsers        : getUsers.bind(serviceScope),
  removeBoard     : removeBoard.bind(serviceScope),
  removeUser      : removeUser.bind(serviceScope),
  updateBoardName : updateBoardName.bind(serviceScope),
  updateUserName  : updateUserName.bind(serviceScope),
};
