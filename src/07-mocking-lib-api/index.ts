import axios from 'axios';
import { throttle } from 'lodash';

export const THROTTLE_TIME = 5000;

const getDataFromApi = async (relativePath: string) => {
  const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  const response = await axiosClient.get(relativePath);
  console.log(response, axiosClient);
  return response.data;
};

export const throttledGetDataFromApi = throttle(getDataFromApi, THROTTLE_TIME);
