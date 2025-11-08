// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
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
    const callback = jest.fn();
    const interval = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2);

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockJoin = join as unknown as jest.Mock;
  const mockExistsSync = existsSync as unknown as jest.Mock;
  const mockReadFile = readFile as unknown as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('/new/test.txt');

    expect(mockJoin).toHaveBeenCalledWith(__dirname, '/new/test.txt');
  });

  test('should return null if file does not exist', async () => {
    mockExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('test.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockJoin.mockReturnValue('/new/test.txt');
    mockExistsSync.mockReturnValue(true);
    mockReadFile.mockResolvedValue(Buffer.from('Content to read!'));

    const result = await readFileAsynchronously('/new/test.txt');

    expect(mockReadFile).toHaveBeenCalledWith('/new/test.txt');
    expect(result).toBe('Content to read!');
  });
});
