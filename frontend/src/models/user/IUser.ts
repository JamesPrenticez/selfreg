export interface IUser {
  _id: string,
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profilePicture?: string;
  locale: string;
  country?: string;
  permissions: IUserPermissions[];
}

export enum IUserPermissions {
  ADMIN = 'ADMIN',
}