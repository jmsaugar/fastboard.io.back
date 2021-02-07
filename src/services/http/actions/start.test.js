import express from 'express';
import { createServer } from 'http';

import start from './start';

jest.mock('express', () => jest.fn(() => ({
  __esModule : true,
  use        : jest.fn(),
  post       : jest.fn(),
})));
jest.mock('http', () => ({
  createServer : jest.fn().mockImplementation(() => ({
    listen : jest.fn(),
  })),
}));

describe('Http service : start', () => {
  let scope;

  beforeEach(() => {
    scope = {
      app    : undefined,
      server : undefined,
    };
  });

  test('Service is successfully started', () => {
    start.call(scope);

    expect(express).toHaveBeenCalledTimes(1);
    expect(createServer).toHaveBeenCalledTimes(1);
    expect(scope.app).not.toBeUndefined();
    expect(scope.server).not.toBeUndefined();
  });
});
