export interface IUser {
  id: string,
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profilePicture?: string;
  locale?: string;
  country?: string;
  permissions?: IUserPermissions[];
  subscription?: IUserSubscription;
  dateCreated: string;
  lastModified: string;
}

export enum IUserPermissions {
  ADMIN = 'ADMIN',
}

export enum IUserSubscription {
  FREE = 'FREE',
}