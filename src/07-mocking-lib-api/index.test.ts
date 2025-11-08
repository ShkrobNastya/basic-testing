// Uncomment the code below and write your
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
    throttledGetDataFromApi.cancel();
  });

  test('should create instance with provided base url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: 'test data' });
    const axiosCreateSpy = jest
      .spyOn(axios, 'create')
      .mockReturnValue({ get: getMock } as unknown as AxiosInstance);
    throttledGetDataFromApi('/test');
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: 'test data' });
    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ get: getMock } as unknown as AxiosInstance);
    throttledGetDataFromApi('/test');

    expect(getMock).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {});
});
