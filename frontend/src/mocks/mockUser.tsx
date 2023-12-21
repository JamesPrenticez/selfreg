import { IUserPermissions, type IUser } from "@models";

export const mockUsers: IUser[] = [
  {
    _id: "123456",
    email: "james.prentice@gmail.com",
    firstName: "james",
    lastName: "prentice",
    phone: "123456789",
    profilePicture: "", //./avatar.png
    country: "New Zealand",
    locale: "en-gb",
    permissions: [IUserPermissions.ADMIN]
  }
]
