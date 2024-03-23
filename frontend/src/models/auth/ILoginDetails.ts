import { IUser } from "@models/user"

export interface ILoginDeatils {
  email: IUser["email"]
  password: string
}