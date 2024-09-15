export interface IUser {
  id: string,
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profilePicture?: string;
  locale?: string;
  country?: string;
  permissions?: UserPermissions[];
  subscription?: UserSubscription;
  dateCreated: string | null;
  lastModified: string | null;
  type: AccountType | null;
}

export enum AccountType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum UserPermissions {
  ADMIN = 'ADMIN',
}

export enum UserSubscription {
  FREE = 'FREE',
}