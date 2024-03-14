import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
  mockHabits,
  mockUsers,
} from '@mocks';
import mockSQL from './mockSQL';
import { getUserId } from './getUserId';

const development = true; // !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const useMockData = true; //window.location.hostname === 'localhost' && window.location.port === '3000' ? true : false;
const log = false;

export const axiosInstance = axios.create({
  baseURL: development ? 'http://localhost:5000/api/' : 'prod url',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// // Add an interceptor to only send g-recaptch-response query string on GET request and send as data for others.
// axiosInstance.interceptors.request.use((config) => {
//   // For GET request
//   if (config.method === 'get') {
//     config.params = {
//       ...config.params,
//       'g-recaptcha-response': 'sample',
//     };
//   } else if (['post', 'put', 'delete'].includes(config.method || '')) { // type safty || '' possibly undefined
//     // For POST/PUT/DELETE requests
//     config.data = {
//       ...config.data,
//       'g-recaptcha-response': 'sample',
//     };
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

if (useMockData) {

  const mockAxiosInstance = new MockAdapter(axiosInstance, { delayResponse: 1000 }); // set to 2000

  //============================================
  // GET
  //============================================
  // User Details
  const user_id = getUserId();

  mockAxiosInstance.onGet(`user/${user_id}`).reply((config) => {
    if (log) console.table({method: config.method, endpoint: config.url, params: config.params})

    // const user = mockSQL.WHERE_ONE(mockUsers, "_id", config.params.user_id)
    // return [204, { message: "No user found" }];

    return [200, {data: mockUsers[0]}]

  });

  // User Habits
  mockAxiosInstance.onGet(`user/${user_id}/habits`).reply((config) => {
    if (log) console.table({method: config.method, endpoint: config.url, params: config.params})
console.log("habbits")
    if (user_id) {
      return [200, mockHabits]//mockSQL.WHERE_ONE(mockHabits, "_id", user_id)
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
