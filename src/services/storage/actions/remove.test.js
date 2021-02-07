import remove from './remove';

const keys = ['abc-def', 'ghi-jkl'];
const resolvedData = { test : 123 };
const rejectedError = { error : 456 };

describe('Storage service : remove', () => {
  let scope;

  beforeEach(() => {
    scope = {
      s3 : {
        deleteObjects : undefined,
      },
    };
  });

  test('Successfully remove files', () => {
    scope.s3.deleteObjects = jest.fn((_, cb) => {
      cb(undefined, resolvedData);
    });
    const promise = remove.call(scope, keys);

    return expect(promise).resolves.toBe(resolvedData);
  });

  test('Error removing files', () => {
    scope.s3.deleteObjects = jest.fn((_, cb) => {
      cb(rejectedError, resolvedData);
    });
    const promise = remove.call(scope, keys);

    return expect(promise).rejects.toBe(rejectedError);
  });
});
