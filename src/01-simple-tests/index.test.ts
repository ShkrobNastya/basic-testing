// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: Action.Subtract });
    expect(result).toBe(3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 11, b: 10, action: Action.Multiply });
    expect(result).toBe(110);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 100, b: 25, action: Action.Divide });
    expect(result).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).toBe(9);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 1, b: 1, action: 5 });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '1', b: 1, action: Action.Add });
    expect(result).toBeNull();
  });
});
