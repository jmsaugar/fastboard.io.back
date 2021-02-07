import write from './write';

const fileKey = '123-456';
const fileBody = 'sample file body';
const resolvedData = { test : 123 };
const rejectedError = { error : 456 };

describe('Storage service : write', () => {
  let scope;

  beforeEach(() => {
    scope = {
      s3 : {
        upload : undefined,
      },
    };
  });

  test('Write a file successfully', () => {
    scope.s3.upload = jest.fn((_, cb) => {
      cb(undefined, resolvedData);
    });

    const promise = write.call(scope, fileKey, fileBody);

    return expect(promise).resolves.toBe(resolvedData);
  });

  test('Error writing a file', () => {
    scope.s3.upload = jest.fn((_, cb) => {
      cb(rejectedError, resolvedData);
    });

    const promise = write.call(scope, fileKey, fileBody);

    return expect(promise).rejects.toBe(rejectedError);
  });
});
