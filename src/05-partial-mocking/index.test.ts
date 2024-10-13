// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockLog = jest.spyOn(global.console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(mockLog).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const mockLog = jest.spyOn(global.console, 'log');
    unmockedFunction();
    expect(mockLog).toHaveBeenCalledTimes(1);
  });
});
