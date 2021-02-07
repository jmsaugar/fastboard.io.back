import onImageCreate from './onImageCreate';

const invalidItemName = 'abc';
const validItemName = '3e74d192-1a2f-4bc9-9423-5667a6c4857a';
const validBoardId = '123456';

describe('Http service : onImageCreate', () => {
  let scope;
  let req;
  let res;

  beforeEach(() => {
    scope = {
      dependencies : {
        boardsService : {
          getBoard : jest.fn(),
          addImage : jest.fn(() => true),
        },
        storageService : {
          write  : jest.fn(() => (Promise.resolve({ Location : '123' }))),
          remove : jest.fn(),
        },
      },
    };

    res = {
      status : jest.fn(() => ({
        json : jest.fn(),
      })),
    };
  });

  test('Image is successfully created', () => {
    req = {
      file : {
        buffer : {},
      },
      body : {
        itemName : validItemName,
        boardId  : validBoardId,
      },
    };

    expect.assertions(2);
    return onImageCreate.call(scope, req, res).then(() => {
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  test('Image is not created due to bad item name', () => {
    req = {
      file : {
        buffer : {},
      },
      body : {
        itemName : invalidItemName,
        boardId  : validBoardId,
      },
    };

    expect.assertions(2);
    return onImageCreate.call(scope, req, res).catch(() => {
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
