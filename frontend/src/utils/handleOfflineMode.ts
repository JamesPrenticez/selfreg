import { type IUser, LocalStorageKey } from '@models';
import { saveToLocalStorage, getFromLocalStorage } from '@utils';

export const saveUserLoginToLocalStorage = (email: string, password: string): string => {
  const existingCredentials = getFromLocalStorage(LocalStorageKey.AUTH_CREDENTIALS);

  if (existingCredentials) {
    throw new Error('Account already exists');
  }
  
  const hashedPassword = btoa(password); // simple hashing for demo
  saveToLocalStorage(LocalStorageKey.AUTH_CREDENTIALS, { email: email, password: hashedPassword });

  const spaToken = `${email}-${Date.now()}`; // mock a SPA token for protected routes
  saveToLocalStorage(LocalStorageKey.SPA_TOKEN, spaToken);

  return spaToken;
};

export const saveUserDataToLocalStorage = (userData: IUser): void => {
  const existingAccount = getFromLocalStorage(LocalStorageKey.USER_DATA);

  if (existingAccount) {
    throw new Error('Account already exists');
  }
  
  saveToLocalStorage(LocalStorageKey.USER_DATA, userData);
};

export const loginInOfflineMode = (email: string, password: string): IUser => {
  const account: IUser = getFromLocalStorage(LocalStorageKey.USER_DATA);

  if (account.email !== email || password !== btoa(password)) {
    throw new Error('Invalid credentials');
  }

  const spaToken = `${email}-${Date.now()}`; // re-generate token on login
  saveToLocalStorage(LocalStorageKey.SPA_TOKEN, spaToken);

  return account;
};