import { validate } from 'uuid';

import generateUserId from './generateUserId';

describe('generateUserId', () => {
  test('New unique ids are correctly generated', () => {
    const id1 = generateUserId();
    const id2 = generateUserId();

    expect(validate(id1)).toBe(true);
    expect(validate(id2)).toBe(true);

    expect(id1).not.toBe(id2);
  });
});
