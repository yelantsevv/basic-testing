// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/posts');
    expect(spy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockRequest = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: null });

    await throttledGetDataFromApi('/posts');
    await jest.runOnlyPendingTimersAsync();

    expect(mockRequest).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const mockData = { data: 'test' };
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValueOnce(mockData);

    const res = await throttledGetDataFromApi('/posts');
    expect(res).toBe(mockData.data);
  });
});
