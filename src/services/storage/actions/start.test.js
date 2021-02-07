import { S3 } from 'aws-sdk';

import start from './start';

jest.mock(
  'aws-sdk',
  () => ({
    S3 : jest.fn().mockImplementation(() => ({})),
  }),
);

describe('Storage service : start', () => {
  let scope;

  beforeEach(() => {
    scope = {
      s3 : undefined,
    };
  });

  test('Connects to storage correctly', () => {
    start.call(scope);

    expect(S3).toHaveBeenCalledTimes(1);
    expect(scope.s3).not.toBeUndefined();
  });
});
