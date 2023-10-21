import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockUser, mockTodos, mockDays } from '@mocks';
import type { ISuccessResult, IErrorResult } from '@models';
import mockSQL from './mockSQL';

const development = true; // !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const useMockData = true;

const axiosInstance = axios.create({
  baseURL: development ? 'http://localhost:3000/' : 'http://selfregulator.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

const mockAxiosInstance = new MockAdapter(axiosInstance, { delayResponse: 2000 });

if (useMockData) {


  mockAxiosInstance.onGet('/todos').reply((config) => {
    const { params } = config;

    // GET todos by user_id
    if (params && params.user_id && !params.start_date) {
      return mockSQL.WHERE(mockTodos, "user_id", params.user_id)
    }

    // GET todos by user_id and days between date range
    if (params && params.user_id && params.start_date && params.end_date) {
      return mockSQL.JOIN_TODO_AND_DAYS(params.user_id, params.start_date, params.end_date, mockTodos, mockDays)
    }

    return [200, mockTodos];
  });



  mockAxiosInstance.onPost('/your-post-endpoint').reply(200, { success: true });
}


// TODO can simplify these two functions into api.get and api.post
// GET request version of the api function
const apiGet = async <T>(
  endpoint: string,
  params?: any // Optional parameters for GET requests
): Promise<ISuccessResult<T>> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: endpoint,
  };

  if (params) {
    config.params = params;
  }

  try {
    const response = await axiosInstance.request(config);
    return { data: response.data } as ISuccessResult<T>;
  } catch (error) {
    // Handle errors
    if (error instanceof Error && typeof error.message === 'string') {
      throw { message: `Failed to fetch data from API: ${error.message}` } as IErrorResult;
    } else {
      throw { message: 'Failed to fetch data from API' } as IErrorResult;
    }
  }
};

// POST request version of the api function
const apiPost = async <T>(
  endpoint: string,
  data?: any, // Data payload for POST requests
): Promise<ISuccessResult<T>> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: endpoint,
  };

  if (data) {
    config.data = data;
  }

  try {
    const response = await axiosInstance.request(config);
    return { data: response.data } as ISuccessResult<T>;
  } catch (error) {
    // Handle errors
    if (error instanceof Error && typeof error.message === 'string') {
      throw { message: `Failed to fetch data from API: ${error.message}` } as IErrorResult;
    } else {
      throw { message: 'Failed to fetch data from API' } as IErrorResult;
    }
  }
};

export { apiGet, apiPost };
