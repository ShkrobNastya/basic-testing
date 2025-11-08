// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 28, b: 2, action: Action.Divide, expected: 14 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
];

const invalidTestCases = [
  { a: 1, b: 2, action: 5 },
  { a: 2, b: 2, action: 'hey' },
  { a: 3, b: 2, action: null },
  { a: 1, b: '2', action: Action.Subtract },
  { a: null, b: 2, action: Action.Subtract },
  { a: 3, b: undefined, action: Action.Subtract },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'returns expected result for different actions',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  test.each(invalidTestCases)(
    'returns null with invalid inputs',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull();
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
