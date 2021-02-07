import getServer from './getServer';

const server = { foo : 'bar' };

describe('Http service : getServer', () => {
  let scope;

  beforeEach(() => {
    scope = { server };
  });

  test('Server is retrieved successfully', () => {
    expect(getServer.call(scope)).toBe(server);
  });
});
