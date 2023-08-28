import { createAsyncThunk } from "@reduxjs/toolkit"
import { setPayload } from "./userSlice"
import { type IUser } from "../modals/IUser"

const mockData: IUser = {
  id: 1,
  username: "james",
  email: "james.prentice@gmail.com"
}

export const fetchUser = createAsyncThunk("user/getUser",
  async ( _, { dispatch }) => {

    // Implement real api call
    // const fetchTodosApi = async (): Promise<any>  => {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    //   const data = await response.json()
    //   return data
    // }

    // Mock DB
    const mockApi = async (): Promise<any> => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // mock db delay
      return mockData
    }

    try {
      const response = await mockApi()
      dispatch(setPayload(response))

    } catch (error) {
      console.log(error)
    }
  }
)