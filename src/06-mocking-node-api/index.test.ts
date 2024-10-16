// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockTimeout = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    doStuffByTimeout(cb, 100);
    jest.runAllTimers();

    expect(mockTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const mockTimeout = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    expect(cb).not.toBeCalled();

    doStuffByTimeout(cb, 100);
    doStuffByTimeout(cb, 200);
    jest.runAllTimers();

    expect(cb).toBeCalled();
    expect(mockTimeout).toHaveBeenCalledTimes(2);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockInterval = jest.spyOn(global, 'setInterval');

    const cb = jest.fn();
    doStuffByInterval(cb, 100);

    expect(mockInterval).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();

    jest.runOnlyPendingTimers();
    doStuffByInterval(cb, 100);
    jest.advanceTimersByTime(500);

    expect(cb).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const fileFirst = 'fileFirst.txt';
    const fileSecond = 'fileSecond.txt';
    const mockJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(fileFirst);
    await readFileAsynchronously(fileSecond);

    expect(mockJoin).toHaveBeenCalledTimes(2);
    expect(mockJoin).toHaveBeenLastCalledWith(__dirname, fileSecond);
  });

  test('should return null if file does not exist', async () => {
    const fileFirst = 'fileFirst.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    const res = await readFileAsynchronously(fileFirst);

    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file content';
    const fileFirst = 'fileFirst.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);

    const res = await readFileAsynchronously(fileFirst);
    expect(res).toBe(fileContent);
  });
});
