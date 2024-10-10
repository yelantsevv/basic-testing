// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Add })).toBe(6);
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Add })).toBe(9);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 6, action: Action.Subtract })).toBe(-5);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 6, action: Action.Multiply })).toBe(12);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: null })).toBe(null);
    expect(
      simpleCalculator({ a: 2, b: 3, action: 'Action.Exponentiate' }),
    ).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: null, b: 3, action: Action.Exponentiate }),
    ).toBe(null);
    expect(simpleCalculator({ a: '', b: 3, action: Action.Exponentiate })).toBe(
      null,
    );
  });
});
