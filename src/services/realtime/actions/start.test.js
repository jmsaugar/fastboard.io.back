import io from 'socket.io';

import start from './start';

jest.mock(
  'socket.io',
  () => jest.fn().mockImplementation(() => ({
    __esModule : true,
    default    : jest.fn(),
    on         : jest.fn(),
  })),
);

describe('Realtime service : start', () => {
  let scope;

  beforeEach(() => {
    scope = {
      server : undefined,
    };

    io.mockClear();
  });

  test('Start service', () => {
    start.call(scope);

    expect(io).toHaveBeenCalledTimes(1);
    expect(io.mock.results[0].value.on).toHaveBeenCalledTimes(1);
  });
});
