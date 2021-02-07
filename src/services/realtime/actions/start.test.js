import { Server } from 'socket.io';

import start from './start';

jest.mock(
  'socket.io',
  () => ({
    Server : jest.fn().mockImplementation(() => ({
      on : jest.fn(),
    })),
  }),
);

describe('Realtime service : start', () => {
  let scope;

  beforeEach(() => {
    scope = {
      dependencies : {
        httpService : {
          getServer : jest.fn(),
        },
      },
      server : undefined,
    };
  });

  test('Start service', () => {
    start.call(scope);

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server.mock.results[0].value.on).toHaveBeenCalledTimes(1);
  });
});
