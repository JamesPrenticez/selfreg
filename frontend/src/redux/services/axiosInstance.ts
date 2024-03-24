import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
  mockHabits,
  mockUsers,
} from '@mocks';

const useMockData = import.meta.env.VITE_ENV === "development" ? true : false;
const log = false;

console.log(import.meta.env.VITE_BASE_URL)

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // this enables us to send a HTTPOnly cookie automagically for JWT authentication
});

if (useMockData) {

  const mockAxiosInstance = new MockAdapter(axiosInstance, { delayResponse: 1000 });

  //============================================
  // GET
  //============================================
  // User Details
  mockAxiosInstance.onGet('user').reply((config) => {
    if (log) console.table({method: config.method, endpoint: config.url, params: config.params})
    return [200, {data: mockUsers[0]}]
  });

  // User Habits
  mockAxiosInstance.onGet('habits').reply((config) => {
    if (log) console.table({method: config.method, endpoint: config.url, params: config.params})
    return [200, mockHabits]
  });

  //============================================
  // POST
  //============================================
  mockAxiosInstance.onPost('/signIn').reply((config) => {
    console.log(`Login request made with ${config.data}!`)
    return [200, { message: "success" }];
  })

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
