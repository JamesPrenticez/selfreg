import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockUsers, mockTodos, mockDays } from '@mocks';
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
  //=============================================================================
  // GET
  //=============================================================================
  // USER
  mockAxiosInstance.onGet('/user').reply((config) => {
    const { params } = config;
    
    // GET user by _id
    if (params && params._id) {
      return mockSQL.WHERE_ONE(mockUsers, "_id", params._id)
    }

    return [204, undefined];
  });

  // TOODOOS
  mockAxiosInstance.onGet('/todos').reply((config) => {
    const { params } = config;

    if (params && params.user_id && !params.todo_ids) {
      return mockSQL.WHERE_MANY(mockTodos, "user_id", params.user_id)
    }

    if (params && params.user_id && params.todo_ids && params.start_date && params.end_date) {
      return mockSQL.GET_DAYS_FOR_TODO_ID_LIST_BETWEEN_DATE_RANGE(params.user_id, params.todo_ids, params.start_date, params.end_date)
    }

    return [200, mockTodos];
  });

  //=============================================================================
  // POST
  //=============================================================================
  mockAxiosInstance.onPost('/your-post-endpoint').reply(200, { success: true });
}

// GET request version of the api function
const api = {
  get: async <T>(
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
  },

  post: async <T>(
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
  },
};

export default api;
