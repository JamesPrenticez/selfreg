import axios from 'axios';
import { mockUser, mockTodos } from '@mocks';
import type { ISuccessResult, IErrorResult } from '@models';

const development = true; // !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const useMockData = true;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: development ? "http://localhost:3000/" : "http://selfregulator.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

const api = {
  async get<T>(endpoint: string): Promise<ISuccessResult<T>> {
    if (useMockData) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          switch (endpoint) {
            case 'user':
              resolve({ data: mockUser } as ISuccessResult<T>);
              break;
            case 'todos':
              resolve({ data: mockTodos } as ISuccessResult<T>);
              break;
            default:
              reject(new Error(`Mock data not found for endpoint: ${endpoint}`));
          }
        }, 500); // Simulated delay (optional)
      });
    } else {
      // You can use axiosInstance for real API requests
      try {
        const response = await axiosInstance.get(endpoint);
        return ({ data: response.data } as ISuccessResult<T>);
      } catch (error: unknown) {
        // Error from server
        if (error instanceof Error && typeof error.message === 'string') {
          throw { message: `Failed to fetch data from API: ${error.message}` } as IErrorResult;
        // Axios error
        } else {
          throw { message: 'Failed to fetch data from API' } as IErrorResult;
        }
      }
    }
  },

  async post<T>(endpoint: string, data: any): Promise<ISuccessResult<T> | IErrorResult> {
    if (useMockData) {
      // Simulate a POST request with a delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // You can add mock response logic here
          resolve({ data: {"message": "post request made to mock"} } as ISuccessResult<T>);
        }, 500); // Simulated delay (optional)
      });
    } else {
      // You can use axiosInstance for real API POST requests
      try {
        const response = await axiosInstance.post(endpoint, data);
        return ({ data: response.data } as ISuccessResult<T>);
      } catch (error) {
        // Error from server
        if (error instanceof Error && typeof error.message === 'string') {
          throw { message: `Failed to fetch data from API: ${error.message}` } as IErrorResult;
        // Axios Error
        } else {
          throw { message: 'Failed to fetch data from API' } as IErrorResult;
        }
      }
    }
  },
};

export default api

// Mertle example
// export const getErrorMessage = (e: unknown): string => {
//   let message: string;
//   if (axios.isAxiosError<ErrorResult>(e)) {
//     if (e.response != null) {
//       message = `Response from Server: ${e.response?.data.message}`;
//     } else {
//       message = `Axios Error: ${e.message}`;
//     }
//   } else {
//     message = "An unexpected error occurred";
//   }
//   return message;
// };