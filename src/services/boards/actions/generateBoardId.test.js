import generateBoardId from './generateBoardId';

const existingBoardId = '000002';

describe('generateBoardId', () => {
  let scope;

  beforeEach(() => {
    scope = {
      boards : {
        [existingBoardId] : {},
      },
      ids : {
        all  : [3, 2, 1],
        next : 0,
      },
    };
  });

  test('New board ids are correctly generated', () => {
    expect(generateBoardId.call(scope)).toBe('000003');
    expect(generateBoardId.call(scope)).toBe('000001');
    expect(generateBoardId.call(scope)).toBe('000003');
  });
});
