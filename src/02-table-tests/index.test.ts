// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 3, action: 'Action.Exponentiate', expected: null },
  { a: 2, b: null, action: Action.Exponentiate, expected: null },
  { a: 2, b: undefined, action: Action.Exponentiate, expected: null },
  { a: 2, b: 4, action: null, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'a $action b => $expected',
    ({ a, b, action, expected }) => {
      const res = expect(simpleCalculator({ a, b, action }));
      res.toEqual(expected);
    },
  );
});
