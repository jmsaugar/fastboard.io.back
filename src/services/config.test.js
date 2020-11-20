import dotenv from 'dotenv';

import configServiceFactory from './config';

jest.mock(
  'dotenv',
  () => ({
    config : jest.fn(),
  }),
);

describe('Config service', () => {
  let service;

  beforeEach(() => {
    service = configServiceFactory();
  });

  test('Service is started', () => {
    service.start();

    expect(dotenv.config).toHaveBeenCalledTimes(1);
  });
});
