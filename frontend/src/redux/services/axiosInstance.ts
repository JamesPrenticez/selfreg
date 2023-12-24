import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
  mockUsers,
} from '@mocks';
import mockSQL from './mockSQL';

const development = true; // !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const useMockData = true;
const log = false // quickly toggle all console.logs on/off

// https://dummyjson.com/docs/users
export const axiosInstance = axios.create({
  baseURL: development ? 'http://localhost:3000/bin/portal' : '/bin/portal',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

if (useMockData) {

  const mockAxiosInstance = new MockAdapter(axiosInstance, { delayResponse: 1000 }); // set to 2000

  //============================================
  // GET
  //============================================
  const user_id = '1';
  
  // User Details
  mockAxiosInstance.onGet(`users/${user_id}`).reply((config) => {
    if (log) console.table({method: config.method, endpoint: config.url, params: config.params})

    if (user_id) {
      return mockSQL.WHERE_ONE(mockUsers, "_id", user_id)
    }

    return [204, { message: "User ID not provided" }];
  });

  //============================================
  // POST
  //============================================
  mockAxiosInstance.onPost('/user').reply((config) => {
    console.log("mock POST request made!")
    return [200, { message: "success" }];
  })

  //============================================
  // PUT
  //============================================
  mockAxiosInstance.onPut('/user').reply((config) => {
    console.log("mock PUT request made!")
    return [200, { message: "success" }];
  })
}
